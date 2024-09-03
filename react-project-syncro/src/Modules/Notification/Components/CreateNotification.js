//just check one no need

import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import UserSearch from '../../SearchUsers/emailSearch';
import { UserContext } from '../../../contexts/UserContext';

const CreateNotification = () => {
  const { user } = useContext(UserContext);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userExists, setUserExists] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !message || !selectedUser) {
      setError('Please fill in all fields and select a user');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/api/notifications', {
        userId: selectedUser._id,  // Use the userId from the selected user
        type,
        message
      });
      setSuccess('Notification created successfully');
      setType('');
      setMessage('');
      setEmail('');
      setSelectedUser(null);
    } catch (error) {
      setError('Error creating notification');
      console.error(error);
    }
  };

  const handleUserFound = (user) => {
    if (user) {
      setSelectedUser(user);
      setUserExists(true);
    } else {
      setSelectedUser(null);
      setUserExists(false);
    }
  };

  return (
    <div className="container">
      <h2>Create Notification</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter notification type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="userSearch">
          <Form.Label>Search User by Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <UserSearch email={email} onUserFound={handleUserFound} />
          {!userExists && email && <Alert variant="danger" className="mt-2">User does not exist!</Alert>}
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-2">
          Create Notification
        </Button>
      </Form>
    </div>
  );
};

export default CreateNotification;


