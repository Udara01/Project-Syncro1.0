const mongoose = require('mongoose');

// Define a Mongoose schema for messages
const messageSchema = new mongoose.Schema({
  chatId: String,
  sender: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

// Create a Mongoose model based on the schema
const Message = mongoose.model('Message', messageSchema);

// Function to get messages by chat ID
const getMessagesByChatId = async (chatId) => {
  try {
    return await Message.find({ chatId });
  } catch (err) {
    throw new Error('Error fetching messages: ' + err.message);
  }
};

// Function to add a new message
const addMessage = async ({ chatId, sender, text }) => {
  const newMessage = new Message({ chatId, sender, text });
  try {
    await newMessage.save();
    return newMessage;
  } catch (err) {
    throw new Error('Error saving message: ' + err.message);
  }
};

// Export the functions to be used in server.js
module.exports = {
  getMessagesByChatId,
  addMessage,
};
