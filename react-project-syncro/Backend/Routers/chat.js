const express = require('express');
const Chat = require('../Modules/ChatSchema');
const Message = require('../Modules/MessageSchema');
const router = express.Router();

// Send a new message
// POST /api/chat/send-message
router.post('/chat/send-message', async (req, res) => {
  const { senderId, receiverId, projectId, content, chatType } = req.body;
  try {
    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      projectId,
      content,
      chatType,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});


// Retrieve messages for a specific project and chat type
router.get('/chat/history/:projectId/:chatType', async (req, res) => {
  const { projectId, chatType } = req.params;
  const { lastFetchedTime } = req.query;
  
  const query = { projectId, chatType };
  if (lastFetchedTime) {
    query.timestamp = { $gt: new Date(lastFetchedTime) }; // Fetch only new messages
  }

  try {
    const messages = await Message.find(query).sort({ timestamp: 1 }).populate('sender');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});


// Retrieve messages for a specific project, chat type, sender, and receiver
/*router.get('/chat/history/:projectId/:chat', async (req, res) => {
  const { projectId } = req.params;
  const { lastFetchedTime, senderId, receiverId } = req.query;

  const query = {
    projectId,
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  };

  if (lastFetchedTime) {
    query.timestamp = { $gt: new Date(lastFetchedTime) }; // Fetch only new messages
  }

  try {
    const messages = await Message.find(query)
      .sort({ timestamp: 1 })
      .populate('sender');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});
*/

module.exports = router;