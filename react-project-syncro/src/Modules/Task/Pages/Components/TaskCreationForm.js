import React, { useState } from 'react';
import axios from 'axios';
import '../../../../styles/TaskCreation.css';  
import Team from '../../../../contexts/Team';

const TaskCreationForm = ({ projectId }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [dueDate, setDueDate] = useState('');

  const handleSelectMember = (memberEmail) => {
    setAssignedMembers((prevSelectedMembers) => {
      if (prevSelectedMembers.includes(memberEmail)) {
        return prevSelectedMembers.filter((email) => email !== memberEmail);
      } else {
        return [...prevSelectedMembers, memberEmail];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const task = {
        name: taskName,
        description: taskDescription,
        assignedMembers,
        dueDate,
        projectId,
      };
      await axios.post('http://localhost:4000/api/tasks', task);
      alert('Task created successfully!');
      setTaskName('');
      setTaskDescription('');
      setAssignedMembers([]);
      setDueDate('');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  return (
    <div className="task-form-container">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Assign Members:</label>
          <Team onSelectMember={handleSelectMember} />
          <div className="mt-2">
            {assignedMembers.map((member, index) => (
              <span key={index} className="badge bg-secondary me-2">
                {member}
                <button
                  type="button"
                  className="btn-close btn-close-white ms-2"
                  aria-label="Close"
                  onClick={() => handleSelectMember(member)}
                ></button>
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-submit">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskCreationForm;
