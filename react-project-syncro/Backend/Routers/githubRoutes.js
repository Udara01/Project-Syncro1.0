// routes/githubRoutes.js
/*const express = require('express');
const router = express.Router();

// Route to get repository details
router.get('/repo-details', async (req, res) => {
  try {
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN }); // Use environment variable for the token
    
    const { data } = await octokit.repos.get({
      owner: 'Syncro01',
      repo: 'project-management-system',
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get recent commits
router.get('/commits', async (req, res) => {
  try {
    const { Octokit } = await import('@octokit/rest'); // Import Octokit for each route
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    const { data } = await octokit.repos.listCommits({
      owner: 'Syncro01',
      repo: 'project-management-system',
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get open pull requests
router.get('/pull-requests', async (req, res) => {
  try {
    const { Octokit } = await import('@octokit/rest'); // Import Octokit for each route
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    const { data } = await octokit.pulls.list({
      owner: 'Syncro01',
      repo: 'project-management-system',
      state: 'open',
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;*/



// routes/githubRoutes.js
const express = require('express');
const router = express.Router();
const GithubDetails = require('../Modules/GithubDetailsSchema');

require('dotenv').config(); // Load environment variables

// Helper function to get GitHub details
async function getGithubDetails(projectId) {
  const details = await GithubDetails.findOne({ projectId });
  if (!details) throw new Error('GitHub details not found for this project');
  return details;
}

// Route to save GitHub details
router.post('/github/github-details/save', async (req, res) => {
  const { projectId, githubToken, owner, repo } = req.body;

  try {
    let githubDetails = await GithubDetails.findOne({ projectId });

    if (githubDetails) {
      // Update existing record
      githubDetails.githubToken = githubToken;
      githubDetails.owner = owner;
      githubDetails.repo = repo;
      await githubDetails.save();
    } else {
      // Create new record
      githubDetails = new GithubDetails({ projectId, githubToken, owner, repo });
      await githubDetails.save();
    }

    res.status(200).json({ message: 'GitHub details saved successfully' });
  } catch (error) {
    console.error('Error saving GitHub details:', error);
    res.status(500).json({ error: 'An error occurred while saving GitHub details.' });
  }
});


// Route to get repository details
router.get('/github/:projectId/repo-details', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { githubToken, owner, repo } = await getGithubDetails(projectId);
    
    const { Octokit } = await import('@octokit/rest'); // Dynamic import
    const octokit = new Octokit({ auth: githubToken });
    const { data } = await octokit.repos.get({ owner, repo });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Route to get recent commits
router.get('/github/:projectId/commits', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { githubToken, owner, repo } = await getGithubDetails(projectId);

    const { Octokit } = await import('@octokit/rest'); // Dynamic import
    const octokit = new Octokit({ auth: githubToken });
    const { data } = await octokit.repos.listCommits({ owner, repo });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get open pull requests
router.get('/github/:projectId/pull-requests', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { githubToken, owner, repo } = await getGithubDetails(projectId);

    const { Octokit } = await import('@octokit/rest'); // Dynamic import
    const octokit = new Octokit({ auth: githubToken });
    const { data } = await octokit.pulls.list({ owner, repo, state: 'open' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



















module.exports = router;
