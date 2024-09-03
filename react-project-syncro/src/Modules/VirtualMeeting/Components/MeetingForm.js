import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../styles/TaskCreation.css';  // Import custom CSS

const TaskCreationForm = ({ projectId }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/team-members`);
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, [projectId]);

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
      await axios.post('http://localhost:4000/api/tasks', task);  // Send the task data to the backend
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

  const handleSelectMember = (memberId) => {
    setAssignedMembers((prevAssignedMembers) => {
      if (prevAssignedMembers.includes(memberId)) {
        return prevAssignedMembers.filter((id) => id !== memberId);
      } else {
        return [...prevAssignedMembers, memberId];
      }
    });
  };

  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <input
            type="text"
            className="form-control"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="team-members-list">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div
                  key={member._id}
                  className={`team-member-item ${assignedMembers.includes(member._id) ? 'selected' : ''}`}
                  onClick={() => handleSelectMember(member._id)}
                >
                  {member.name} ({member.email})
                </div>
              ))
            ) : (
              <div>No members found</div>
            )}
          </div>
          <div className="selected-members">
            {assignedMembers.map((memberId) => {
              const member = teamMembers.find((m) => m._id === memberId);
              return (
                <span key={memberId} className="badge bg-secondary me-2">
                  {member.name}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    aria-label="Close"
                    onClick={() => handleSelectMember(memberId)}
                  ></button>
                </span>
              );
            })}
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

