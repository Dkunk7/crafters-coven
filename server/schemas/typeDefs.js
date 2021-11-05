const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        isAdmin: Boolean  # is this necessary to validate admin privelages?
        notes: [Note]
    }

    type Note {
        _id: ID
        title: String
        noteContent: String
        isCoordinate: Boolean
        createdAt: String # I think this is a string because the date will be formatted into a string
        username: String
        commentCount: Int
        comments: [Comment]
    }

    type Comment {
        _id: ID
        commentContent: String
        createdAt: String
        username: String
    }

    type Query {
        me: User  # This is probably something I want, but I'm not completely sure
        users: [User]
        user(username: String!): User # ! means username is required to search for single user
        notes(username: String): [Note] # no ! means searching by username is optional; it's an array because it could have many results
        note(_id: ID!): Note # _id is required to search for a single note
    }

    type Mutation {
        login(email: String!, password: String!): Auth 
        addUser(username: String!, email: String!, password: String!): Auth
        addNote(title: String!, noteContent: String!, isCoordinate: Boolean): Note # isCoordinate is not required; false by default
        addComment(noteId: ID!, commentContent: String!): Note # This is performed on note? Also noteId doesn't exist anywhere AS noteId. How does this work? *Referenced deep-thoughts
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;