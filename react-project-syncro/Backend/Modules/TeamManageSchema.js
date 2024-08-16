const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: String,
    details: String,
    // Add other member-specific fields
});

const TeamSchema = new mongoose.Schema({
    name: String,
    description: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
});

const Member = mongoose.model('Member', MemberSchema);
const Team = mongoose.model('Team', TeamSchema);

module.exports = { Team, Member };
