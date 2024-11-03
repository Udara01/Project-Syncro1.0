/*import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Image, Form } from 'react-bootstrap';
import { UserContext } from "../../../contexts/UserContext";

const UpdateUserForm = () => {
  const { user, setUser } = useContext(UserContext);

  const userId = user.userId;

  const [userData, setUserData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.useremail || '',
    role: 'User',
    bio: user?.bio || '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [roles] = useState([
    'Project Manager', 'Product Owner', 'Business Analyst', 'Software Architect',
    'Team Lead', 'Developers/Programmers', 'UX/UI Designers', 'Quality Assurance Testers', 'User',
  ]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };   

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('role', userData.role);
    formData.append('bio', userData.bio);
    if (profilePicture instanceof File) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/users/profile/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(response.data);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <h2 className="mb-3">Update User Profile</h2>

      <div className="mb-3 text-center">
  <Image
    src={
      profilePicture
        ? URL.createObjectURL(profilePicture)
        : (user.profilePicture ? `http://localhost:4000${user.profilePicture}` : 'https://via.placeholder.com/150')
    }
    roundedCircle
    alt="Profile"
    width="150"
    height="150"
  />
  <Form.Group controlId="formProfilePicture" className="mt-3">
    <Form.Label>Change Profile Picture</Form.Label>
    <Form.Control type="file" onChange={handlePictureChange} />
  </Form.Group>
</div>


      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="role" className="form-label">Role</label>
        <select
          className="form-select"
          id="role"
          name="role"
          value={userData.role}
          onChange={handleChange}
        >
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="bio" className="form-label">Bio</label>
        <textarea
          className="form-control"
          id="bio"
          name="bio"
          rows="3"
          value={userData.bio}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Update Profile</button>
    </form>
  );
};

export default UpdateUserForm;*/

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Image, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { UserContext } from "../../../contexts/UserContext";

const UpdateUserForm = () => {
  const { user, setUser } = useContext(UserContext);

  const userId = user.userId;

  const [userData, setUserData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.useremail || '',
    role: 'User',
    bio: user?.bio || '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [roles] = useState([
    'Project Manager', 'Product Owner', 'Business Analyst', 'Software Architect',
    'Team Lead', 'Developers/Programmers', 'UX/UI Designers', 'Quality Assurance Testers', 'User', 'Client',
  ]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };   

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('role', userData.role);
    formData.append('bio', userData.bio);
    if (profilePicture instanceof File) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/users/profile/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(response.data);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user.');
    }
  };

  return (
    <Container className="my-5">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
        <h2 className="mb-4 text-center text-primary">Update User Profile</h2>
        
        <Row className="mb-4 justify-content-center">
          <Col xs="auto" className="text-center">
            <Image
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : (user.profilePicture ? `http://localhost:4000${user.profilePicture}` : 'https://via.placeholder.com/150')
              }
              roundedCircle
              alt="Profile"
              width="150"
              height="150"
              className="mb-3"
            />
            <Form.Group controlId="formProfilePicture">
              <Form.Label className="btn btn-outline-primary btn-sm px-3">
                Change Profile Picture
                <Form.Control type="file" hidden onChange={handlePictureChange} />
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="role" className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={userData.role} onChange={handleChange}>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="bio" className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            placeholder="Write a short bio"
          />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" className="px-4 py-2" variant="primary">
            Update Profile
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default UpdateUserForm;

