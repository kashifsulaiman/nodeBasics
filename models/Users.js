const mongoose = require('mongoose');
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config/jwt.js');
const serverSecret = config.secret;
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  tokens: {
    type: Array,
    default: []
  }
});

UserSchema.methods.comparePassword = function (password) {
  const user = this;

  return bcryptjs.compareSync(password, user.password);
}

UserSchema.methods.generateToken = function () {
  const user = this;
  const { _id } = user;
  const token = jwt.sign({ _id }, serverSecret);

  user.tokens.push(token);
  return user.save().then(() => token)
}

UserSchema.statics.removeToken = function (token) {
  const User = this;
  decoded = jwt.verify(token, serverSecret);

  return User.findOneAndUpdate({ _id: decoded._id }, { $pull: { tokens: token } })
}

UserSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(user.password, salt);

    user.password = hash;
  }
  next();
})

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;