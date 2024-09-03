//This is use to generate notifications
const Notification = require('../Modules/NotificationSchema'); // Adjust the path as necessary

const createNotification = async (userId, type, message) => {
  try {
    const notification = new Notification({ userId, type, message });
    await notification.save();
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

module.exports = { createNotification };
