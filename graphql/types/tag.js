import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean
} from 'graphql'
import { connectionDefinitions, } from 'graphql-relay'


let TagType = new GraphQLObjectType({
    name: 'Tag',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        slug: {
            type: GraphQLString
        }
    })
})

let TagInputType = new GraphQLInputObjectType({
    name: 'TagInput',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        clientMutationId: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        slug: {
            type: GraphQLString
        }
    })
})

let TagResultType = new GraphQLObjectType({
    name: 'TagResult',
    fields: () => ({
        errors: {
            type: new GraphQLList(GraphQLString),
        },
        tag: {
            type: TagType
        }
    })
})

let TagDeleteType = new GraphQLObjectType({
    name: 'TagDelete',
    fields: () => ({
        deleted: {
            type: GraphQLBoolean
        },
        tag: {
            type: TagType
        }
    })
});

const { connectionType: TagListConnection, edgeType: TagListEdge } =
    connectionDefinitions({
        name: 'TagList',
        nodeType: TagType,
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
    TagListConnection: TagListConnection,
    TagType: TagType,
    TagInputType: TagInputType,
    TagResultType: TagResultType,
    TagDeleteType: TagDeleteType
}
