const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  service: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
//This is for the store zoom Access token 

/*
//create and start their own Zoom meetings using their accounts.
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accessToken: String,
  refreshToken: String,
  expiresAt: Date,
});

module.exports = mongoose.model('Token', tokenSchema);*/
