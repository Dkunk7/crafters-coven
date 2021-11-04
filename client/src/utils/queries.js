import { gql } from '@apollo/client';

export const QUERY_NOTES = gql`
    query notes($username: String) {
        notes(username: $username) {
            _id
            title
            noteContent
            isCoordinate
            createdAt
            username
            commentCount
            comments {
                _id
                commentContent
                createdAt
                username
            }
        }
    }
`;

export const QUERY_NOTE = gql`
    query note($id: ID!) {
        thought(_id: $id) {
            _id
            title
            noteContent
            isCoordinate
            createdAt
            username
            commentCount
            comments {
                _id
                commentContent
                createdAt
                username
            }
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            isAdmin
            notes { # username and comments are not included here
                _id
                title
                noteContent
                isCoordinate
                createdAt
                commentCount
            }
        }
    }
`;

export const QUERY_ME = gql`
    {
        me { # how does 'me' work?
            _id
            username
            email
            isAdmin
            notes {
                _id
                title
                noteContent
                isCoordinate
                createdAt
                commentCount
                comments {
                    _id
                    commentContent
                    createdAt
                    username
                }
            }
        }
    }
`;