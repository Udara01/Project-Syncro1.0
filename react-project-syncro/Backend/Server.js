/*const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser'); // Add this
const authRoutes = require('./Routers/auth');

const app = express();
const PORT = 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Routers

app.use('/api/auth', authRoutes);//For the authentication

const projectCreate = require('./Routers/projectCreating');
app.use('/createP', projectCreate);

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


// Include your routes here
const projectRouter = require('./Routers/projectCreating');
app.use('/api', projectRouter);

app.use('/api/projects', projectRouter);


////////////////////
const User = require('./Modules/UserSchema')
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', function(req, res) {
  res.send(`<h1>Server is running on ${PORT}</h1>`);
});

*/

const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser'); // Add this
const authRoutes = require('./Routers/auth');
const projectCreate = require('./Routers/projectCreating');
const userProjectsRoutes = require('./Routers/userProjects'); // get route for user projects

const app = express();
const PORT = 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));//path for store project image

// Routers
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectCreate); // Use the correct route for projects
app.use('/api/userProjects', userProjectsRoutes); // Use the correct route for user projects
app.use('/api/users', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', function(req, res) {
  res.send(`<h1>Server is running on ${PORT}</h1>`);
});


const User = require('./Modules/UserSchema')
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