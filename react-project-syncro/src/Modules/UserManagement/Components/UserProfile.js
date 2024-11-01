import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/users/profile/${userId}`);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column align-items-center py-5">
        <Row className="justify-content-center mb-4">
          <Col md="auto" className="text-center">
            {user.profilePicture ? (
              <Image
                src={`http://localhost:4000${user.profilePicture}`}
                roundedCircle
                width="120"
                height="120"
                alt="Profile"
                className="mb-3 border border-2"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-3"
                style={{ width: '120px', height: '120px', fontSize: '2rem', color: 'white' }}
              >
                {user.username?.charAt(0)}
              </div>
            )}
            <h3 className="mt-2 text-primary">{user.username}</h3>
            <p className="text-muted">{user.role}</p>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <h4 className="text-primary border-bottom pb-2 mb-4">Profile Information</h4>
            <p className="mb-2">
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Bio:</strong> {user.bio || 'No bio available.'}
            </p>
          </Col>
        </Row>
    </Container>
  );
};

export default UserProfile;



