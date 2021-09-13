const router = require(`express`).Router();
const { User, Note, Comment } = require(`../../models`);
// const withAuth = require() --- Maybe add this later

// GET - all users (/api/users)
router.get(`/`, (req, res) => {
    User.findAll({
        attributes: { exclude: [`password`] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET - single user (/api/users/1)
router.get(`/:id`, (req, res) => {
    User.findOne({
        attributes: { exclude: [`password`] },
        include: [
            {
                model: Note,
                attributes: [`id`, `title`, `content`, `is_coordinate`, `created_at`]
            },
            {
                model: Comment,
                attributes: [`id`, `comment_text`, `created_at`],
                include: {
                    model: Note,
                    attributes: [`title`]
                }
            }
        ],
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: `No user found with this id` });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    
});

// POST - create user (/api/users)
router.post(`/`, (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    });
});

// login route
router.post(`/login`, (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: `No user with that email address`});
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: `Incorrect password` });
            return;
        }
        // I'm still iffy on session variables
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: `You are now logged in!` });
        });
    });
});

// PUT - update user (/api/users/1)
router.put(`/:id`, (req, res) => {
    User.update(req.body, {
        // Not exactly sure how individual hooks works
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: `No user found with this id` });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE user (/api/user/1)
router.delete(`/:id`, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: `No user found with this id `});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// logout route
router.post(`/logout`, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;