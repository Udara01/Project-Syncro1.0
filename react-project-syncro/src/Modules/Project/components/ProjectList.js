import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard`);
    //navigate(`/dashboard/${projectId}`);
  };

  const handleCreateProject = () => {
    navigate('/createProject');
  };

  return (
    <div className='list'>
      <Navbarmain />
      <Container>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0', marginTop:'40px' }}>
          <Button variant="success" onClick={handleCreateProject}>
            Create New Project
          </Button>
        </div>
        <Row style={{ marginLeft: '150px', marginTop: '60px', padding: '20px' }}>
          {projects.map((project) => (
            <Col key={project._id} md={4} sm={6} xs={12} className="mb-4" style={{ marginBottom: '20px' }}>
              <Card onClick={() => handleProjectClick(project._id)} style={{ cursor: 'pointer' }} className="h-100">
                <Card.Img 
                  variant="top" 
                  src={project.projectImage ? project.projectImage : '/uploads/default.jpg'} 
                  alt={project.projectName} 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/default.jpg'; }} 
                  style={{ height: '300px', objectFit: 'cover' }} // Set a fixed height and maintain aspect ratio
                  
                />
                <Card.Body>
                  <Card.Title>{project.projectName}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProjectList;


