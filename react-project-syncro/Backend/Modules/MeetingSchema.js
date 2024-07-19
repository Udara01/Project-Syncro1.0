const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  topic: String,
  start_time: Date,
  duration: Number,
  timezone: String,
  join_url: String,
  members: [String],
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});

module.exports = mongoose.model('Meeting', meetingSchema);

//This is for the store meeting details when it is created
