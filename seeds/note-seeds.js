const { Note } = require(`../models`);

const noteData = [
    {
        title: `mimecraft`,
        content: `big game for many friend`,
        user_id: 1
    },
    {
        title: `dog in the woods`,
        content: `hunt`,
        user_id: 1
    },
    {
        title: `how to find base`,
        content: `help please am lost`,
        user_id: 2
    },
    {
        title: `carrot`,
        content: `vetetable?`,
        user_id: 4
    },
    {
        title: `running`,
        content: `i am 180,000 blocks away, incoming`,
        user_id: 3
    },
    {
        title: `girls in minecraft`,
        content: `do they are real?`,
        user_id: 5
    },
    {
        title: `home base!`,
        content: `0, 0, 0`,
        user_id: 1
    },
    {
        title: `scary nether stuff`,
        content: `84, 56, -200`,
        user_id: 5
    },
    {
        title: `my coordinate`,
        content: `1800, 44, 485`,
        user_id: 2
    },
]

const seedNotes = () => Note.bulkCreate(noteData);
module.exports = seedNotes;