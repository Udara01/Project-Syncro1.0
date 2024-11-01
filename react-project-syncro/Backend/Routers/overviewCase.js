const express = require('express');
const TestCase = require('../Modules/TestCaseSchema'); 
const Issue = require('../Modules/IssueSchema'); 
const router = express.Router();

// Endpoint to get overview counts for a specific project
router.get('/overview', async (req, res) => {
    const { projectId } = req.query;
    try {
        const totalTests = await TestCase.countDocuments({ projectId });
        const activeTests = await TestCase.countDocuments({
            projectId,
            status: { $in: ['In Progress', 'Pending'] },
        });
        const unresolvedIssues = await Issue.countDocuments({
            projectId,
            status: { $ne: 'Resolved' },
        });
        
        res.json({ totalTests, activeTests, unresolvedIssues });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
