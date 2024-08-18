const express = require('express');
const router = express.Router();
const Team = require('../Modules/Team');

// Get all teams
router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new team
router.post('/teams', async (req, res) => {
    const team = new Team({
        name: req.body.name,
        description: req.body.description,
        members: req.body.members,
    });
    
    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
