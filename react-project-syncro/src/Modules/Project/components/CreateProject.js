/*
import React, { useState, useContext } from 'react';
import { Form, Button, Col, Row, Dropdown, DropdownButton, Alert } from 'react-bootstrap';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';

import axios from 'axios';
import UserSearch from '../../SearchUsers/userSearch'; // Import UserSearch component

import { UserContext } from "../../../contexts/UserContext"; // Import user context

const CreateProject = ({ onProjectCreated }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Product Owner');
  const [noOfTeamMembers, setNoOfTeamMembers] = useState('1 - 3');
  const [userExists, setUserExists] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const { user } = useContext(UserContext); // Adding user context

  const handleUserFound = (user) => {
    setUserExists(!!user);
  };

  const handleAddMember = () => {
    if (!userExists) {
      alert('User does not exist!');
      return;
    }
    const newMember = { email, role };
    setTeamMembers([...teamMembers, newMember]);
    setEmail('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('projectImage', image);
    formData.append('numberOfMembers', teamMembers.length);
    formData.append('teamMembers', JSON.stringify(teamMembers));
    formData.append('creatorEmail', user?.useremail);

    try {
      const response = await axios.post('http://localhost:4000/api/projects', formData);
      console.log('Project created successfully:', response.data);
      alert('Project created successfully');
      if (onProjectCreated) {
        onProjectCreated(response.data);
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className='project'>
    <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className="content">
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="projectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Add Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="noOfTeamMembers">
            <Form.Label>No Of Team Members</Form.Label>
            <Form.Control
              as="select"
              value={noOfTeamMembers}
              onChange={(e) => setNoOfTeamMembers(e.target.value)}
            >
              <option value="1 - 3">1 - 3</option>
              <option value="4 - 8">4 - 8</option>
              <option value="9 - 15">9 - 15</option>
              <option value="16 - 30">16 - 30</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="addTeamMembers">
            <Form.Label>Add Team Members</Form.Label>
            <Row>
              <Col md={8}>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={role}
                  onSelect={(role) => setRole(role)}
                >
                  <Dropdown.Item eventKey="Product Owner">Product Owner</Dropdown.Item>
                  <Dropdown.Item eventKey="Business Analyst">Business Analyst</Dropdown.Item>
                  <Dropdown.Item eventKey="Software Architect">Software Architect</Dropdown.Item>
                  <Dropdown.Item eventKey="Team Lead">Team Lead</Dropdown.Item>
                  <Dropdown.Item eventKey="Developers/Programmers">Developers/Programmers</Dropdown.Item>
                  <Dropdown.Item eventKey="UX/UI Designers">UX/UI Designers</Dropdown.Item>
                  <Dropdown.Item eventKey="Quality Assurance Testers">Quality Assurance Testers</Dropdown.Item>
                  <Dropdown.Item eventKey="Client">Client</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <UserSearch email={email} onUserFound={handleUserFound} />
            <Button variant="primary" onClick={handleAddMember} className="mt-2">
              Add Member
            </Button>
            {!userExists && email && <Alert variant="danger" className="mt-2">User does not exist!</Alert>}
          </Form.Group>

          <Form.Group controlId="teamMembers">
            <Form.Label>Members</Form.Label>
            <ul>
              {teamMembers.map((member, index) => (
                <li key={index}>
                  {member.email} - {member.role}
                </li>
              ))}
            </ul>
          </Form.Group>
        </Col>
      </Row>

      <Button variant="success" type="submit">
        Create
      </Button>
      <Button variant="secondary" className="ml-2">
        Cancel
      </Button>
    </Form>
    </div>
    </div>
    <Footer />
    </div>
  );
};

export default CreateProject;
*/


import React, { useState, useContext } from 'react';
import { Form, Button, Col, Row, Dropdown, DropdownButton, Alert, Card, ListGroup, Modal } from 'react-bootstrap';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import axios from 'axios';
import UserSearch from '../../SearchUsers/userSearch';
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';

const CreateProject = ({ onProjectCreated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Product Owner');
  const [noOfTeamMembers, setNoOfTeamMembers] = useState('1 - 3');
  const [userExists, setUserExists] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleUserFound = (user) => setUserExists(!!user);

  const handleAddMember = () => {
    if (!userExists) {
      alert('User does not exist!');
      return;
    }
    const newMember = { email, role };
    setTeamMembers([...teamMembers, newMember]);
    setEmail('');
    setRole('Product Owner');
  };

  const handleRemoveMember = (emailToRemove) => {
    setTeamMembers(teamMembers.filter(member => member.email !== emailToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('projectImage', image);
    formData.append('numberOfMembers', teamMembers.length);
    formData.append('teamMembers', JSON.stringify(teamMembers));
    formData.append('creatorEmail', user?.useremail);

    try {
      const response = await axios.post('http://localhost:4000/api/projects', formData);
      console.log('Project created successfully:', response.data);
      setShowSuccessModal(true);
      if (onProjectCreated) {
        onProjectCreated(response.data);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project');
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/projects');
  };

  return (
    <div className='project'>
      <Navbarmain toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className="content">
          <Form onSubmit={handleSubmit} className="p-4">
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="projectName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="endDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Add Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="noOfTeamMembers">
                  <Form.Label>No Of Team Members</Form.Label>
                  <Form.Control
                    as="select"
                    value={noOfTeamMembers}
                    onChange={(e) => setNoOfTeamMembers(e.target.value)}
                  >
                    <option value="1 - 3">1 - 3</option>
                    <option value="4 - 8">4 - 8</option>
                    <option value="9 - 15">9 - 15</option>
                    <option value="16 - 30">16 - 30</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="addTeamMembers">
                  <Form.Label>Add Team Members</Form.Label>
                  <Row className="align-items-center mb-3">
                    <Col md={8}>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                    <Col md={4}>
                      <DropdownButton
                        id="dropdown-role"
                        title={role}
                        onSelect={(selectedRole) => setRole(selectedRole)}
                      >
                        <Dropdown.Item eventKey="Product Owner">Product Owner</Dropdown.Item>
                        <Dropdown.Item eventKey="Business Analyst">Business Analyst</Dropdown.Item>
                        <Dropdown.Item eventKey="Software Architect">Software Architect</Dropdown.Item>
                        <Dropdown.Item eventKey="Team Lead">Team Lead</Dropdown.Item>
                        <Dropdown.Item eventKey="Developers/Programmers">Developers/Programmers</Dropdown.Item>
                        <Dropdown.Item eventKey="UX/UI Designers">UX/UI Designers</Dropdown.Item>
                        <Dropdown.Item eventKey="Quality Assurance Testers">Quality Assurance Testers</Dropdown.Item>
                        <Dropdown.Item eventKey="Client">Client</Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                  <UserSearch email={email} onUserFound={handleUserFound} />
                  <Button variant="primary" onClick={handleAddMember} className="mt-2">
                    Add Member
                  </Button>
                  {!userExists && email && <Alert variant="danger" className="mt-2">User does not exist!</Alert>}
                </Form.Group>

                <Form.Group controlId="teamMembers">
                  <Form.Label>Members</Form.Label>
                  <Card className="mt-3">
                    <Card.Body>
                      <ListGroup>
                        {teamMembers.map((member, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col>
                                <strong>{member.email}</strong> - {member.role}
                              </Col>
                              <Col md="auto">
                                <Button variant="danger" onClick={() => handleRemoveMember(member.email)}>Remove</Button>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="success" type="submit" className="mr-2">
              Create
            </Button>
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </Form>
        </div>
      </div>
      <Footer />

      <Modal show={showSuccessModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Project created successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateProject;

