import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/TeamManagement.css'; // Import your CSS styles
import { useParams } from 'react-router-dom';
import TeamMembers from '../../ProjectDashboard/Components/TeamMembers';

const TeamManagement = () => {
  const { projectId } = useParams();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get(`/api/team-management/${projectId}/teams`).then((response) => {
      setTeams(response.data);
    });
  }, [projectId]);

  return (
    <div className="team-management">
      <div className="team-header">
        <h2>Team Overview</h2>
      </div>
      <div className="team-list">
        {teams.map((team) => (
          <div key={team._id} className="team-card">
            <div className="team-details">
              <h3>{team.name}</h3>
              <p>{team.description}</p>
            </div>
            {/* Pass projectId as a prop */}
            <TeamMembers projectId={projectId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;
