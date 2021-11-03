const { User, Note } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth'); // this doesn't exist yet

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id})
                    .select('-__v -password') // don't show __v or password
                    .populate('notes'); // notes in the user model

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        // get notes (search by user if username param exists)
        notes: async (parent, { username }) => { // This is supposed to match the name of the query in typeDefs; parent, even if empty, is required to use the second argument, args (which is destructured to username here)
            const params = username ? { username } : {}; // if username exists, set params to object named username, otherwise return empty object (ternary operator = ?)
            return Note.find(params).sort({ createdAt: -1 }); // This sort() orders the returned data by createdAt in descending order (-1); This runs regardless of whether params has a value or not
        },
        // get single note by id
        note: async (parent, { _id }) => {
            return Note.findOne({ _id }); // find one note by _id
        },
        // get all users
        users: async () => {
            return User.find() // find all users, don't display __v or password, populate notes section
                .select('-__v -password')
                .populate('notes');
        },
        // get user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('notes');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user); // this doesn't exist yet

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPass = await user.isCorrectPassowrd(password); // this is defined in the User model

            if (!correctPass) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addNote: async (parent, args, context) => { // check all this junk later
            if (context.user) {
                const note = await Note.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { notes: note._id } },
                    { new: true }
                );

                return note;
            }

            throw new AuthenticationError('You need to be logged in to post a note!');
        },
        addComment: async (parent, { noteId, commentContent }, context) => {
            if (context.user) {
                const updatedNote = await Note.findOneAndUpdate(
                    { _id: noteId },
                    { $push: { comments: { commentContent, username: context.user.username } } }, // make sure this works right
                    { new: true, runValidators: true }
                );

                return updatedNote;
            }

            throw new AuthenticationError('You need to be logged in to post a comment!');
        },
    }
};

module.exports = resolvers;