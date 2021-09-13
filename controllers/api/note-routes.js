const router = require(`express`).Router();
const { User, Note, Comment } = require(`../../models`);
const sequelize = require(`../../config/connection`);
// const withAuth = require(`../../utils/auth`);

// GET all notes (/api/notes)
router.get(`/`, (req, res) => {
    Note.findAll({
        attributes: [`id`, `title`, `content`, `is_coordinate`, `created_at`],
        order: [[`created_at`, `DESC`]],
        include: [
            {
                model: Comment,
                attributes: [`id`, `comment_text`, `note_id`, `user_id`, `created_at`],
                include: {
                    model: User,
                    attributes: [`username`]
                }
            },
            {
                model: User,
                attributes: [`username`]
            }
        ]
    })
    .then(dbNoteData => res.json(dbNoteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET single note (/api/note/1)
router.get(`/:id`, (req, res) => {
    Note.findOne({
        where: {
            id: req.params.id
        },
        attributes: [`id`, `title`, `content`, `is_coordinate`, `created_at`],
        include: [
            {
                model: Comment,
                attributes: [`id`, `comment_text`, `note_id`, `user_id`, `created_at`],
                include: {
                    model: User,
                    attributes: [`username`]
                }
            },
            {
                model: User,
                attributes: [`username`]
            }
        ]
    })
    .then(dbNoteData => {
        if (!dbNoteData) {
            res.status(404).json({ message: `No note found with this id` });
            return;
        }
        res.json(dbNoteData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST - create note (/api/notes)
router.post(`/`, (req, res) => {
    Note.create({
        title: req.body.title,
        content: req.body.content,
        // Do I include "is_coordinate" here? Default is false
        // Last time I tried, using session for user_id did not work. KEEP AN EYE ON THIS
        user_id: req.session.user_id
    })
    .then(dbNoteData => res.json(dbNoteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT - update note (/api/notes/1)
router.put(`/:id`, (req, res) => {
    Note.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbNoteData => {
        if (!dbNoteData) {
            res.status(404).json({ message: `No note found with this id` });
            return;
        }
        res.json(dbNoteData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE note (/api/notes/1)
router.delete(`/:id`, (req, res) => {
    Note.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbNoteData => {
        if (!dbNoteData) {
            res.status(404).json({ message: `No note found with this id` });
            return;
        }
        res.json(dbNoteData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;