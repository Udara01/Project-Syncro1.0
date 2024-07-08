//import library
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true
  },
  userPassword: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('RegisteredUser', userSchema);