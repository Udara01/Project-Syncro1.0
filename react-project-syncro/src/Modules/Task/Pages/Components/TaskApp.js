// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCreationForm from './TaskCreationForm';
import TaskList from './TaskList';

function TaskApp() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [userId, setUserId] = useState(''); // Assume this is fetched based on the logged-in user

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('/api/teamMembers');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="App">
      <h1>Task Management</h1>
      <TaskCreationForm teamMembers={teamMembers} />
      <TaskList userId={userId} />
    </div>
  );
}

export default TaskApp;
