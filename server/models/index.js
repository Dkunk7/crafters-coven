const User = require('./User');
const Note = require('./Note');

// this is for organization, and it allows you to import all models from one place
// ex: const { User, Note } = require('../models') [this targets an index file in the models folder { this folder :^) }]
module.exports = { User, Note }