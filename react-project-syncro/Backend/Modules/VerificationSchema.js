//for the email verification code

const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '10m' } // Code expires in 10 minutes
});

module.exports = mongoose.model('Verification', VerificationSchema);
