import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt
} from 'graphql'
import { connectionDefinitions, } from 'graphql-relay'

let UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        username: {
            type: GraphQLString
        },
        first_name: {
            type: GraphQLString
        },
        last_name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        is_staff: {
            type: GraphQLBoolean
        },
        is_active: {
            type: GraphQLBoolean
        },
        date_joined: {
            type: GraphQLString
        }
    })
})

let UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        clientMutationId: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        first_name: {
            type: GraphQLString
        },
        last_name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        is_staff: {
            type: GraphQLBoolean
        },
        is_active: {
            type: GraphQLBoolean
        },
    })
})

let UserResultType = new GraphQLObjectType({
    name: 'UserResult',
    fields: () => ({
        errors: {
            type: new GraphQLList(GraphQLString),
        },
        user: {
            type: UserType
        }
    })
});

let UserDeleteType = new GraphQLObjectType({
    name: 'UserDelete',
    fields: () => ({
        deleted: {
            type: GraphQLBoolean
        },
        user: {
            type: UserType
        }
    })
});

const { connectionType: UserListConnection, edgeType: UserListEdge } =
    connectionDefinitions({
        name: 'UserList',
        nodeType: UserType,
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
    UserListConnection: UserListConnection,
    UserType: UserType,
    UserInputType: UserInputType,
    UserResultType: UserResultType,
    UserDeleteType: UserDeleteType
}
