const router = require(`express`).Router();

// import route groups (ex: apiRoutes, homeRoutes, etc)
const apiRoutes = require(`./api`);

// router.use
router.use(`/api`, apiRoutes);

// Directs all incorrect routes to an error
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;