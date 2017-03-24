var express = require('express')
var paginate = require('express-paginate')
var db = require('../db')
var mongoose = require('mongoose')

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

function handleErrors(res, err) {
    res.status(400)
    if (err.name === "ValidationError") {
        var errors = {}
        var obj = Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message
        })
        res.json(errors)
    } else {
        res.json(err)
    }
}

var createRouter = function () {
    var router = express.Router()

    router.get('/', function(req, res) {
        res.json({
            message: 'crudl example with Node.js/Express',
        });
    });

    // Users
    router.route('/users')
    .get(function (req, res) {
        const query = {}
        let counter = 0
        let sort = "username"
        if (req.query.ordering) sort = req.query.ordering.replace(/,/g, ' ')
        db.models.User.count({}, function (err, count) { counter = count });
        db.models.User.paginate(query, {
            select: "username first_name last_name email is_staff is_active date_joined",
            sort: sort,
            page: req.query.page,
            limit: req.query.limit,
        }, function(err, result) {
            result["counter"] = counter
            res.json(result);
        })
    })
    .post(function (req, res) {
        db.models.User.findOne({username: req.body.username}, function (err, result) {
            let errors = {}
            if (result) {
                if (result.username == req.body.username) errors['username'] = 'A user with that username already exists.'
                res.status(400).json(errors)
            } else {
                db.models.User.create(req.body, function (err, result) {
                    if (err) {
                        handleErrors(res, err)
                    } else {
                        res.json(result);
                    }
                })
            }
        })
    })

    router.route('/users/:id')
    .get(function (req, res) {
        console.log('Searching for ' + req.params.id);
        db.models.User.findById(req.params.id, "username first_name last_name email is_staff is_active date_joined", function(err, result) {
            res.json(result);
        })
    })
    .patch(function (req, res) {
        console.log(`Updating XXX ${req.params.id}`);
        db.models.User.findOne({username: req.body.username, _id: { $ne: req.params.id }}, function (err, result) {
            let errors = {}
            if (result) {
                if (result.username == req.body.username) errors['username'] = 'A user with that username already exists.'
                res.status(400).json(errors)
            } else {
                /* We use findById instead of findByIdAndUpdate in order for the pre save functions to work */
                db.models.User.findById(req.params.id).exec()
                .then(function(object) {
                    if (req.body["username"] != undefined) object.username = req.body["username"]
                    if (req.body["password"] != undefined) object.password = req.body["password"]
                    if (req.body["first_name"] != undefined) object.first_name = req.body["first_name"]
                    if (req.body["last_name"] != undefined) object.last_name = req.body["last_name"]
                    if (req.body["email"] != undefined) object.email = req.body["email"]
                    if (req.body["is_staff"] != undefined) object.is_staff = req.body["is_staff"]
                    if (req.body["is_active"] != undefined) object.is_active = req.body["is_active"]
                    return object.save()
                })
                .then((function(object) {
                    /* remove password from response. otherwise, the field is getting populated */
                    object.password = null
                    res.json(object)
                }), function(err) {
                    handleErrors(res, err)
                })
            }
        })
    })
    .delete(function (req, res) {
        res.status(405)
    })

    // Sections
    router.route('/sections')
    .get(function (req, res) {
        const query = {}
        let counter = 0
        let sort = "slug"
        let idlist = []
        if (req.query.ordering) sort = req.query.ordering.replace(/,/g, ' ')
        if (req.query.name) { query["name"] = { "$regex": req.query.name, "$options": "i" }}
        if (req.query.search) { query["name"] = { "$regex": req.query.search, "$options": "i" }}
        if (req.query.idIn) {
            req.query.idIn.split(",").map((item, index) => {
                idlist.push(mongoose.Types.ObjectId(item))
            })
            query["_id"] = { "$in": idlist }
        }
        db.models.Section.count({}, function (err, count) { counter = count });
        db.models.Section.paginate(query, {
            select: "name slug position",
            sort: sort,
            page: req.query.page,
            limit: req.query.limit,
        }, function(err, result) {
            result["counter"] = counter
            res.json(result);
        })
    })
    .post(function (req, res) {
        if (!req.body.slug) {
            req.body.slug = slugify(req.body.name)
        } else {
            req.body.slug = req.body.slug.toLowerCase();
        }
        db.models.Section.findOne({$or: [{name: req.body.name}, {slug: req.body.slug}]}, function (err, result) {
            let errors = {}
            if (result) {
                if (result.name == req.body.name) errors['name'] = 'A section with that name already exists.'
                if (result.slug == req.body.slug) errors['slug'] = 'A section with that slug already exists.'
                res.status(400).json(errors)
            } else {
                db.models.Section.create(req.body, function (err, result) {
                    if (err) {
                        handleErrors(res, err)
                    } else {
                        res.json(result);
                    }
                })
            }
        })
    })

    router.route('/sections/:id')
    .get(function (req, res) {
        console.log('Searching for ' + req.params.id);
        db.models.Section.findById(req.params.id, "name slug position", function(err, result) {
            res.json(result)
        })
    })
    .patch(function (req, res) {
        console.log(`Updating ${req.params.id}`);
        if (!req.body.slug) {
            req.body.slug = slugify(req.body.name)
        } else {
            req.body.slug = req.body.slug.toLowerCase();
        }
        db.models.Section.findOne({$or: [{name: req.body.name}, {slug: req.body.slug}], _id: { $ne: req.params.id }}, function (err, result) {
            let errors = {}
            if (result) {
                if (result.name == req.body.name) errors['name'] = 'A section with that name already exists.'
                if (result.slug == req.body.slug) errors['slug'] = 'A section with that slug already exists.'
                res.status(400).json(errors)
            } else {
                db.models.Section.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true, context: 'query'  }, function (err, result) {
                    if (err) {
                        handleErrors(res, err)
                    } else {
                        res.json(result);
                    }
                })
            }
        })
    })
    .delete(function (req, res) {
        console.log(`Deleting ${req.params.id}`);
        db.models.Section.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(400)
                res.send(err)
            } else {
                res.json({message: 'Section has been removed.'});
            }
        })
    })

    // Categories
    router.route('/categories')
    .get(function (req, res) {
        const query = {}
        let counter = 0
        let sort = "slug"
        let idlist = []
        if (req.query.ordering) sort = req.query.ordering.replace(/,/g, ' ')
        if (req.query.section) { query["section"] = { "$eq": req.query.section }}
        if (req.query.name) { query["name"] = { "$regex": req.query.name, "$options": "i" }}
        if (req.query.search) { query["name"] = { "$regex": req.query.search, "$options": "i" }}
        if (req.query.idIn) {
            req.query.idIn.split(",").map((item, index) => {
                idlist.push(mongoose.Types.ObjectId(item))
            })
            query["_id"] = { "$in": idlist }
        }
        db.models.Category.count({}, function (err, count) { counter = count });
        db.models.Category.paginate(query, {
            select: "section name slug position",
            sort: sort,
            populate: "section",
            page: req.query.page,
            limit: req.query.limit,
        }, function(err, result) {
            result["counter"] = counter
            res.json(result);
        })
    })
    .post(function (req, res) {
        if (!req.body.slug) {
            req.body.slug = slugify(req.body.name)
        } else {
            req.body.slug = req.body.slug.toLowerCase();
        }
        db.models.Category.create(req.body, function (err, result) {
            if (err) {
                handleErrors(res, err)
            } else {
                res.json(result);
            }
        })
    })

    router.route('/categories/:id')
    .get(function (req, res) {
        console.log('Searching for ' + req.params.id);
        db.models.Category.findById(req.params.id, "section name slug position", function(err, result) {
            res.json(result)
        })
    })
    .patch(function (req, res) {
        console.log(`Updating ${req.params.id}`);
        if (!req.body.slug) {
            req.body.slug = slugify(req.body.name)
        } else {
            req.body.slug = req.body.slug.toLowerCase();
        }
        db.models.Category.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true, context: 'query'  }, function (err, result) {
            if (err) {
                handleErrors(res, err)
            } else {
                res.json(result);
            }
        })
    })
    .delete(function (req, res) {
        console.log(`Deleting ${req.params.id}`);
        db.models.Category.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(400)
                res.send(err)
            } else {
                res.json({message: 'Category has been removed.'});
            }
        })
    })

    // Tags
    router.route('/tags')
    .get(function (req, res) {
        const query = {}
        let counter = 0
        let sort = "slug"
        let idlist = []
        if (req.query.ordering) sort = req.query.ordering.replace(/,/g, ' ')
        if (req.query.name) { query["name"] = { "$regex": req.query.name, "$options": "i" }}
        if (req.query.search) { query["name"] = { "$regex": req.query.search, "$options": "i" }}
        if (req.query.idIn) {
            req.query.idIn.split(",").map((item, index) => {
                idlist.push(mongoose.Types.ObjectId(item))
            })
            query["_id"] = { "$in": idlist }
        }
        db.models.Tag.count({}, function (err, count) { counter = count });
        db.models.Tag.paginate(query, {
            select: "name slug",
            sort: sort,
            page: req.query.page,
            limit: req.query.limit,
        }, function(err, result) {
            result["counter"] = counter
            res.json(result);
        })
    })
    .post(function (req, res) {
        req.body.slug = slugify(req.body.name)
        db.models.Tag.findOne({name: req.body.name}, function (err, result) {
            let errors = {}
            if (result) {
                if (result.name == req.body.name) errors['name'] = 'A tag with that name already exists.'
                res.status(400).json(errors)
            } else {
                db.models.Tag.create(req.body, function (err, result) {
                    if (err) {
                        handleErrors(res, err)
                    } else {
                        res.json(result);
                    }
                })
            }
        })
    })

    router.route('/tags/:id')
    .get(function (req, res) {
        console.log('Searching for ' + req.params.id);
        db.models.Tag.findById(req.params.id, "name slug", function(err, result) {
            res.json(result)
        })
    })
    .patch(function (req, res) {
        console.log(`Updating ${req.params.id}`);
        req.body.slug = slugify(req.body.name)
        db.models.Tag.findOne({name: req.body.name, _id: { $ne: req.params.id }}, function (err, result) {
            let errors = {}
            if (result) {
                if (result.name == req.body.name) errors['name'] = 'A section with that name already exists.'
                res.status(400).json(errors)
            } else {
                db.models.Tag.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true, context: 'query'  }, function (err, result) {
                    if (err) {
                        handleErrors(res, err)
                    } else {
                        res.json(result);
                    }
                })
            }
        })
    })
    .delete(function (req, res) {
        console.log(`Deleting ${req.params.id}`);
        db.models.Tag.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(400)
                res.send(err)
            } else {
                res.json({message: 'Tag has been removed.'});
            }
        })
    })

    // Entries
    router.route('/entries')
    .get(function (req, res) {
        const query = {}
        let counter = 0
        let sort = "-sticky -date"
        if (req.query.ordering) sort = req.query.ordering.replace(/,/g, ' ')
        if (req.query.title) { query["title"] = { "$regex": req.query.title, "$options": "i" }}
        if (req.query.status) { query["status"] = { "$eq": req.query.status }}
        if (req.query.date_gt) { query["date"] = { "$gt": req.query.date_gt }}
        if (req.query.sticky) { query["sticky"] = { "$eq": req.query.sticky }}
        if (req.query.section) { query["section"] = { "$eq": req.query.section }}
        if (req.query.category) { query["category"] = { "$eq": req.query.category }}
        if (req.query.tags) { query["tags"] = { "$in": [req.query.tags] }}
        if (req.query.owner) { query["owner"] = { "$eq": req.query.owner }}
        if (req.query.search) { query["title"] = { "$regex": req.query.search, "$options": "i" }}
        if (req.query.search_summary) { query["summary"] = { "$regex": req.query.search_summary, "$options": "i" }}
        db.models.Entry.count({}, function (err, count) { counter = count });
        db.models.Entry.paginate(query, {
            select: "title status date sticky section category tags summary body owner createdate updatedate",
            sort: sort,
            populate: "section category",
            page: req.query.page,
            limit: req.query.limit,
        }, function(err, result) {
            result["counter"] = counter
            res.json(result);
        })
    })
    .post(function (req, res) {
        /* prevent Cast to ObjectID failed for ... */
        if (req.body.category == "") req.body.category = null
        db.models.Entry.create(req.body, function (err, result) {
            if (err) {
                handleErrors(res, err)
            } else {
                res.json(result);
            }
        })
    })

    router.route('/entries/:id')
    .get(function (req, res) {
        console.log('Searching for ' + req.params.id);
        db.models.Entry.findById(req.params.id, "title status date sticky section category tags summary body owner createdate updatedate", function(err, result) {
            res.json(result);
        })
    })
    .patch(function (req, res) {
        console.log(`Updating ${req.params.id}`);
        /* prevent Cast to ObjectID failed for ... */
        if (req.body.category == "") req.body.category = null
        /* set updatedate because presave is not called with findByIdAndUpdate */
        req.body.updatedate = Date.now()
        db.models.Entry.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true, context: 'query'  }, function (err, result) {
            if (err) {
                handleErrors(res, err)
            } else {
                res.json(result);
            }
        })
    })
    .delete(function (req, res) {
        console.log(`Deleting ${req.params.id}`);
        db.models.Entry.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(400)
                res.send(err)
            } else {
                res.json({message: 'Entry has been removed.'});
            }
        })
    })

    // Entries > Links
    router.route('/entrylinks')
    .get(function (req, res) {
        const query = {}
        let counter = 0
        let sort = "entry title"
        if (req.query.entry) { query["entry"] = { "$eq": req.query.entry }}
        if (req.query.title) { query["title"] = { "$regex": req.query.title, "$options": "i" }}
        db.models.EntryLink.count({}, function (err, count) { counter = count });
        db.models.EntryLink.paginate(query, {
            select: "entry url title description position",
            sort: sort,
            page: req.query.page,
            limit: req.query.limit,
        }, function(err, result) {
            result["counter"] = counter
            res.json(result);
        })
    })
    .post(function (req, res) {
        db.models.EntryLink.create(req.body, function (err, result) {
            if (err) {
                handleErrors(res, err)
            } else {
                res.json(result);
            }
        })
    })

    router.route('/entrylinks/:id')
    .get(function (req, res) {
        console.log('Searching for ' + req.params.id);
        db.models.EntryLink.findById(req.params.id, "entry url title description position", function(err, result) {
            res.json(result)
        })
    })
    .patch(function (req, res) {
        console.log(`Updating ${req.params.id}`);
        db.models.EntryLink.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true, context: 'query' }, function (err, result) {
            if (err) {
                handleErrors(res, err)
            } else {
                res.json(result);
            }
        })
    })
    .delete(function (req, res) {
        console.log(`Deleting ${req.params.id}`);
        db.models.EntryLink.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(400)
                res.send(err)
            } else {
                res.json({message: 'Entrylink has been removed.'});
            }
        })
    })

    router.route('/login')
    .post(function (req, res) {
        if (!req.body.username || !req.body.password) {
            let errors = {}
            if (!req.body.username) errors["username"] = "username is required."
            if (!req.body.password) errors["password"] = "password is required."
            return res.status(400).send(errors)
        }
        db.models.User.findOne({ username: req.body.username }, function (err, user) {
            if (err) {
                res.status(400)
                res.send(err)
            } else if (user && user.token) {
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err) res.send(err)
                    if (isMatch) {
                        res.json({'token': user.token, 'user': user._id, 'username': user.username})
                    } else {
                        res.status(400).send({"_error": "Unable to log in with provided credentials."})
                    }
                })
            } else if (user && !user.is_active) {
                res.status(400).send({"_error": "User account is disabled."})
            } else if (user && !user.is_staff) {
                res.status(400).send({"_error": "User has no access to crudl."})
            } else {
                res.status(400).send({"_error": "Unable to log in with provided credentials."})
            }
        })
    })

    return router
}

module.exports = {
    router: createRouter,
}
