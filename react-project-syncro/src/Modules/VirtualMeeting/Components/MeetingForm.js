import React, { useState } from 'react';
import Team from '../../../contexts/Team';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/VirtualMeeting.css'

const MeetingForm = ({ onSubmit, projectId }) => {

  const [formData, setFormData] = useState({
    topic: '',
    start_time: '',
    duration: '',
    timezone: '',
  });

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectMember = (memberEmail) => {
    setSelectedMembers((prevSelectedMembers) => {
      if (prevSelectedMembers.includes(memberEmail)) {
        return prevSelectedMembers.filter((email) => email !== memberEmail);
      } else {
        return [...prevSelectedMembers, memberEmail];
      }
    });
  };
/*
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, members: selectedMembers, projectId });
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit({ ...formData, members: selectedMembers, projectId });
    if (success) {
      setFormData({ topic: '', start_time: '', duration: '', timezone: '' });
      setSelectedMembers([]);
      setSuccessMessage('Meeting created successfully!');
      setTimeout(() => setSuccessMessage(''), 5000); // Hide message after 5 seconds
    }
  };


  return (
    
    <form onSubmit={handleSubmit} className="p-3">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="mb-3">
        <label htmlFor="topic" className="form-label">Topic</label>
        <input
          type="text"
          className="form-control"
          id="topic"
          name="topic"
          placeholder="Enter meeting topic"
          value={formData.topic}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="start_time" className="form-label">Start Time</label>
        <input
          type="datetime-local"
          className="form-control"
          id="start_time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="duration" className="form-label">Duration (minutes)</label>
        <input
          type="number"
          className="form-control"
          id="duration"
          name="duration"
          placeholder="Enter duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="timezone" className="form-label">Timezone</label>
        <input
          type="text"
          className="form-control"
          id="timezone"
          name="timezone"
          placeholder="Enter timezone"
          value={formData.timezone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Team Members:</label>
        <Team onSelectMember={handleSelectMember} projectId={projectId} />
        <div className="mt-2">
          {selectedMembers.map((member, index) => (
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
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary me-2">
          Schedule Meeting
        </button>
        <button type="button" className="btn btn-danger">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MeetingForm;
