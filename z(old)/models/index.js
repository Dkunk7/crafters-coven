// import models when they're made
const User = require(`./User`);
const Note = require(`./Note`);
const Comment = require(`./Comment`);


// create associations (fuck those btw)

// Note associations
User.hasMany(Note, {
    foreignKey: `user_id`,
    // onDelete: `CASCADE`
});
Note.belongsTo(User, {
    foreignKey: `user_id`,
    // onDelete: `CASCADE`
});

// Comment associations
Comment.belongsTo(User, {
    foreignKey: `user_id`,
    onDelete: `CASCADE`
});
Comment.belongsTo(Note, {
    foreignKey: `note_id`,
    onDelete: `CASCADE`
});
User.hasMany(Comment, {
    foreignKey: `user_id`,
    // onDelete: `CASCADE`
});
Note.hasMany(Comment, {
    foreignKey: `note_id`,
    // onDelete: `CASCADE`
});


module.exports = { User, Note, Comment };