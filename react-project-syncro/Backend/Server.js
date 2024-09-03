const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser'); 
const authRoutes = require('./Routers/auth');
const projectCreate = require('./Routers/projectCreating');
const userProjectsRoutes = require('./Routers/userProjects');
const filesRoutes  = require('./Routers/files');
const meetingRoutes  = require('./Routers/meeting');
const projectRoutes = require('./Routers/projectMember');
const { getMessagesByChatId, addMessage } = require('./Routers/chat');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 4000; 

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/file', express.static(path.join(__dirname, 'public/file')));

// Routers
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectCreate);
app.use('/api/userProjects', userProjectsRoutes);
app.use('/api/file', filesRoutes);
app.use('/api/meeting', meetingRoutes);
app.use('/api', projectRoutes);

// Chat API Endpoints
app.get('/api/messages/:chatId', async (req, res) => {
  try {
    const messages = await getMessagesByChatId(req.params.chatId);
    res.json(messages);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/messages', async (req, res) => {
  const { chatId, sender, text } = req.body;
  try {
    const newMessage = await addMessage({ chatId, sender, text });
    res.json(newMessage);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Example route to get user by email
const User = require('./Modules/UserSchema');
app.get('/api/users', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email: email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Home route
app.get('/', function(req, res) {
  res.send(`<h1>Server is running on ${PORT}</h1>`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
