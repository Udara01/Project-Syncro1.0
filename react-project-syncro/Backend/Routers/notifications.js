// Backend/Routers/notifications.js

  const express = require('express');
  const router = express.Router();
  const Notification = require('../Modules/NotificationSchema');

// Utility function to calculate the time since creation
  const getTimeSince = (date) => {
    const now = new Date();
    const diff = Math.abs(now - date) / 1000;
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = Math.floor(diff % 60);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

// Create a new notification
  router.post('/', async (req, res) => {
    try {
      const { userId, type, message } = req.body;
      const notification = new Notification({ userId, type, message });
      await notification.save();
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// Get notifications for a specific user
  router.get('/:userId', async (req, res) => {
    try {
      const notifications = await Notification.find({ userId: req.params.userId });
      const formattedNotifications = notifications.map(notification => ({
        ...notification.toObject(),
        timeSince: getTimeSince(notification.createdAt)
      }));
      res.json(formattedNotifications);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

// Mark a notification as read
  router.patch('/:id', async (req, res) => {
    try {
      const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
      res.json(notification);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

// Delete a notification
  router.delete('/:id', async (req, res) => {
    try {
      await Notification.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;

