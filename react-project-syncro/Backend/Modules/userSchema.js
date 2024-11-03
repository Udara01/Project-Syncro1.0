//Backend\Modules\UserSchema.js
//User details
/*const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
*/

// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' }, // URL or file path for profile picture
    role: {
      type: String,
      enum: [
        'Project Manager',
        'Product Owner',
        'Business Analyst',
        'Software Architect',
        'Team Lead',
        'Developers/Programmers',
        'UX/UI Designers',
        'Quality Assurance Testers',
        'User',
        'Client',
      ],
      default: 'User',
    },
    bio: { type: String, default: '' },
    isOnline: { type: Boolean, default: false },       // New field for online status
    lastActive: { type: Date, default: Date.now },     // New field for tracking last activity
  });
  

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
