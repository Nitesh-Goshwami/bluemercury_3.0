const mongoose = require('mongoose');

// Database credentials
const USERNAME = "bluemercury";
const PASSWORD = "bluemercury2";
const DATABASE = "bluemercurydb";

// Database connection url
const DEFAULT_CONNECTION_STRING = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.1bi7u.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

// Mongoose options for connection
const MONGOOSE_OPTIONS = {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true,
    useNewUrlParser:true
}

module.exports = () => {
    mongoose.connect(DEFAULT_CONNECTION_STRING, MONGOOSE_OPTIONS);
}