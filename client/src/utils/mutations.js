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
            comments {
                _id
                commentContent
                createdAt
                username
            }
        }
    }
`;