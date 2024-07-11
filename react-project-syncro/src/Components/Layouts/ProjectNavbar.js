import React from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/nav.css'

const ProjectNavbar = () => {
  return (
    <div className="project-navbar-container"/* style={{ width: '85%'}}*/>
      <Nav fill variant="tabs" defaultActiveKey="/planning">
        <Nav.Item>
          <Nav.Link href="/planning" className="nav-link-custom active">Planning</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/requirements" className="nav-link-custom">Requirements</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/designs" className="nav-link-custom">Designs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/implementation" className="nav-link-custom">Implementation</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/testing" className="nav-link-custom">Testing & Integration</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/documents" className="nav-link-custom">Documents</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default ProjectNavbar;
