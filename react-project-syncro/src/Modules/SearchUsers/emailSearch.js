// UserSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = ({ email, onUserFound }) => {
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (email) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/users/find-by-email?email=${email}`);
        onUserFound(response.data);
      } catch (error) {
        onUserFound(null);
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, [email]);

  return (
    <div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default UserSearch;
