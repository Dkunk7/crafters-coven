const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        isAdmin: Boolean  # is this necessary to validate admin privelages?
    }

    type Note {
        _id: ID
        title: String
        noteContent: String
        isCoordinate: Boolean
        createdAt: String
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
`;