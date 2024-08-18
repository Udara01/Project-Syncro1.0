const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: String,
    role: String,
    avatar: String,
});

const teamSchema = new mongoose.Schema({
    name: String,
    description: String,
    members: [teamMemberSchema],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
