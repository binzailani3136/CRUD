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
import { SectionType, SectionInputType } from './section'
var db = require('../../db')

let CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        section: {
            type: SectionType,
            resolve(parent, args) {
                return db.models.Section.findById(parent.section);
            }
        },
        name: {
            type: GraphQLString
        },
        slug: {
            type: GraphQLString
        },
        position: {
            type: GraphQLInt
        }
    })
});

let CategoryInputType = new GraphQLInputObjectType({
    name: 'CategoryInput',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        clientMutationId: {
            type: GraphQLString
        },
        section: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        slug: {
            type: GraphQLString
        },
        position: {
            type: GraphQLInt
        }
    })
});

let CategoryResultType = new GraphQLObjectType({
    name: 'CategoryResult',
    fields: () => ({
        errors: {
            type: new GraphQLList(GraphQLString),
        },
        category: {
            type: CategoryType
        }
    })
});

let CategoryDeleteType = new GraphQLObjectType({
    name: 'CategoryDelete',
    fields: () => ({
        deleted: {
            type: GraphQLBoolean
        },
        category: {
            type: CategoryType
        }
    })
});

const { connectionType: CategoryListConnection, edgeType: CategoryListEdge } =
    connectionDefinitions({
        name: 'CategoryList',
        nodeType: CategoryType,
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
    CategoryListConnection: CategoryListConnection,
    CategoryType: CategoryType,
    CategoryInputType: CategoryInputType,
    CategoryResultType: CategoryResultType,
    CategoryDeleteType: CategoryDeleteType
}
