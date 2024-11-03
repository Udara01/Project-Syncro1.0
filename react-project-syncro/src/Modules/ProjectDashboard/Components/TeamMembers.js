/*import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MembersContext } from '../../../contexts/MembersContext';
import { Spinner, Alert, Card, ListGroup } from 'react-bootstrap';
import UserStatus from '../../UserManagement/Components/UserStatus';

const TeamMembers = () => {
  const { projectId } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState('');
  const { members, loading } = useContext(MembersContext);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
        setTeamMembers(response.data.teamMembers);
      } catch (err) {
        setError('Error fetching team members');
        console.error(err);
      }
    };

    fetchTeamMembers();
  }, [projectId]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card className="mt-3 shadow">
      <Card.Body>
        <Card.Title className="text-primary">Team Members</Card.Title>
        {teamMembers.length === 0 ? (
          <p className="text-muted">No team members found.</p>
        ) : (
          <ListGroup variant="flush">
            {teamMembers.map((teamMember, index) => {
              const matchedMember = members.find((member) => member.email === teamMember.email);
              const userId = matchedMember ? matchedMember._id : null;
              const username = matchedMember ? matchedMember.username : 'Unavailable';

              return (
                <ListGroup.Item key={index} className="d-flex align-items-start py-3">
                  <div className="">
                    <p className="mb-1 font-weight-bold">
                      <Link to={userId ? `/profile/${userId}` : '#'} className="text-decoration-none text-primary">
                        {teamMember.email} - {username}
                      </Link>
                    </p>
                    {userId ? <UserStatus userId={userId} /> : <span className="text-muted">Status unavailable</span>}
                  </div>
                  <p className="text-secondary mb-0">{teamMember.role}</p>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default TeamMembers;*/

import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MembersContext } from '../../../contexts/MembersContext';
import { Spinner, Alert, Card, ListGroup } from 'react-bootstrap';
import UserStatus from '../../UserManagement/Components/UserStatus';
import { FaEnvelope } from 'react-icons/fa';
import '../../../styles/TeamMembers.css';
import { UserContext } from '../../../contexts/UserContext';

const TeamMembers = () => {
  const { projectId } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState('');
  const { members, loading } = useContext(MembersContext);
  const { user } = useContext(UserContext);

  const logusername = user.username;

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
        setTeamMembers(response.data.teamMembers);
      } catch (err) {
        setError('Error fetching team members');
        console.error(err);
      }
    };

    fetchTeamMembers();
  }, [projectId]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  // Filter only active members
  const activeTeamMembers = teamMembers.filter((teamMember) => {
    const matchedMember = members.find((member) => member.email === teamMember.email);
    return matchedMember && matchedMember.isOnline; // Assuming `isOnline` is the field for active status
  });

  // Handler for sending a message
  const handleSendMessage = (username) => {
    alert(`Send message to ${username}`);
  };

  return (
    <Card className="team-members-card mt-3 shadow">
      <Card.Body>
        <Card.Title className="team-members-header">Active Team Members</Card.Title>
        {activeTeamMembers.length === 0 ? (
          <p className="text-muted">No active team members found.</p>
        ) : (
          <ListGroup variant="flush">
            {activeTeamMembers.map((teamMember, index) => {
              const matchedMember = members.find((member) => member.email === teamMember.email);
              const userId = matchedMember ? matchedMember._id : null;
              const username = matchedMember ? matchedMember.username : 'Unavailable';

              // Only display if the username is not the current logged-in user's username
              return logusername !== username ? (
                <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between py-3">
                  <div>
                    <p className="mb-1 font-weight-bold">
                      <Link to={userId ? `/profile/${userId}` : '#'} className="text-decoration-none text-primary">
                        {username}
                      </Link>
                    </p>
                    <p className="text-secondary mb-0">{teamMember.role}</p>
                    {userId ? <UserStatus userId={userId} /> : <span className="text-muted">Status unavailable</span>}
                  </div>
                  <FaEnvelope
                    role="button"
                    className="text-primary"
                    onClick={() => handleSendMessage(username)}
                    title={`Send message to ${username}`}
                  />
                </ListGroup.Item>
              ) : null;
            })}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default TeamMembers;
