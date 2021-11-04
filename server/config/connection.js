const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/crafters-coven', {
    useNewUrlParser: true,  // I don't know what any of these four things mean
    useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
});

module.exports = mongoose.connection;