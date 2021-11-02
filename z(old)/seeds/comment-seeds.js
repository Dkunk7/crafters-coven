const { Comment } = require(`../models`);

const commentData = [
    {
        comment_text: `i also have friend`,
        user_id: 5,
        note_id: 1
    },
    {
        comment_text: `carrot is for sure veggie`,
        user_id: 1,
        note_id: 4
    },
    {
        comment_text: `great thanks`,
        user_id: 4,
        note_id: 4
    },
    {
        comment_text: `yes am on my way`,
        user_id: 3,
        note_id: 7
    },
]

const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;