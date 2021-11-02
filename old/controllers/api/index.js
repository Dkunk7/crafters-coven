const router = require(`express`).Router();

// Import api routes
const userRoutes = require(`./user-routes`);
const noteRoutes = require(`./note-routes`);
const commentRoutes = require(`./comment-routes`);

// router.use the routes
router.use(`/users`, userRoutes);
router.use(`/notes`, noteRoutes);
router.use(`/comments`, commentRoutes);


module.exports = router;