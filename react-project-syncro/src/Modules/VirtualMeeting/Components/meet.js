// src/Modules/VirtualMeeting/Components/meet.js
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MeetingForm from './MeetingForm';
import { useParams } from 'react-router-dom';

const Meet = () => {
  const [meetings, setMeetings] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get('http://localhost:4000/accessToken');
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.error('Error fetching access token:', error);
        window.location.href = 'http://localhost:4000/authorize';
      }
    };

    fetchAccessToken();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/meetings');
      setMeetings(response.data || []); // Ensure response.data is an array
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleCreateMeeting = async (formData) => {
    if (!accessToken) return;

    try {
      const response = await axios.post('http://localhost:4000/api/createMeeting', { ...formData, projectId });
      setMeetings([...meetings, response.data]);
    } catch (error) {
      if (error.response && error.response.data.code === 124) {
        // Access token expired, refresh it
        try {
          const tokenResponse = await axios.get('http://localhost:4000/accessToken');
          setAccessToken(tokenResponse.data.accessToken);

          const retryResponse = await axios.post('http://localhost:4000/api/createMeeting', { ...formData, projectId });
          setMeetings([...meetings, retryResponse.data]);
        } catch (retryError) {
          console.error('Error creating meeting after token refresh:', retryError);
        }
      } else {
        console.error('Error creating meeting:', error);
      }
    }
  };

  return (
    <div className="container-vm mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Zoom Meeting Scheduler</h4>
        </div>
        <div className="card-body">
          <MeetingForm onSubmit={handleCreateMeeting} />
        </div>
      </div>
    </div>
  );
}

export default Meet;*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MeetingForm from './MeetingForm';
import { useParams } from 'react-router-dom';

const Meet = () => {
  const [meetings, setMeetings] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get('http://localhost:4000/accessToken');
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.error('Error fetching access token:', error);
        window.location.href = 'http://localhost:4000/authorize';
      }
    };

    fetchAccessToken();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/meetings');
      setMeetings(response.data || []); // Ensure response.data is an array
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleCreateMeeting = async (formData) => {
    if (!accessToken) return false;

    try {
      const response = await axios.post('http://localhost:4000/api/createMeeting', { ...formData, projectId });
      setMeetings([...meetings, response.data]);
      return true;
    } catch (error) {
      if (error.response && error.response.data.code === 124) {
        // Access token expired, refresh it
        try {
          const tokenResponse = await axios.get('http://localhost:4000/accessToken');
          setAccessToken(tokenResponse.data.accessToken);

          const retryResponse = await axios.post('http://localhost:4000/api/createMeeting', { ...formData, projectId });
          setMeetings([...meetings, retryResponse.data]);
          return true;
        } catch (retryError) {
          console.error('Error creating meeting after token refresh:', retryError);
          return false;
        }
      } else {
        console.error('Error creating meeting:', error);
        return false;
      }
    }
  };

  return (
    <div className="container-vm mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Zoom Meeting Scheduler</h4>
        </div>
        <div className="card-body">
          <MeetingForm onSubmit={handleCreateMeeting} projectId={projectId} />
        </div>
      </div>
    </div>
  );
}

export default Meet;









