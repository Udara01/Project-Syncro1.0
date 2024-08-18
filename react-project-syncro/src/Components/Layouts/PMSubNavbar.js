// src/Components/Layouts/ProjectManagerSubNavbar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/pmsubnavbar.css'; // Custom CSS for the sub-navbar

const PMSubNavbar = ({ projectId }) => {
  return (
    <div className="project-manager-subnavbar-container">
      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link as={Link} to={`/projects/${projectId}/details`}>
            Project Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/projects/${projectId}/create-task`}>
            Create Task
          </Nav.Link>
        </Nav.Item>
        {/* Add Team Management Tab */}
        <Nav.Item>
          <Nav.Link as={Link} to={`/projects/${projectId}/team-management`}>
            Team Management
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default PMSubNavbar;
