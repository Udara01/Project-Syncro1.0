import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamMembers = ({ projectId }) => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
        setMembers(response.data.teamMembers);
      } catch (err) {
        setError('Error fetching team members');
        console.error(err);
      }
    };

    fetchTeamMembers();
  }, [projectId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Team Members</h5>
        {members.length === 0 ? (
          <p>No team members found.</p>
        ) : (
          members.map((member, index) => (
            <div key={index} className="team-member">
              <h6>{member.email}</h6>
              <p>{member.role}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeamMembers;
