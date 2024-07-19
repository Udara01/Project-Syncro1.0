const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  service: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
//This is for the store zoom Access token 