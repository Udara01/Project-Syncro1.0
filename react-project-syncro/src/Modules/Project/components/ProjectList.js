import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../contexts/UserContext";

const ProjectList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (user?.useremail) {
      fetchUserProjects(user.useremail);
    }
  }, [user]);

  const fetchUserProjects = async (email) => {
    try {
      const userProjectsResponse = await axios.get(`http://localhost:4000/api/userProjects`, { params: { email } });
      const projectObjects = userProjectsResponse.data.projects;
      const projectIds = projectObjects.map(project => project._id);

      if (projectIds.length === 0) {
        setProjects([]);
        return;
      }

      const projectIdsString = projectIds.join(',');
      const projectsResponse = await axios.get(`http://localhost:4000/api/projects`, {
        params: { ids: projectIdsString }
      });

      setProjects(projectsResponse.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard/${projectId}`);
  };

  const handleCreateProject = () => {
    navigate('/createProject');
  };

  return (
    <div className='list'>
      <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <Container style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0', marginTop: '40px' }}>
            <Button variant="success" onClick={handleCreateProject}>
              Create New Project
            </Button>
          </div>
          <div className='content'>
            <Row style={{ marginLeft: '0px', marginTop: '40px', padding: '20px' }}>
              {projects.map((project) => (
                <Col key={project._id} md={4} sm={6} xs={12} className="mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
                  <Card onClick={() => handleProjectClick(project._id)} style={{ cursor: 'pointer', width: '18rem' }} className="h-100">
                    <Card.Img
                      variant="top"
                      src={project.projectImage || '/uploads/default.jpg'}
                      alt={project.projectName}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/default.jpg'; }}
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title>{project.projectName}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectList;

