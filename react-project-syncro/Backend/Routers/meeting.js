const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const Meeting = require('../Modules/MeetingSchema');
const Token = require('../Modules/TokenSchema'); // Import your Token schema
const User = require('../Modules/UserSchema'); // Import your User schema
const Project = require('../Modules/projectSchema'); // Import your Project schema
const { createNotification } = require('../Utils/NotificationUtils'); // Import the notification service
const router = express.Router();

require('dotenv').config(); // Load environment variables

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

// Redirect to Zoom OAuth authorization URL
router.get('/authorize', (req, res) => {
  const authorizationUrl = `https://zoom.us/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
  res.redirect(authorizationUrl);
});

// OAuth callback to exchange code for tokens
router.get('/oauth/callback', async (req, res) => {
  const authorizationCode = req.query.code;

  try {
    const tokenResponse = await axios.post('https://zoom.us/oauth/token', querystring.stringify({
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: redirectUri
    }), {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, refresh_token } = tokenResponse.data;

    // Store tokens in the database
    await Token.findOneAndUpdate(
      { service: 'zoom' },
      { accessToken: access_token, refreshToken: refresh_token },
      { upsert: true, new: true }
    );

    res.redirect('http://localhost:3000'); // Redirect back to the frontend
  } catch (error) {
    console.error('Error exchanging authorization code:', error.message);
    res.status(500).send('Failed to authorize with Zoom');
  }
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const tokenData = await Token.findOne({ service: 'zoom' });

    if (!tokenData || !tokenData.refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await axios.post('https://zoom.us/oauth/token', querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: tokenData.refreshToken
    }), {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, refresh_token } = response.data;

    // Update tokens in the database
    await Token.findOneAndUpdate(
      { service: 'zoom' },
      { accessToken: access_token, refreshToken: refresh_token }
    );

    return access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error.message);
    throw new Error('Failed to refresh access token');
  }
};

// Endpoint to get the stored access token
router.get('/accessToken', async (req, res) => {
  try {
    const tokenData = await Token.findOne({ service: 'zoom' });

    if (!tokenData) {
      return res.status(404).json({ error: 'No token found' });
    }

    res.json({ accessToken: tokenData.accessToken });
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    res.status(500).send('Failed to retrieve access token');
  }
});

// Inside /createMeeting endpoint
router.post('/createMeeting', async (req, res) => {
  const { topic, start_time, duration, timezone, members, projectId } = req.body;

  const meetingConfig = {
    topic,
    type: 2, // Scheduled meeting
    start_time,
    duration,
    timezone,
  };

  try {
    let tokenData = await Token.findOne({ service: 'zoom' });

    if (!tokenData) {
      return res.status(401).json({ error: 'No token found' });
    }

    let accessToken = tokenData.accessToken;

    try {
      const response = await axios.post(
        'https://api.zoom.us/v2/users/me/meetings',
        meetingConfig,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      // Get the project name using the projectId
      const project = await Project.findById(projectId);
      const projectName = project ? project.projectName : 'Unknown Project'; // Fetch the projectName here

      // Save meeting details to MongoDB
      const newMeeting = new Meeting({
        topic,
        start_time,
        duration,
        timezone,
        join_url: response.data.join_url,
        members,
        projectId,
        projectName // Correctly assign the projectName here
      });

      await newMeeting.save();

      // Optimize fetching users for notifications
      const users = await User.find({ email: { $in: members } });
      for (const user of users) {
        const message = `A new meeting for project "${projectName}" has been scheduled: ${topic}`;
        await createNotification(user._id, 'meeting', message);
      }

      res.json(newMeeting);
    } catch (error) {
      if (error.response && error.response.data.code === 124) {
        // Access token expired, refresh it
        accessToken = await refreshAccessToken();

        // Retry creating the meeting with the new access token
        const response = await axios.post(
          'https://api.zoom.us/v2/users/me/meetings',
          meetingConfig,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        // Get the project name using the projectId
        const project = await Project.findById(projectId);
        const projectName = project ? project.projectName : 'Unknown Project';

        // Save meeting details to MongoDB
        const newMeeting = new Meeting({
          topic,
          start_time,
          duration,
          timezone,
          join_url: response.data.join_url,
          members,
          projectId,
          projectName // Correctly assign the projectName here
        });

        await newMeeting.save();

        // Optimize fetching users for notifications
        const users = await User.find({ email: { $in: members } });
        for (const user of users) {
          const message = `A new meeting for project "${projectName}" has been scheduled: ${topic}`;
          await createNotification(user._id, 'meeting', message);
        }

        res.json(newMeeting);
      } else {
        console.error('Error creating Zoom meeting:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to create Zoom meeting');
      }
    }
  } catch (error) {
    console.error('Error creating Zoom meeting:', error.message);
    res.status(500).send('Failed to create Zoom meeting');
  }
});




// Fetch all meetings with project names
router.get('/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find().populate('projectId', 'projectName');
    res.json(meetings);
  } catch (err) {
    console.error('Error fetching meetings:', err.message);
    res.status(500).json({ error: 'Error fetching meetings' });
  }
});

module.exports = router;

/*this part is create and start users own Zoom meetings using their accounts. 
// Function to refresh the user's access token
const refreshUserAccessToken = async (userId) => {
  const tokenData = await Token.findOne({ userId });

  if (!tokenData || !tokenData.refreshToken) {
    throw new Error('No refresh token found for user');
  }

  const response = await axios.post('https://zoom.us/oauth/token', querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: tokenData.refreshToken
  }), {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const { access_token, refresh_token, expires_in } = response.data;
  const expiresAt = new Date(Date.now() + expires_in * 1000);

  // Update tokens in the database
  await Token.findOneAndUpdate(
    { userId },
    { accessToken: access_token, refreshToken: refresh_token, expiresAt }
  );

  return access_token;
};

// Create a Zoom meeting and save to MongoDB
router.post('/createMeeting', async (req, res) => {
  const { topic, start_time, duration, timezone, members, projectId } = req.body;
  const userId = req.user._id; // Assuming user is authenticated and user ID is available

  const meetingConfig = {
    topic,
    type: 2, // Scheduled meeting
    start_time,
    duration,
    timezone,
  };

  try {
    let tokenData = await Token.findOne({ userId });

    if (!tokenData) {
      return res.status(401).json({ error: 'No token found for user' });
    }

    let accessToken = tokenData.accessToken;

    try {
      const response = await axios.post(
        'https://api.zoom.us/v2/users/me/meetings',
        meetingConfig,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      // Save meeting details to MongoDB
      const newMeeting = new Meeting({
        topic,
        start_time,
        duration,
        timezone,
        join_url: response.data.join_url,
        members,
        projectId
      });

      await newMeeting.save();

      res.json(newMeeting);
    } catch (error) {
      if (error.response && error.response.data.code === 124) {
        // Access token expired, refresh it
        accessToken = await refreshUserAccessToken(userId);

        // Retry creating the meeting with the new access token
        const response = await axios.post(
          'https://api.zoom.us/v2/users/me/meetings',
          meetingConfig,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        // Save meeting details to MongoDB
        const newMeeting = new Meeting({
          topic,
          start_time,
          duration,
          timezone,
          join_url: response.data.join_url,
          members,
          projectId
        });

        await newMeeting.save();

        res.json(newMeeting);
      } else {
        console.error('Error creating Zoom meeting:', error.response ? error.response.data : error.message);
        res.status(500).send(error.response ? error.response.data : error.message);
      }
    }
  } catch (error) {
    console.error('Error creating Zoom meeting:', error.message);
    res.status(500).send(error.message);
  }
});*/

