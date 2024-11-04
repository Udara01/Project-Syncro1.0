/*import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Col, Row, Card, ListGroup, Modal, Alert, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate, useParams } from 'react-router-dom';
import UserSearch from '../../SearchUsers/userSearch';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import { Container } from 'react-bootstrap';


const UpdateProject = () => {
  const [project, setProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Business Analyst');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const { user } = useContext(UserContext);
  const { projectId } = useParams(); 
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleUserFound = (user) => setUserExists(!!user);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/projects/${projectId}`)
      .then((response) => {
        const projectData = response.data;
        setProject(projectData);
        setProjectName(projectData.projectName);
        setStartDate(projectData.startDate);
        setEndDate(projectData.endDate);
        setTeamMembers(projectData.teamMembers);
      })
      .catch((error) => console.error('Error fetching project data:', error));
  }, [projectId]);

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleAddMember = () => {
    if (!email) {
      alert('Enter an email to add.');
      return;
    }
    if (!userExists) {
      alert('User does not exist!');
      return;
    }
    const newMember = { email, role };
    setTeamMembers([...teamMembers, newMember]);
    setEmail('');
    setRole('Business Analyst');
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
    if (image) {
      formData.append('projectImage', image);
    }
    formData.append('teamMembers', JSON.stringify(teamMembers));

    try {
      const response = await axios.put(`http://localhost:4000/api/projects/${projectId}`, formData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating project');
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/projects');
  };

  return project ? (
    <div className='list'>
  <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
  <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
    <Sidebar isSidebarOpen={isSidebarOpen} />
    
    <Container style={{ maxWidth: '1200px' }}>
      <Card className="p-4 shadow-sm mt-5">
        <h2 className="mb-4">Update Project</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Card className="mb-4 p-3">
                <h5 className="mb-3">Project Information</h5>

                <Form.Group controlId="projectName" className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                  />
                </Form.Group>
                <Form.Group controlId="startDate" className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="endDate" className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="image" className="mb-3">
                  <Form.Label>Project Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-4 p-3">
                <h5 className="mb-3">Team Members</h5>
                <ListGroup className="mb-3">
                  {teamMembers.map((member, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      <span>{member.email} ({member.role})</span>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveMember(member.email)}
                        className="ml-2"
                      >
                        Remove
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <Form.Group controlId="addTeamMembers" className="mb-3">
                  <Form.Label>Add Team Member</Form.Label>
                  <Row className="align-items-center">
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
                        <Dropdown.Item eventKey="Business Analyst">Business Analyst</Dropdown.Item>
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
                  {!userExists && email && <Alert variant="danger" className="mt-3">User does not exist!</Alert>}
                  <Button variant="primary" onClick={handleAddMember} className="mt-3">Add Member</Button>
                </Form.Group>
              </Card>
            </Col>
          </Row>

          <Button variant="success" type="submit">Update Project</Button>
        </Form>
      </Card>

      <Modal show={showSuccessModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Project updated successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>OK</Button>
        </Modal.Footer>
      </Modal>

      </Container>
      </div>
    <Footer />
    </div>
  ) : (
    <div className="text-center mt-5">Loading...</div>
  );
};

export default UpdateProject; */


import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Col, Row, Card, ListGroup, Modal, Alert, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate, useParams } from 'react-router-dom';
import UserSearch from '../../SearchUsers/userSearch';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import { Container } from 'react-bootstrap';


const UpdateProject = () => {
  const [project, setProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Business Analyst');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const { user } = useContext(UserContext);
  const { projectId } = useParams(); 
  const navigate = useNavigate();

  const [status, setStatus] = useState('To Do'); // Add status state


  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleUserFound = (user) => setUserExists(!!user);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Modify the effect to fetch project data and set status
useEffect(() => {
  axios.get(`http://localhost:4000/api/projects/${projectId}`)
    .then((response) => {
      const projectData = response.data;
      setProject(projectData);
      setProjectName(projectData.projectName);
      setStartDate(projectData.startDate);
      setEndDate(projectData.endDate);
      setTeamMembers(projectData.teamMembers);
      setStatus(projectData.status); // Set the fetched status
    })
    .catch((error) => console.error('Error fetching project data:', error));
}, [projectId]);


  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleAddMember = () => {
    if (!email) {
      alert('Enter an email to add.');
      return;
    }
    if (!userExists) {
      alert('User does not exist!');
      return;
    }
    const newMember = { email, role };
    setTeamMembers([...teamMembers, newMember]);
    setEmail('');
    setRole('Business Analyst');
  };

  const handleRemoveMember = (emailToRemove, roleToRemove) => {
    setTeamMembers(
      teamMembers.filter(
        (member) => !(member.email === emailToRemove && member.role === roleToRemove)
      )
    );
  };
  

// Add status to the form data in handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('projectName', projectName);
  formData.append('startDate', startDate);
  formData.append('endDate', endDate);
  formData.append('status', status); // Append status

  if (image) {
    formData.append('projectImage', image);
  }
  formData.append('teamMembers', JSON.stringify(teamMembers));



    try {
    await axios.put(`http://localhost:4000/api/projects/${projectId}`, formData);
    setShowSuccessModal(true);
  } catch (error) {
    console.error('Error updating project:', error);
    alert('Error updating project');
  }
};


  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/projects');
  };

  return project ? (
    <div className='list'>
  <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
  <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
    <Sidebar isSidebarOpen={isSidebarOpen} />
    
    <Container style={{ maxWidth: '1200px' }}>
      <Card className="p-4 shadow-sm mt-5">
        <h2 className="mb-4">Update Project</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Card className="mb-4 p-3">
                <h5 className="mb-3">Project Information</h5>

                <Form.Group controlId="projectName" className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                  />
                </Form.Group>
                <Form.Group controlId="startDate" className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="endDate" className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="image" className="mb-3">
                  <Form.Label>Project Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-4 p-3">
                <h5 className="mb-3">Team Members</h5>
                <ListGroup className="mb-3">
                  {teamMembers.map((member, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      <span>{member.email} ({member.role})</span>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveMember(member.email, member.role)}
                        className="ml-2"
                      >
                        Remove
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <Form.Group controlId="addTeamMembers" className="mb-3">
                  <Form.Label>Add Team Member</Form.Label>
                  <Row className="align-items-center">
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
                        <Dropdown.Item eventKey="Project Manager">Project Manager</Dropdown.Item>
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
                  {!userExists && email && <Alert variant="danger" className="mt-3">User does not exist!</Alert>}
                  <Button variant="primary" onClick={handleAddMember} className="mt-3">Add Member</Button>
                </Form.Group>


                <Form.Group controlId="status" className="mb-3">
  <Form.Label>Project Status</Form.Label>
  <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
    <option value="Done">Done</option>
    <option value="In Progress">In Progress</option>
    <option value="To Do">To Do</option>
    <option value="In Review">In Review</option>
    <option value="On Hold">On Hold</option>
  </Form.Control>
</Form.Group>


              </Card>
            </Col>
          </Row>

          <Button variant="success" type="submit">Update Project</Button>
        </Form>
      </Card>

      <Modal show={showSuccessModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Project updated successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>OK</Button>
        </Modal.Footer>
      </Modal>

      </Container>
      </div>
    <Footer />
    </div>
  ) : (
    <div className="text-center mt-5">Loading...</div>
  );
};

export default UpdateProject;

