// TaskCreationForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskCreationForm = ({ teamMembers }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedMembers, setAssignedMembers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const task = {
        name: taskName,
        description: taskDescription,
        assignedMembers,
      };
      await axios.post('/api/tasks', task);
      alert('Task created successfully!');
      setTaskName('');
      setTaskDescription('');
      setAssignedMembers([]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required />
        </div>
        <div>
          <label>Assign Members:</label>
          <select multiple value={assignedMembers} onChange={(e) => setAssignedMembers([...e.target.selectedOptions].map(option => option.value))}>
            {teamMembers.map(member => (
              <option key={member._id} value={member._id}>{member.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskCreationForm;
