const mongoose = require('mongoose');

const GithubDetailsSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project', // Assuming you have a Project model
  },
  
  githubToken: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  repo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('GithubDetails', GithubDetailsSchema);
