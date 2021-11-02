const { Schema } = require('mongoose'); // probably doesn't need model because it's a child of Note?
const dateFormatter = require('../utils/dateFormatter');

const commentSchema = new Schema(
    {
        commentContent: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 300, // maybe adjust?
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormatter(timestamp)
        },
        username: {
            type: String, // check how this works, same with Note
            required: true
        }
    },
    {
        toJSON: { // this is necessary for the 'get' in createdAt?
            getters: true
        }
    }
);

// no model here because it's a child of Note, I think
module.exports = commentSchema;