import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Team = ({ onSelectMember }) => {
  const { projectId } = useParams();
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

  const handleSelectMember = (memberEmail) => {
    onSelectMember(memberEmail);
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Team Members</h5>
        </div>
        <div className="card-body">
          {members.length === 0 ? (
            <p className="text-muted">No team members found.</p>
          ) : (
            members.map((member, index) => (
              <div key={index} className="form-check mb-2">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id={`member-${index}`} 
                  onChange={() => handleSelectMember(member.email)}
                />
                <label className="form-check-label" htmlFor={`member-${index}`}>
                  <h6 className="mb-1">{member.email}</h6>
                  <small className="text-muted">{member.role}</small>
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;

/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Team = ({ onSelectMember }) => {
  const { projectId } = useParams();
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
        setMembers(response.data.teamMembers);
        onSelectMember(response.data.teamMembers); // Pass members to parent component
      } catch (err) {
        setError('Error fetching team members');
        console.error(err);
      }
    };

    fetchTeamMembers();
  }, [projectId, onSelectMember]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Team Members</h5>
        </div>
        <div className="card-body">
          {members.length === 0 ? (
            <p className="text-muted">No team members found.</p>
          ) : (
            members.map((member, index) => (
              <div key={index} className="form-check mb-2">
                <label className="form-check-label" htmlFor={`member-${index}`}>
                  <h6 className="mb-1">{member.email}</h6>
                  <small className="text-muted">{member.role}</small>
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
*/