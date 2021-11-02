const router = require(`express`).Router();
const { Comment } = require(`../../models`);
// const withAuth = require(`../../utils/auth`);

// GET all comments (/api/comments)
router.get(`/`, (req, res) => {
    // Do I need any extra info attached to the findAll?
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET single comment (/api/comments/1)
router.get(`/:id`, (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: `No comment found with this id` });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST - create comment (/api/comments)
router.post(`/`, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            // had to change user_id from req.session to req.body. Maybe figure that out later?
            user_id: req.body.user_id,
            note_id: req.body.note_id,
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// PUT - edit comment (/api/comments/1)
router.put(`/:id`, (req, res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text,
            user_id: req.body.user_id,
            note_id: req.body.note_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: `No comment found with this id` });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE comment (/api/coments/1)
router.delete(`/:id`, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: `No comment found with this id` });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
