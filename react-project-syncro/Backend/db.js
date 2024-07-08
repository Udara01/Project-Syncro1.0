const mongoose = require('mongoose');
require('dotenv').config();

//Connect to the Mongodb database
const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('Server Connected to MongoDB Database');
  } catch (err) {
      console.error('Error connecting to MongoDB', err);
      process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;