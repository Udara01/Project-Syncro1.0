/*import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MeetingDetails = ({ meeting }) => {
  return (
    <div className="card mt-3">
      <div className="card-header bg-primary text-white">
        <h5>Meeting Details</h5>
      </div>
      <div className="card-body">
        <h6 className="card-title">Topic: {meeting.topic}</h6>
        <p className="card-text"><strong>Start Time:</strong> {new Date(meeting.start_time).toLocaleString()}</p>
        <p className="card-text"><strong>Duration:</strong> {meeting.duration} minutes</p>
        <p className="card-text"><strong>Timezone:</strong> {meeting.timezone}</p>
        <p className="card-text"><strong>Members:</strong> {meeting.members.join(', ')}</p>
        <a href={meeting.join_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Join Meeting
        </a>
      </div>
    </div>
  );
};

export default MeetingDetails;*/


/*
// src/components/MeetingDetails.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';

const MeetingDetails = () => {
  const { user } = useContext(UserContext);
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('MeetingDetails component rendered');
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/meetings');
        const allMeetings = response.data;

        // Filter meetings where the logged-in user's email is included in the members array
        const userMeetings = allMeetings.filter(meeting =>
          meeting.members && meeting.members.includes(user?.useremail)
        );

        setMeetings(userMeetings);
      } catch (err) {
        setError('Error fetching meetings');
        console.error(err);
      }
    };

    if (user) {
      fetchMeetings();
    }
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">My Meetings</h5>
        {meetings.length === 0 ? (
          <p>No meetings found.</p>
        ) : (
          meetings.map((meeting, index) => (
            <div key={index} className="meeting">
              <h6>{meeting.topic}</h6>
              <p>Start Time: {new Date(meeting.start_time).toLocaleString()}</p>
              <p>Duration: {meeting.duration} minutes</p>
              <p>Timezone: {meeting.timezone}</p>
              <p>Join URL: <a href={meeting.join_url} target="_blank" rel="noopener noreferrer">{meeting.join_url}</a></p>
              <p>Participants: {meeting.members.join(', ')}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MeetingDetails;*/


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/MeetingDetails.css'; // Assuming you have a custom CSS file for additional styling

const MeetingDetails = () => {
  const { user } = useContext(UserContext);
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/meetings');
        const allMeetings = response.data;

        // Filter meetings where the logged-in user's email is included in the members array
        const userMeetings = allMeetings.filter(meeting =>
          meeting.members && meeting.members.includes(user?.useremail)
        );

        setMeetings(userMeetings);
      } catch (err) {
        setError('Error fetching meetings');
        console.error(err);
      }
    };

    if (user) {
      fetchMeetings();
    }
  }, [user]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-vm mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">My Meetings</h5>
        </div>
        <div className="card-body">
          {meetings.length === 0 ? (
            <p className="text-muted">No meetings found.</p>
          ) : (
            meetings.map((meeting, index) => (
              <div key={index} className="meeting-details mb-3 p-3 border rounded">
                <h6 className="card-title mb-2">{meeting.topic}</h6>
                <p className="card-text mb-1">
                  <strong>Start Time:</strong> {new Date(meeting.start_time).toLocaleString()}
                </p>
                <p className="card-text mb-1">
                  <strong>Duration:</strong> {meeting.duration} minutes
                </p>
                <p className="card-text mb-1">
                  <strong>Timezone:</strong> {meeting.timezone}
                </p>
                <button 
                  className="btn btn-primary mb-2"
                  onClick={() => window.open(meeting.join_url, '_blank', 'noopener,noreferrer')}
                >
                  Join Meeting
                </button>
                <p className="card-text mb-1">
                  <strong>Participants:</strong> {meeting.members.join(', ')}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;




