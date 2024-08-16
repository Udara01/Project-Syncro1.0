const mongoose = require('mongoose');

const timeTrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  sessionStart: { type: Date },
  sessionEnd: { type: Date },
  timeSpent: { type: Number, default: 0 }, 
});

const TimeTracking = mongoose.model('TimeTracking', timeTrackingSchema);
module.exports = TimeTracking;


