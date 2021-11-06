import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_NOTE = gql`
    mutation addNote($title: String!, $noteContent: String!, $isCoordinate: Boolean) { # check that isCoordinate is done correctly here
        addNote(title: $title, noteContent: $noteContent, isCoordinate: $isCoordinate) { # does it need to be required? Will it create itself? I think it will
            _id
            title
            noteContent
            isCoordinate
            createdAt
            username
            commentCount
            comments { # do I need more info in comments here? *Referenced ADD_THOUGHT in deep-thoughts
                _id
            }
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($noteId: ID!, $commentContent: String!) {
        addComment(noteId: $noteId, commentContent: $commentContent) { # is the stuff below correct?
            _id
            commentContent
            createdAt
            comments {
                _id
                commentContent
                createdAt
                username
            }
        }
    }
`;

export const UPDATE_NOTE = gql`
    mutation updateNote($noteId: ID!, $title: String!, $noteContent: String!) { # TEST THIS
        addNote(noteId: $noteId, title: $title, noteContent: $noteContent) {
            _id
            title
            isCoordinate
            createdAt
            noteContent
            commentCount
        }
    }
`;

export const UPDATE_COMMENT = gql`
    mutation
`;

export const DELETE_NOTE = gql`
    mutation
`;

export const DELETE_COMMENT = gql`
    mutation
`;