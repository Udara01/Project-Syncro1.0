const express = require('express');
const router = express.Router();
const { Team, Member } = require('../models/team');

// Get all teams
router.get('/teams', async (req, res) => {
    const teams = await Team.find().populate('members');
    res.json(teams);
});

// Add a new team
router.post('/teams', async (req, res) => {
    const team = new Team(req.body);
    await team.save();
    res.json(team);
});

// Add a member to a team
router.post('/teams/:teamId/members', async (req, res) => {
    const member = new Member(req.body);
    await member.save();
    const team = await Team.findById(req.params.teamId);
    team.members.push(member);
    await team.save();
    res.json(team);
});

// Other routes for CRUD operations
