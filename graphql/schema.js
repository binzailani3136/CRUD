// schema.js
import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} from 'graphql';

import {
    connectionArgs,
    connectionFromArray,
    cursorToOffset
} from 'graphql-relay';

import { UserListConnection, UserType, UserInputType, UserResultType, UserDeleteType } from './types/user';
import { SectionListConnection, SectionType, SectionInputType, SectionResultType, SectionDeleteType } from './types/section';
import { CategoryListConnection, CategoryType, CategoryInputType, CategoryResultType, CategoryDeleteType } from './types/category';
import { TagListConnection, TagType, TagInputType, TagResultType, TagDeleteType } from './types/tag';
import { EntryListConnection, EntryType, EntryInputType, EntryResultType, EntryDeleteType } from './types/entry';
import { EntryLinkListConnection, EntryLinkType, EntryLinkInputType, EntryLinkResultType, EntryLinkDeleteType } from './types/entrylink';
var paginate = require('express-paginate');
var mongoose = require('mongoose')
import db from '../db';

// Credits for this function go to https://gist.github.com/mathewbyrne
function slugify(text) {
    if (text) {
        return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    } else {
        return ""
    }
}

function getErrors(err) {
    let errors = null
    if (err.name === "ValidationError") {
        errors = []
        Object.keys(err.errors).forEach((key) => {
            errors.push(key)
            errors.push(err.errors[key].message)
        })
    } else {
        errors = err
    }
    return errors
}
let nores = null

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            allUsers: {
                type: UserListConnection,
                args: {
                    orderBy: { type: GraphQLString },
                    ...connectionArgs,
                },
                resolve: (root, { ...args }) => {
                    const query = {}
                    let sort = "username"
                    if (args.orderBy) { sort = args.orderBy.replace(/,/g, ' ') }
                    let counter = db.models.User.count({}).exec(function (err, count) { return count })
                    return db.models.User.find(query).sort(sort)
                    .then(function(result) {
                        let res = connectionFromArray(result, args)
                        res.filteredCount = result.length
                        res.totalCount = counter
                        return res
                    })
                }
            },
            user: {
                type: UserType,
                args: { id: { type: GraphQLID } },
                resolve: (root, {id}) => db.models.User.findById(id)
            },
            allSections: {
                type: SectionListConnection,
                args: {
                    orderBy: { type: GraphQLString },
                    idIn: { type: GraphQLString },
                    ...connectionArgs,
                },
                resolve: (root, { ...args }) => {
                    const query = {}
                    let sort = "slug"
                    let idlist = []
                    if (args.orderBy) { sort = args.orderBy.replace(/,/g, ' ') }
                    if (args.idIn) {
                        args.idIn.split(",").map((item, index) => {
                            idlist.push(mongoose.Types.ObjectId(item))
                        })
                        query["_id"] = { "$in": idlist }
                    }
                    let counter = db.models.Section.count({}).exec(function (err, count) { return count })
                    return db.models.Section.find(query).sort(sort)
                    .then(function(result) {
                        let res = connectionFromArray(result, args)
                        res.filteredCount = result.length
                        res.totalCount = counter
                        return res
                    })
                }
            },
            section: {
                type: SectionType,
                args: { id: { type: GraphQLID } },
                resolve: (root, {id}) => db.models.Section.findById(id)
            },
            allCategories: {
                type: CategoryListConnection,
                args: {
                    orderBy: { type: GraphQLString },
                    section: { type: GraphQLString },
                    name: { type: GraphQLString },
                    search: { type: GraphQLString },
                    idIn: { type: GraphQLString },
                    ...connectionArgs,
                },
                resolve: (root, { ...args }) => {
                    const query = {}
                    let sort = "slug"
                    let idlist = []
                    if (args.orderBy) { sort = args.orderBy.replace(/,/g, ' ') }
                    if (args.section) { query["section"] = { "$eq": args.section }}
                    if (args.name) { query["name"] = { "$regex": args.name, "$options": "i" }}
                    if (args.search) { query["name"] = { "$regex": args.search, "$options": "i" }}
                    if (args.idIn) {
                        args.idIn.split(",").map((item, index) => {
                            idlist.push(mongoose.Types.ObjectId(item))
                        })
                        query["_id"] = { "$in": idlist }
                    }
                    let counter = db.models.Category.count({}).exec(function (err, count) { return count })
                    return db.models.Category.find(query).sort(sort)
                    .then(function(result) {
                        let res = connectionFromArray(result, args)
                        res.filteredCount = result.length
                        res.totalCount = counter
                        return res
                    })
                }
            },
            category: {
                type: CategoryType,
                args: { id: { type: GraphQLID } },
                resolve: (root, {id}) => db.models.Category.findById(id)
            },
            allTags: {
                type: TagListConnection,
                args: {
                    orderBy: { type: GraphQLString },
                    name: { type: GraphQLString },
                    idIn: { type: GraphQLString },
                    ...connectionArgs,
                },
                resolve: (root, { ...args }) => {
                    const query = {}
                    let sort = "slug"
                    let idlist = []
                    if (args.orderBy) { sort = args.orderBy.replace(/,/g, ' ') }
                    if (args.name) { query["name"] = { "$regex": args.name, "$options": "i" }}
                    if (args.idIn) {
                        args.idIn.split(",").map((item, index) => {
                            idlist.push(mongoose.Types.ObjectId(item))
                        })
                        query["_id"] = { "$in": idlist }
                    }
                    let counter = db.models.Tag.count({}).exec(function (err, count) { return count })
                    return db.models.Tag.find(query).sort(sort)
                    .then(function(result) {
                        let res = connectionFromArray(result, args)
                        res.filteredCount = result.length
                        res.totalCount = counter
                        return res
                    })
                }
            },
            tag: {
                type: TagType,
                args: { id: { type: GraphQLID } },
                resolve: (root, {id}) => db.models.Tag.findById(id)
            },
            allEntries: {
                type: EntryListConnection,
                args: {
                    orderBy: { type: GraphQLString },
                    title: { type: GraphQLString },
                    status: { type: GraphQLString },
                    date_gt: { type: GraphQLString },
                    sticky: { type: GraphQLString },
                    section: { type: GraphQLString },
                    category: { type: GraphQLString },
                    tags: { type: GraphQLString },
                    owner: { type: GraphQLString },
                    search: { type: GraphQLString },
                    search_summary: { type: GraphQLString },
                    ...connectionArgs,
                },
                resolve: (root, { ...args }) => {
                    const query = {}
                    let sort = "-sticky -date"
                    if (args.orderBy) { sort = args.orderBy.replace(/,/g, ' ') }
                    if (args.title) { query["title"] = { "$regex": args.title, "$options": "i" }}
                    if (args.status) { query["status"] = { "$eq": args.status }}
                    if (args.date_gt) { query["date"] = { "$gt": args.date_gt }}
                    if (args.sticky) { query["sticky"] = { "$eq": args.sticky }}
                    if (args.section) { query["section"] = { "$eq": args.section }}
                    if (args.category) { query["category"] = { "$eq": args.category }}
                    if (args.tags) { query["tags"] = { "$in": [args.tags] }}
                    if (args.owner) { query["owner"] = { "$eq": args.owner }}
                    if (args.search) { query["title"] = { "$regex": args.search, "$options": "i" }}
                    if (args.search_summary) { query["summary"] = { "$regex": args.search_summary, "$options": "i" }}
                    let counter = db.models.Entry.count({}).exec(function (err, count) { return count })
                    return db.models.Entry.find(query).sort(sort)
                    .then(function(result) {
                        let res = connectionFromArray(result, args)
                        res.filteredCount = result.length
                        res.totalCount = counter
                        return res
                    })
                }
            },
            entry: {
                type: EntryType,
                args: { id: { type: GraphQLID } },
                resolve: (root, {id}) => db.models.Entry.findById(id)
            },
            allEntryLinks: {
                type: EntryLinkListConnection,
                args: {
                    orderBy: { type: GraphQLString },
                    entry: { type: GraphQLString },
                    ...connectionArgs,
                },
                resolve: (root, { ...args }) => {
                    const query = {}
                    let sort = "entry title"
                    if (args.orderBy) { sort = args.orderBy.replace(/,/g, ' ') }
                    if (args.entry) { query["entry"] = { "$eq": args.entry }}
                    let counter = db.models.EntryLink.count({}).exec(function (err, count) { return count })
                    return db.models.EntryLink.find(query).sort(sort)
                    .then(function(result) {
                        let res = connectionFromArray(result, args)
                        res.filteredCount = result.length
                        res.totalCount = counter
                        return res
                    })
                }
            },
            entrylink: {
                type: EntryLinkType,
                args: { id: { type: GraphQLID } },
                resolve: (root, {id}) => db.models.EntryLink.findById(id)
            },
        })
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            addUser: {
                type: UserResultType,
                args: { data: { name: 'data', type: new GraphQLNonNull(UserInputType) }},
                resolve: (root, {data}) => {
                    return db.models.User.findOne({username: data.username})
                    .then(function(user) {
                        let errors = []
                        if (user) {
                            if (user.username == data.username) errors.push('username', 'A user with that username already exists.')
                            return { errors, nores }
                        } else {
                            return db.models.User.create(data)
                            .then((function(object) { return { nores, user: object } }), function(err) {
                                let errors = getErrors(err)
                                return { errors, nores }
                            })
                        }
                    })
                }
            },
            changeUser: {
                type: UserResultType,
                args: {
                    id: { name: 'id', type: new GraphQLNonNull(GraphQLID) },
                    data: { name: 'data', type: new GraphQLNonNull(UserInputType) }
                },
                resolve: (root, {id, data}) => {
                    return db.models.User.findOne({username: data.username, _id: { $ne: id }})
                    .then(function(user) {
                        let errors = []
                        if (user) {
                            if (user.username == data.username) errors.push('username', 'A user with that username already exists.')
                            return { errors, nores }
                        } else {
                            /* We use findById instead of findByIdAndUpdate in order for the pre save functions to work */
                            return db.models.User.findById(id).exec()
                            .then(function(object) {
                                if (data.username != undefined) object.username = data.username
                                if (data.password != undefined) object.password = data.password
                                if (data.first_name != undefined) object.first_name = data.first_name
                                if (data.last_name != undefined) object.last_name = data.last_name
                                if (data.email != undefined) object.email = data.email
                                if (data.is_staff != undefined) object.is_staff = data.is_staff
                                if (data.is_active != undefined) object.is_active = data.is_active
                                return object.save()
                            })
                            .then((function(object) {
                                /* remove password from response. otherwise, the field is getting populated */
                                object.password = null
                                return { nores, user: object }
                            }) , function(err) {
                                let errors = getErrors(err)
                                return { errors, nores }
                            })
                        }
                    })
                }
            },
            addSection: {
                type: SectionResultType,
                args: { data: { name: 'data', type: new GraphQLNonNull(SectionInputType) }},
                resolve: (root, {data}) => {
                    if (!data.slug) {
                        data.slug = slugify(data.name)
                    } else {
                        data.slug = data.slug.toLowerCase();
                    }
                    return db.models.Section.findOne({$or: [{name: data.name}, {slug: data.slug}]})
                    .then(function(section) {
                        let errors = []
                        if (section) {
                            if (section.name == data.name) errors.push('name', 'A section with that name already exists.')
                            if (section.slug == data.slug) errors.push('slug', 'A section with that slug already exists.')
                            return { errors, nores }
                        } else {
                            return db.models.Section.create(data)
                            .then((function(object) { return { nores, section: object } }), function(err) {
                                let errors = getErrors(err)
                                return { errors, nores }
                            })
                        }
                    })
                }
            },
            changeSection: {
                type: SectionResultType,
                args: {
                    id: { name: 'id', type: new GraphQLNonNull(GraphQLID) },
                    data: { name: 'data', type: new GraphQLNonNull(SectionInputType) }
                },
                resolve: (root, {id, data}) => {
                    if (!data.slug) {
                        data.slug = slugify(data.name)
                    } else {
                        data.slug = data.slug.toLowerCase()
                    }
                    return db.models.Section.findOne({$or: [{name: data.name}, {slug: data.slug}], _id: { $ne: id }})
                    .then(function(section) {
                        let errors = []
                        if (section) {
                            if (section.name == data.name) errors.push('name', 'A section with that name already exists.')
                            if (section.slug == data.slug) errors.push('slug', 'A section with that slug already exists.')
                            return { errors, nores }
                        } else {
                            return db.models.Section.findByIdAndUpdate(id, data, { runValidators: true, new: true })
                            .then((function(object) { return { nores, section: object } }), function(err) {
                                errors = getErrors(err)
                                return { errors, nores }
                            })
                        }
                    })
                }
            },
            deleteSection: {
                type: SectionDeleteType,
                args: { id: { name: 'id', type: new GraphQLNonNull(GraphQLID) }},
                resolve: (root, {id}) => {
                    return db.models.Section.findByIdAndRemove(id)
                    .then((function(object) { return { deleted: true, section: object } }), function(err) {
                        return { deleted: false, section: object }
                    })
                }
            },
            addCategory: {
                type: CategoryResultType,
                args: { data: { name: 'data', type: new GraphQLNonNull(CategoryInputType) }},
                resolve: (root, {data}) => {
                    if (!data.slug) {
                        data.slug = slugify(data.name)
                    } else {
                        data.slug = data.slug.toLowerCase()
                    }
                    return db.models.Category.create(data)
                    .then((function(object) { return { nores, category: object } }), function(err) {
                        let errors = getErrors(err)
                        return { errors, nores }
                    })
                }
            },
            changeCategory: {
                type: CategoryResultType,
                args: {
                    id: { name: 'id', type: new GraphQLNonNull(GraphQLID) },
                    data: { name: 'data', type: new GraphQLNonNull(CategoryInputType) }
                },
                resolve: (root, {id, data}) => {
                    if (!data.slug) {
                        data.slug = slugify(data.name)
                    } else {
                        data.slug = data.slug.toLowerCase()
                    }
                    return db.models.Category.findByIdAndUpdate(id, data, { runValidators: true, new: true  })
                    .then((function(object) { return { nores, category: object } }), function(err) {
                        let errors = getErrors(err)
                        return { errors, nores }
                    })
                }
            },
            deleteCategory: {
                type: CategoryDeleteType,
                args: { id: { name: 'id', type: new GraphQLNonNull(GraphQLID) }},
                resolve: (root, {id}) => {
                    return db.models.Category.findByIdAndRemove(id)
                    .then((function(object) { return { deleted: true, category: object } }), function(err) {
                        return { deleted: false, category: object }
                    })
                }
            },
            addTag: {
                type: TagResultType,
                args: { data: { name: 'data', type: new GraphQLNonNull(TagInputType) }},
                resolve: (root, {data}) => {
                    return db.models.Tag.findOne({name: data.name})
                    .then(function(tag) {
                        let errors = []
                        if (tag) {
                            if (tag.name == data.name) errors.push('name', 'A tag with that name already exists.')
                            return { errors, nores }
                        } else {
                            return db.models.Tag.create(data)
                            .then((function(object) { return { nores, tag: object } }), function(err) {
                                let errors = getErrors(err)
                                return { errors, nores }
                            })
                        }
                    })
                }
            },
            changeTag: {
                type: TagResultType,
                args: {
                    id: { name: 'id', type: new GraphQLNonNull(GraphQLID) },
                    data: { name: 'data', type: new GraphQLNonNull(TagInputType) }
                },
                resolve: (root, {id, data}) => {
                    return db.models.Tag.findOne({name: data.name, _id: { $ne: id }})
                    .then(function(tag) {
                        let errors = []
                        if (tag) {
                            if (tag.name == data.name) errors.push('name', 'A tag with that name already exists.')
                            return { errors, nores }
                        } else {
                            return db.models.Tag.findByIdAndUpdate(id, data, { runValidators: true, new: true  })
                            .then((function(object) { return { nores, tag: object } }), function(err) {
                                let errors = getErrors(err)
                                return { errors, nores }
                            })
                        }
                    })
                }
            },
            deleteTag: {
                type: TagDeleteType,
                args: { id: { name: 'id', type: new GraphQLNonNull(GraphQLID) }},
                resolve: (root, {id}) => {
                    return db.models.Tag.findByIdAndRemove(id)
                    .then((function(object) { return { deleted: true, tag: object } }), function(err) {
                        return { deleted: false, tag: object }
                    })
                }
            },
            addEntry: {
                type: EntryResultType,
                args: { data: { name: 'data', type: new GraphQLNonNull(EntryInputType) }},
                resolve: (root, {data}) => {
                    /* prevent Cast to ObjectID failed for ... */
                    if (data.category == "") data.category = null
                    return db.models.Entry.create(data)
                    .then((function(object) { return { nores, entry: object } }), function(err) {
                        let errors = getErrors(err)
                        return { errors, nores }
                    })
                }
            },
            changeEntry: {
                type: EntryResultType,
                args: {
                    id: { name: 'id', type: new GraphQLNonNull(GraphQLID) },
                    data: { name: 'data', type: new GraphQLNonNull(EntryInputType) }
                },
                resolve: (root, {id, data}) => {
                    /* prevent Cast to ObjectID failed for ... */
                    if (data.category == "") data.category = null
                    /* set updatedate because presave is not called with findByIdAndUpdate */
                    data.updatedate = Date.now()
                    return db.models.Entry.findByIdAndUpdate(id, data, { runValidators: true, new: true  })
                    .then((function(object) { return { nores, entry: object } }), function(err) {
                        let errors = getErrors(err)
                        return { errors, nores }
                    })
                }
            },
            deleteEntry: {
                type: EntryDeleteType,
                args: { id: { name: 'id', type: new GraphQLNonNull(GraphQLID) }},
                resolve: (root, {id}) => {
                    return db.models.Entry.findByIdAndRemove(id)
                    .then((function(object) { return { deleted: true, entry: object } }), function(err) {
                        return { deleted: false, entry: object }
                    })
                }
            },
            addEntryLink: {
                type: EntryLinkResultType,
                args: { data: { name: 'data', type: new GraphQLNonNull(EntryLinkInputType) }},
                resolve: (root, {data}) => {
                    return db.models.EntryLink.create(data)
                    .then((function(object) { return { nores, entrylink: object } }), function(err) {
                        let errors = getErrors(err)
                        return { errors, nores }
                    })
                }
            },
            changeEntryLink: {
                type: EntryLinkResultType,
                args: {
                    id: { name: 'id', type: new GraphQLNonNull(GraphQLID) },
                    data: { name: 'data', type: new GraphQLNonNull(EntryLinkInputType) }
                },
                resolve: (root, {id, data}) => {
                    return db.models.EntryLink.findByIdAndUpdate(id, data, { runValidators: true, new: true  })
                    .then((function(object) { return { nores, entrylink: object } }), function(err) {
                        let errors = getErrors(err)
                        return { errors, nores }
                    })
                }
            },
            deleteEntryLink: {
                type: EntryLinkDeleteType,
                args: { id: { name: 'id', type: new GraphQLNonNull(GraphQLID) }},
                resolve: (root, {id}) => {
                    return db.models.EntryLink.findByIdAndRemove(id)
                    .then((function(object) { return { deleted: true, entrylink: object } }), function(err) {
                        return { deleted: false, entrylink: object }
                    })
                }
            },
        })
    }),
});

export default schema;
