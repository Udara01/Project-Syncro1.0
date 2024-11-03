//Search users by their email address
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
        <Alert variant="success" style={{ marginTop: '20px', backgroundColor: '#d4edda', borderColor:"#d4edda" }}>
          <h4 style={{ color: "Black", backgroundColor: '#d4edda'}}>User Details</h4>
          <p style={{ color: "Black", backgroundColor: '#d4edda'}}>Email: {user.email}</p>
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