const { User, Note } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const signToken = require('../utils/auth'); // this doesn't exist yet