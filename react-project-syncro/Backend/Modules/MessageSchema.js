const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  chatType: { type: String, enum: ['one-on-one', 'group'], required: true },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // For tracking read status
});

module.exports = mongoose.model('Message', messageSchema);