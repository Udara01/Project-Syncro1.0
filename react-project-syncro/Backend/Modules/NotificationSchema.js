//this is use to store about notifications

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const NotificationSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['task', 'milestone', 'meeting', 'chat', 'document', 'project', 'file'],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  const Notification = mongoose.model('Notification', NotificationSchema);

  module.exports = Notification;