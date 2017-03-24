import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt
} from 'graphql'
import { connectionDefinitions, } from 'graphql-relay'
import { UserType, UserInputType } from './user'
import { SectionType, SectionInputType } from './section'
import { CategoryType, CategoryInputType } from './category'
import { TagType, TagInputType } from './tag'
var db = require('../../db')

let EntryType = new GraphQLObjectType({
    name: 'Entry',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        title: {
            type: GraphQLString
        },
        status: {
            type: new GraphQLEnumType({
                name: 'status',
                values: {
                    Draft: { value: 'Draft' },
                    Online: { value: 'Online' }
                }
            })
        },
        date: {
            type: GraphQLString
        },
        sticky: {
            type: GraphQLBoolean
        },
        section: {
            type: SectionType,
            resolve(parent, args) {
                return db.models.Section.findById(parent.section);
            }
        },
        category: {
            type: CategoryType,
            resolve(parent, args) {
                return db.models.Category.findById(parent.category);
            }
        },
        tags: {
            type: new GraphQLList(TagType),
            resolve(parent, args) {
                return db.models.Tag.find({_id: {$in: parent.tags}});
            }
        },
        summary: {
            type: GraphQLString
        },
        body: {
            type: GraphQLString
        },
        owner: {
            type: UserType,
            resolve(parent, args) {
                return db.models.User.findById(parent.owner);
            }
        },
        createdate: {
            type: GraphQLString
        },
        updatedate: {
            type: GraphQLString
        },
    })
});

let EntryInputType = new GraphQLInputObjectType({
    name: 'EntryInput',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        clientMutationId: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        },
        sticky: {
            type: GraphQLBoolean
        },
        section: {
            type: GraphQLString
        },
        category: {
            type: GraphQLString
        },
        tags: {
            type: new GraphQLList(GraphQLID),
        },
        summary: {
            type: GraphQLString
        },
        body: {
            type: GraphQLString
        },
        owner: {
            type: GraphQLString
        },
    })
});

let EntryResultType = new GraphQLObjectType({
    name: 'EntryResult',
    fields: () => ({
        errors: {
            type: new GraphQLList(GraphQLString),
        },
        entry: {
            type: EntryType
        }
    })
});

let EntryDeleteType = new GraphQLObjectType({
    name: 'EntryDelete',
    fields: () => ({
        deleted: {
            type: GraphQLBoolean
        },
        entry: {
            type: EntryType
        }
    })
});

const { connectionType: EntryListConnection, edgeType: EntryListEdge } =
    connectionDefinitions({
        name: 'EntryList',
        nodeType: EntryType,
        connectionFields: () => ({
            filteredCount: {
                type: GraphQLInt,
                resolve: (connection) => connection.filteredCount,
            },
            totalCount: {
                type: GraphQLInt,
                resolve: (connection) => connection.totalCount,
            }
        })
    })

module.exports = {
    EntryListConnection: EntryListConnection,
    EntryType: EntryType,
    EntryInputType: EntryInputType,
    EntryResultType: EntryResultType,
    EntryDeleteType: EntryDeleteType
}
