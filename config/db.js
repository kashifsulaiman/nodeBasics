const mongoose = require("mongoose");

// connection URI
const mongoURI = "mongodb://kashif:kashif36@ds117909.mlab.com:17909/expertizodatabase";

// remove deprecation warning of collection.ensureIndex
mongoose.set('useCreateIndex', true);

// connect to mongodb
mongoose.connect(mongoURI, {useNewUrlParser: true})

module.exports = mongoose;