const router = require(`express`).Router();
// const sequelize = require(`../config/connection`);
const { User, Note, Comment } = require(`../models`);
const { Op } = require(`sequelize`);
// const withAuth = require(`../utils/auth`);

router.get(`/`, (req, res) => {
    // check if user is logged in. if not, send to login
    if (!req.session.loggedIn) {
        res.redirect(`/login`);
        return;
    }
    // The Comment.findAll works if I don't use this User.findOne.
    // It's probably unnecessary anyway bc the previous if statement
    // makes you login before continuing this get route

    User.findOne({
        where: {
            id: req.session.user_id
        }
    })
    .then(userData => {
        Comment.findAll({
            where: {
                user_id: userData.dataValues.id
            }
        })
        // console.log(userData)
        .then(commentData => {
            res.render(`dashboard`, {
                is_admin: userData.dataValues.is_admin,
                user: userData,
                comments: commentData
            })
        })
    })
    
    

    // Render dashboard, but what goes on the dashboard?
    // I think I want notes and coordinates to be two separate pages,
    // which means I dont want to display either of them on the dashboard.
    // If I can connect this to in game user info, I'd probably show
    // inventory on the main page. Otherwise maybe just do notes?

    // NOTE: Nav bar = Inventory?, Notes, Coordinates, Map?
    // You can make your inventory private
    // If those 4 things are on the navbar, what's on the page itself?
});

// if you're logged in, redirect to main page, otherwise go to login
router.get(`/login`, (req, res) => {
    if (req.session.loggedIn) {
        res.redirect(`/`);
        return;
    }

    res.render(`login`);
});

module.exports = router;