const express = require('express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
    // creates new apollo server and passes in schema data
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware
        // context is automatically passed to all resolvers - use it where you need authorization
        // context is also updated with every new request
    });

    // starts the apollo server
    await server.start();

    // integrate apollo server with the express application as middleware
    server.applyMiddleware({ app });

    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// THIS STOPS GRAPHQL FROM WORKING, BUT IT'S NEEDED FOR PRODUCTION
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening for creepers on port ${PORT}..`);
    });
});