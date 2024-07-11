import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
import _ from 'lodash';

const UserSearch = ({ email, onUserFound }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const debouncedSearch = _.debounce(async (email) => {
    if (email) {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/users`, {
          params: { email }
        });
        setUser(response.data);
        setError('');
        onUserFound(response.data); // Invoke the callback with the user data
      } catch (err) {
        setUser(null);
        setError('User not found');
        onUserFound(null); // Invoke the callback with null
      } finally {
        setLoading(false);
      }
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(email);
    return () => {
      debouncedSearch.cancel();
    };
  }, [email]);

  return (
    <div style={{ marginTop: '20px' }}>
      {loading && <Spinner animation="border" />}
      {user && (
        <Alert variant="success" style={{ marginTop: '20px' }}>
          <h4>User Details</h4>
          <p>Email: {user.email}</p>
          {/* Display other user information as needed */}
        </Alert>
      )}
      {error && (
        <Alert variant="danger" style={{ marginTop: '20px' }}>
          {error}
        </Alert>
      )}
    </div>
  );
};

export default UserSearch;



/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Alert, Container, Spinner } from 'react-bootstrap';
import _ from 'lodash';


const UserSearch = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const debouncedSearch = _.debounce(async (email) => {
    if (email) {
      try {
        setLoading(true);
        const response = await axios.get(http://localhost:4000/api/users, {
          params: { email }
        });
        setUser(response.data);
        setError('');
      } catch (err) {
        setUser(null);
        setError('User not found');
      } finally {
        setLoading(false);
      }
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(email);
    return () => {
      debouncedSearch.cancel();
    };
  }, [email]);

  return (
    <Container style={{ marginTop: '50px' }}>
      <Form.Group controlId="email">
        <Form.Label>Search Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </Form.Group>
      {loading && <Spinner animation="border" />}
      {user && (
        <Alert variant="success" style={{ marginTop: '20px' }}>
          <h4>User Details</h4>
          <p>Email: {user.userEmail}</p>
        </Alert>
      )}
      {error && (
        <Alert variant="danger" style={{ marginTop: '20px' }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};



export default UserSearch;*/