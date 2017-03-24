var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var async = require('async')
var colors = require('colors')
var faker = require('faker')
var _ = require('lodash')
var bcrypt = require('bcrypt')
var crypto = require('crypto')
var validator = require('validator')
var ValidationError = mongoose.Error.ValidationError
var Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10

var validateEmail = function(email) {
    if (email) return validator.isEmail(email)
    return true
}

var validateURL = function(url) {
    if (url) return validator.isURL(url)
    return true
}

function omitUndefined(value) {
  return value === undefined ? '' : value
}


var UserSchema = new Schema({
    username: { type: String, maxlength: 30, required: true, unique: true },
    password: { type: String, maxlength: 128, required: true },
    first_name: { type: String, maxlength: 30, default: '', set: omitUndefined },
    last_name: { type: String, maxlength: 30, default: '', set: omitUndefined },
    email: { type: String, maxlength: 100, required: false, validate: [validateEmail, 'Please use a valid email address.'], default: '', set: omitUndefined},
    is_staff: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    date_joined: { type: Date, default: Date.now, required: false },
    token: { type: String, maxlength: 128, required: false }
})
UserSchema.post('validate', function(doc, next) {
    if (doc.is_staff && !doc.is_active) {
        var error = new ValidationError(this)
        error.errors.__all__ = {'message': 'Staff member requires active user.'}
        next(error)
    } else {
        next()
    }
})
UserSchema.pre("save", function(next) {
    var user = this
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})
UserSchema.pre("save", function(next) {
    var user = this
    if (user.is_staff && user.is_active) {
        if (!user.token) {
            crypto.randomBytes(48, function (ex, buf) {
                var token = buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
                user.token = token.toString().slice(1, 40);
                next()
            })
        } else {
            next()
        }
    } else {
        user.token = ""
        next()
    }
})
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}
UserSchema.plugin(mongoosePaginate)
var User = mongoose.model('User', UserSchema)

var SectionSchema = new Schema({
    name: { type: String, maxlength: 100, required: true, unique: true },
    slug: { type: String, maxlength: 100 },
    position: { type: Number }
})
SectionSchema.plugin(mongoosePaginate)
var Section = mongoose.model('Section', SectionSchema)

var CategorySchema = new Schema({
    section: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    name: { type: String, maxlength: 100, required: true  },
    slug: { type: String, maxlength: 100 },
    position: { type: Number }
})
CategorySchema.plugin(mongoosePaginate)
var Category = mongoose.model('Category', CategorySchema)

var TagSchema = new Schema({
    name: { type: String, maxlength: 200, required: true, unique: true },
    slug: { type: String, maxlength: 100 }
})
TagSchema.plugin(mongoosePaginate)
var Tag = mongoose.model('Tag', TagSchema)

var EntrySchema = new Schema({
    title: { type: String, maxlength: 200, required: true },
    status: { type: String, enum: ['Draft', 'Online'], default: 'Draft', required: true },
    date: { type: Date, required: true },
    sticky: { type: Boolean, default: false },
    section: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', null: true, default: null },
    tags: [ {type : Schema.Types.ObjectId, ref: 'Tag'} ],
    image: { type: String, maxlength: 200, default: '', set: omitUndefined },
    summary: { type: String, maxlength: 500, default: '', set: omitUndefined },
    body: { type: String, maxlength: 5000, default: '', set: omitUndefined },
    owner: { type: Schema.Types.ObjectId },
    locked: { type: Boolean, default: false },
    createdate: { type: Date },
    updatedate: { type: Date }
})
EntrySchema.pre('save', function(next) {
    this.updatedate = Date.now()
    if (!this.createdate) {
        this.createdate = Date.now()
    }
    next()
})
EntrySchema.plugin(mongoosePaginate)
var Entry = mongoose.model('Entry', EntrySchema)

var EntryLinkSchema = new Schema({
    entry: { type: Schema.Types.ObjectId, required: true },
    url: { type: String, maxlength: 200, required: true, validate: [validateURL, 'Please use a valid URL.'],  },
    title: { type: String, maxlength: 200, required: true },
    description: { type: String, maxlength: 200, default: '', set: omitUndefined },
    position: { type: Number }
})
EntryLinkSchema.plugin(mongoosePaginate)
var EntryLink = mongoose.model('EntryLink', EntryLinkSchema)


module.exports = {
    models: {
        User,
        Section,
        Category,
        Tag,
        Entry,
        EntryLink
    },
    url: 'mongodb://localhost/blogapp',
}
