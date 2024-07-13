import React from 'react';
import { Nav, Dropdown, DropdownButton,} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/nav.css';

const ProjectNavbar = ({ userRoles, projectId }) => { //in here projectNavbar is accept userRoles and projectId as props and conditionally render the links.
  return (
    <div className="project-navbar-container">
      <Nav fill variant="tabs" defaultActiveKey="/planning">
        <Nav.Item>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="nav-link-custom active">
              Planning
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/planning/task1">Task 1</Dropdown.Item>
              <Dropdown.Item href="/planning/task2">Task 2</Dropdown.Item>
              <Dropdown.Item href="/planning/task3">Task 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
        <Nav.Item>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
              Requirements
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/requirements/requirement1">Business Analyst</Dropdown.Item>
              {userRoles.includes('Product Owner') && (
              <Dropdown.Item as={Link} to={`/prioritize-requirements/${projectId}`}>Product Owner</Dropdown.Item>)}
              <Dropdown.Item href="/requirements/requirement3">Requirement 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
        <Nav.Item>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
              Designs
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/designs/design1">Design 1</Dropdown.Item>
              <Dropdown.Item href="/designs/design2">Design 2</Dropdown.Item>
              <Dropdown.Item href="/designs/design3">Design 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
        <Nav.Item>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
              Implementation
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/implementation/step1">Step 1</Dropdown.Item>
              <Dropdown.Item href="/implementation/step2">Step 2</Dropdown.Item>
              <Dropdown.Item href="/implementation/step3">Step 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
        <Nav.Item>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
              Testing & Integration
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/testing/unit">Unit Testing</Dropdown.Item>
              <Dropdown.Item href="/testing/integration">Integration Testing</Dropdown.Item>
              <Dropdown.Item href="/testing/e2e">End-to-End Testing</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
        <Nav.Item>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
              Documents
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/documents/specs">Specifications</Dropdown.Item>
              <Dropdown.Item href="/documents/reports">Reports</Dropdown.Item>
              <Dropdown.Item href="/documents/diagrams">Diagrams</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default ProjectNavbar;
