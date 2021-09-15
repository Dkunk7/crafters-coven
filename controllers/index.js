const router = require(`express`).Router();

// import route groups (ex: apiRoutes, homeRoutes, etc)
const apiRoutes = require(`./api`);
const homeRoutes = require(`./home-routes`);

// router.use
router.use(`/api`, apiRoutes);
router.use(`/`, homeRoutes);

// Directs all incorrect routes to an error
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;