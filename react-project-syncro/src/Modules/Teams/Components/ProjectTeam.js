import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MembersContext } from '../../../contexts/MembersContext';
import { Spinner, Alert, Card, ListGroup, Image, Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import UserStatus from '../../UserManagement/Components/UserStatus';

const placeholderImage = 'https://via.placeholder.com/100'; // Placeholder image URL

const ProjectTeam = () => {
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
    <div className="d-flex flex-wrap justify-content-start mt-3">
      {teamMembers.length === 0 ? (
        <p className="text-muted">No team members found.</p>
      ) : (
        teamMembers.map((teamMember, index) => {
          const matchedMember = members.find((member) => member.email === teamMember.email);
          const userId = matchedMember ? matchedMember._id : null;
          const username = matchedMember ? matchedMember.username : 'Unavailable';
          const fname = matchedMember ? matchedMember.firstName : 'Unavailable';
          const lname = matchedMember ? matchedMember.lastName : 'Unavailable';
          const imageurl = matchedMember ? matchedMember.profilePicture : placeholderImage;
          
          // Format last activity date if it exists
          const Activity = matchedMember && matchedMember.lastActive
            ? new Date(matchedMember.lastActive).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })
            : 'Unavailable';

          return (
            <Card key={index} className="m-2 shadow-sm" style={{ width: '18rem', borderRadius: '8px' }}>
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <Link to={userId ? `/profile/${userId}` : '#'} className="text-decoration-none text-primary">
                    <Image
                      src={`http://localhost:4000${imageurl}`}
                      onError={(e) => (e.target.src = placeholderImage)} // Fallback to placeholder if image fails to load
                      roundedCircle
                      width="100"
                      height="100"
                      alt="Profile"
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>
                </div>
                <Card.Title className="text-center mb-1">
                  <Link to={userId ? `/profile/${userId}` : '#'} className="text-decoration-none text-primary">
                    {username} <br/> {fname} {lname}
                  </Link>
                </Card.Title>
                <Card.Subtitle className="text-center text-muted mb-2">{teamMember.email}</Card.Subtitle>
                <Card.Text className="text-center text-muted">{teamMember.role}</Card.Text>
                <p className="text-center small text-muted">Last Activity: {Activity}</p>
                <p className="text-center small text-muted">Created: {teamMember.createdDate}</p>
                <div className="text-center">
                  <Link to={`/message/${userId}`} className="btn btn-outline-primary btn-sm mt-2">
                    Send Message
                  </Link>
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default ProjectTeam;

