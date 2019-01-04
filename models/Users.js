const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName:  String,
  lastName: String,
  email: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now },
  verified: Boolean
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;