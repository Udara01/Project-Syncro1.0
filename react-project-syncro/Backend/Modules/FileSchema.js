//this is use to store about uploaded files data

const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  name: String,
  description: String,
  filePath: String,
  projectId: String,
});

module.exports = mongoose.model('File', FileSchema);
