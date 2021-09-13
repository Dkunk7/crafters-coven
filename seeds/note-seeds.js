const { Note } = require(`../models`);

const noteData = [
    {

    },
]

const seedNotes = () => Note.bulkCreate(noteData);
module.exports = seedNotes;