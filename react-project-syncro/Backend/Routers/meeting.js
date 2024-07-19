/*
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const Meeting = require('../Modules/MeetingSchema'); // Add this line
const router = express.Router();

const clientId = 'n2IKbhxEQ_SG1YbsKVkOIQ';
const clientSecret = 'Nj1ylZhlJS63GuB3ZK6KVkJHHBc820OT';
const redirectUri = 'http://localhost:4000/oauth/callback';

let accessToken = ''; // In-memory store for demo purposes; use a database for production

// Redirect to Zoom OAuth authorization URL
router.get('/authorize', (req, res) => {
  const authorizationUrl = `https://zoom.us/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
  res.redirect(authorizationUrl);
});

// OAuth callback to exchange code for access token
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

    accessToken = tokenResponse.data.access_token;
    res.redirect('http://localhost:3000'); // Redirect back to the frontend
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to get the stored access token
router.get('/accessToken', (req, res) => {
  res.json({ accessToken });
});

// Create a Zoom meeting and save to MongoDB
router.post('/createMeeting', async (req, res) => {
  const { topic, start_time, duration, timezone, members,projectId } = req.body;

  const meetingConfig = {
    topic,
    type: 2, // Scheduled meeting
    start_time,
    duration,
    timezone,
    projectId
  };

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
    console.error('Error creating Zoom meeting:', error.response ? error.response.data : error.message);
    res.status(500).send(error.response ? error.response.data : error.message);
  }
});

// Fetch all meetings
router.get('/meetings', async (req, res) => {
  try {
      const meetings = await Meeting.find();
      res.json(meetings);
  } catch (err) {
      res.status(500).json({ error: 'Error fetching meetings' });
  }
});

module.exports = router;*/

const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const Meeting = require('../Modules/MeetingSchema');
const Token = require('../Modules/TokenSchema'); // Import your Token schema
const router = express.Router();

const clientId = 'n2IKbhxEQ_SG1YbsKVkOIQ';
const clientSecret = 'Nj1ylZhlJS63GuB3ZK6KVkJHHBc820OT';
const redirectUri = 'http://localhost:4000/oauth/callback';

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
    res.status(500).send(error.message);
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
    throw error;
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
    res.status(500).send(error.message);
  }
});

// Create a Zoom meeting and save to MongoDB
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
        accessToken = await refreshAccessToken();

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
});

// Fetch all meetings
router.get('/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching meetings' });
  }
});

module.exports = router;


