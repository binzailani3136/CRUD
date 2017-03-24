import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID
} from 'graphql'
import { connectionDefinitions, } from 'graphql-relay'
import { EntryType, EntryInputType } from './entry'
var db = require('../../db')

let EntryLinkType = new GraphQLObjectType({
    name: 'Entrylink',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        entry: {
            type: EntryType,
            resolve(parent, args) {
                return db.models.Entry.findById(parent.entry);
            }
        },
        url: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        position: {
            type: GraphQLInt
        }
    })
});

let EntryLinkInputType = new GraphQLInputObjectType({
    name: 'EntryLinkInput',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        clientMutationId: {
            type: GraphQLString
        },
        entry: {
            type: GraphQLString
        },
        url: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        position: {
            type: GraphQLInt
        }
    })
});

let EntryLinkResultType = new GraphQLObjectType({
    name: 'EntryLinkResult',
    fields: () => ({
        errors: {
            type: new GraphQLList(GraphQLString),
        },
        entrylink: {
            type: EntryLinkType
        }
    })
});

let EntryLinkDeleteType = new GraphQLObjectType({
    name: 'EntryLinkDelete',
    fields: () => ({
        deleted: {
            type: GraphQLBoolean
        },
        entrylink: {
            type: EntryLinkType
        }
    })
});


const { connectionType: EntryLinkListConnection, edgeType: EntryLinkListEdge } =
    connectionDefinitions({
        name: 'EntryLinkList',
        nodeType: EntryLinkType,
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
    EntryLinkListConnection: EntryLinkListConnection,
    EntryLinkType: EntryLinkType,
    EntryLinkInputType: EntryLinkInputType,
    EntryLinkResultType: EntryLinkResultType,
    EntryLinkDeleteType: EntryLinkDeleteType
}
