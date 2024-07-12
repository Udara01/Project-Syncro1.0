// models/UserProjects.js
//when project create and members adding to it this table store the the user allocated all project objectID

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProjectsSchema = new Schema({
  email: { type: String, required: true, unique: true },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

module.exports = mongoose.model('UserProjects', UserProjectsSchema);
