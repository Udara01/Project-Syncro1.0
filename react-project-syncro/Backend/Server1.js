const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser'); // Add this
const authenticateToken = require('../Backend/Routers/authMiddleware');


const app = express();
const PORT = 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Routers
const projectCreate = require('./Routers/projectCreating');
app.use('/createP', projectCreate);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



// Include your routes here
const projectRouter = require('./Routers/projectCreating');
app.use('/api', projectRouter);

app.use('/api/projects', projectRouter);

app.use('/createP', authenticateToken, projectCreate);




////////////////////
const User = require('./Modules/userSchema')
app.get('/api/users', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ userEmail: email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/', function(req, res) {
  res.send(`<h1>Server is running on ${PORT}</h1>`);
});