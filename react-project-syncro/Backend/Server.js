/*const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser'); // Add this
const authRoutes = require('./Routers/auth');
const projectCreate = require('./Routers/projectCreating');
const userProjectsRoutes = require('./Routers/userProjects'); // get route for user projects
const filesRoutes  = require('./Routers/files') // get route for user project file upload
const meetingRoutes  = require('./Routers/meeting')//get root for the virtual meeting
const projectRoutes = require('./Routers/projectMember')//root for the get a project team members
const notificationRoutes = require('./Routers/notifications');//root for the notification
const useremail = require('./Routers/user')

 
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));//path for store project image
app.use('/file', express.static(path.join(__dirname, 'public/file')));//path for store project image


// Routers
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectCreate); //route for projects
app.use('/api/userProjects', userProjectsRoutes); // route for user projects
app.use('/api/users', authRoutes);
app.use('/api/file', filesRoutes );//Route for the File

app.use('/api', meetingRoutes);
app.use('/', meetingRoutes);

app.use('/api', projectRoutes);

app.use('/api/notifications', notificationRoutes);///Route for the notifications

app.use('/api/users', useremail);


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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
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
const filesRoutes  = require('./Routers/files') // get route for user project file upload
const meetingRoutes  = require('./Routers/meeting')//get root for the virtual meeting
const projectRoutes = require('./Routers/projectMember')//root for the get a project team members
const notificationRoutes = require('./Routers/notifications');//root for the notification
const useremail = require('./Routers/user')

 
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));//path for store project image
app.use('/file', express.static(path.join(__dirname, 'public/file')));//path for store project image


// Routers
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectCreate); //route for projects
app.use('/api/userProjects', userProjectsRoutes); // route for user projects
app.use('/api/users', authRoutes);
app.use('/api/file', filesRoutes );//Route for the File

app.use('/api', meetingRoutes);
app.use('/', meetingRoutes);

app.use('/api', projectRoutes);

app.use('/api/notifications', notificationRoutes);///Route for the notifications

app.use('/api/users', useremail);


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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


