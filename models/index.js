// import models when they're made
const User = require(`./User`);
const Note = require(`./Note`);
const Comment = require(`./Comment`);


// create associations (fuck those btw)

// Note associations
User.hasMany(Note, {
    foreignKey: `user_id`
});
Note.belongsTo(User, {
    foreignKey: `user_id`
});

// Comment associations
Comment.belongsTo(User, {
    foreignKey: `user_id`
});
Comment.belongsTo(Note, {
    foreignKey: `note_id`
});
User.hasMany(Comment, {
    foreignKey: `user_id`
});
Note.hasMany(Comment, {
    foreignKey: `note_id`
});


module.exports = { User, Note, Comment };