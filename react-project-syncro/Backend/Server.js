const express = require('express')
const connectDB = require('./db');
const cors = require('cors');

const app = express();

const PORT = 4000;

// Connect to MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());

//Routers
const userRegister = require('../Backend/Routers/userRegistration')
app.use('/register', userRegister)

const userLog = require('../Backend/Routers/userLogin')
app.use('/login', userLog)
















// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/', function(req, res) {
  res.send(`<h1>Server is running on ${PORT}</h1>`);
});