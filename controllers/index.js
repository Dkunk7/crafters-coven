const router = require(`express`).Router();

// import route groups (ex: apiRoutes, homeRoutes, etc)

// router.use

// Directs all unused routes to an error
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;