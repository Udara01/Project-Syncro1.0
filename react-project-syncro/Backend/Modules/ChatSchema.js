const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  chatType: { type: String, enum: ['one-on-one', 'group'], required: true },
});

module.exports = mongoose.model('Chat', chatSchema);
