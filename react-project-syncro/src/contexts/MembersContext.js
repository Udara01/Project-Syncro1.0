// MembersContext.js
/*import React, { createContext, useState, useEffect } from 'react';

export const MembersContext = createContext();

export const MembersProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/members'); // Ensure this matches your backend endpoint
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <MembersContext.Provider value={{ members, loading }}>
      {children}
    </MembersContext.Provider>
  );
};*/

// MembersContext.js
import React, { createContext, useState, useEffect } from 'react';

export const MembersContext = createContext();

export const MembersProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/members');
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);



  return (
    <MembersContext.Provider value={{ members, loading, }}>
      {children}
    </MembersContext.Provider>
  );
};
