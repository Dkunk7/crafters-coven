const jwt = require('jsonwebtoken');

const secret = "crafterscovencomingtoabrowsernearyou2021"; // probably store this in a .env later?
const expiration = '24h'; // is 24 hours too long?

module.exports = {
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: function({ req }) {
        // allows token to be sent through req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // separate "Bearer" from tokenvalue
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        // if there's no token, return the request object as is
        if (!token) {
            return req;
        }

        try {
            // decode and attach user data to the request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Your token is flippin invalid, dude.');
        }

        // return the updated request object
        return req;
    }
};