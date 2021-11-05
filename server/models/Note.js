const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment'); // this doesnt exist yet
const dateFormatter = require('../utils/dateFormatter'); // this ain't real yet

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        noteContent: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 500, // maybe adjust this?
            trim: true
        },
        isCoordinate: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormatter(timestamp) // don't forget to make this
        },
        username: { // check how this works and that it's correct (where is username brought in from?)
            type: String,
            required: true
        },
        comments: [commentSchema] 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true // I think this is needed to use the virtual below? And for the get above
        }
    }
);

// gets comment array length so I can easily show that shit on the notes page!
noteSchema.virtual('commentCount').get(function() { 
    return this.comments.length;
});

const Note = model('Note', noteSchema);

module.exports = Note;