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