// UserStatus.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/UserStatus.css';

const UserStatus = ({ userId }) => {
  const [userStatus, setUserStatus] = useState({ isOnline: false, lastActive: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; // Exit if userId is undefined

    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/status/${userId}`);
        setUserStatus(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching user status:", error);
        setError("Could not fetch user status");
      }
    };

    fetchUserStatus();
    const interval = setInterval(fetchUserStatus, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="user-status">
      <span
        className={`status-dot ${userStatus.isOnline ? 'online' : 'offline'}`}
        title={userStatus.isOnline ? 'Online' : `Last active: ${userStatus.lastActive ? new Date(userStatus.lastActive).toLocaleString() : 'Unknown'}`}
      ></span>
      <span>{userStatus.isOnline ? 'Online' : 'Offline'}</span>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default UserStatus;
