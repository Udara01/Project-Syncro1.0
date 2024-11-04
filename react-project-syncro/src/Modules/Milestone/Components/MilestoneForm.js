/*import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MilestoneForm() {
  const { projectId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [assignedTeam, setAssignedTeam] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
        setUsers(response.data.teamMembers);
      } catch (err) {
        setError('Error fetching team members');
        console.error(err);
      }
    };

    if (projectId) {
      fetchTeamMembers();
    }
  }, [projectId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      projectId,
      description,
      startDate,
      duration: 0, // Fixed duration for milestone creation
      assignedTeam: assignedTeam.split(',').map((name) => name.trim()),
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/api/projects/${projectId}/milestones/create`,
        payload
      );
      setMessage(response.data.message);

      // Reset form fields
      setTitle('');
      setDescription('');
      setStartDate('');
      setAssignedTeam('');
    } catch (error) {
      console.error('Error creating milestone:', error);
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {message && <Alert variant="info">{message}</Alert>}
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="assignedTeam">
        <Form.Label>Assigned Team (comma-separated)</Form.Label>
        <Form.Control
          type="text"
          value={assignedTeam}
          onChange={(e) => setAssignedTeam(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Milestone
      </Button>
    </Form>
  );
}

export default MilestoneForm;
*/


import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MilestoneForm() {
  const { projectId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignedTeam, setAssignedTeam] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
        setUsers(response.data.teamMembers);
      } catch (err) {
        setError('Error fetching team members');
        console.error(err);
      }
    };

    if (projectId) {
      fetchTeamMembers();
    }
  }, [projectId]);

  const handleCheckboxChange = (email) => {
    setAssignedTeam((prev) =>
      prev.includes(email) ? prev.filter((item) => item !== email) : [...prev, email]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      projectId,
      description,
      startDate,
      endDate,
      assignedTeam,
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/api/projects/${projectId}/milestones/create`,
        payload
      );
      setMessage(response.data.message);

      // Reset form fields
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setAssignedTeam([]);
    } catch (error) {
      console.error('Error creating milestone:', error);
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {message && <Alert variant="info">{message}</Alert>}
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="assignedTeam">
        <Form.Label>Assigned Team</Form.Label>
        <div>
          {users.map((user) => (
            <Form.Check
              key={user._id}
              type="checkbox"
              label={`${user.role} (${user.email})`}
              value={user.email}
              checked={assignedTeam.includes(user.email)}
              onChange={() => handleCheckboxChange(user.email)}
            />
          ))}
        </div>
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Milestone
      </Button>
    </Form>
  );
}

export default MilestoneForm;
