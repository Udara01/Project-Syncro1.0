import React from 'react';
import { Nav, Dropdown} from 'react-bootstrap';
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
              {/*{(userRoles.includes('Team Lead') || userRoles.includes('Product Owner')) && (
              <Dropdown.Item as={Link} to={`/projects/${projectId}/tasks`}>Task Management</Dropdown.Item>)}*/}
              
            {userRoles.includes('Team Lead') && (
              <Dropdown.Item as={Link} to={`/projects/${projectId}/CreateTask`}>Task Management</Dropdown.Item>)}

              {userRoles.includes('Project Manager') && (
              <Dropdown.Item as={Link} to={`/projects/${projectId}/updateproject`}>Project Control</Dropdown.Item>)}

              {userRoles.includes('Project Manager') && (
              <Dropdown.Item as={Link} to={`/projects/${projectId}/project-planning`}>Project Planning</Dropdown.Item>)}

             {/*  <Dropdown.Item href={`/projects/${projectId}/milestoneForm`}>MilestoneForm</Dropdown.Item> */}
              <Dropdown.Item href={`/projects/${projectId}/milestone-List`}>project Milestones</Dropdown.Item>

             {/* <Dropdown.Item href={`/projects/${projectId}/gantt`}>Gantt Chart</Dropdown.Item>/    */}

             <Dropdown.Item href={`/projects/${projectId}/milestone-List-show`}>project Milestones</Dropdown.Item>


            </Dropdown.Menu>      

          </Dropdown>                  
        </Nav.Item>
        <Nav.Item>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
              Requirements
            </Dropdown.Toggle>
            <Dropdown.Menu>
           {/*   {userRoles.includes('Product Owner') && (
              <Dropdown.Item as={Link} to={`/prioritize-requirements/${projectId}`}>Prioritize Requirements</Dropdown.Item>)}

              {userRoles.includes('Business Analyst') && (
              <Dropdown.Item as={Link} to={`/projects/${projectId}/requirement`}>Project Requirements</Dropdown.Item>)}
*/} 

              {userRoles.includes('Business Analyst') && (
              <Dropdown.Item as={Link} to={`/projects/${projectId}/requirementlist`}>Project Requirements</Dropdown.Item>)}

              <Dropdown.Item as={Link} to={`/projects/${projectId}/prioritylist`}>Prioritized Requirements</Dropdown.Item>
            </Dropdown.Menu>        

{/*'Project Manager', 'Product Owner', 'Business Analyst', 'Software Architect', 'Team Lead', 'Developers/Programmers', 'UX/UI Designers', 'Quality Assurance Testers', 'Client' */}
          </Dropdown>
        </Nav.Item>
        <Nav.Item>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
              Designs
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {userRoles.includes('UX/UI Designers') && (
              <Dropdown.Item as={Link} to={`/projects/${projectId}/design`}>UI Design</Dropdown.Item>)}

              <Dropdown.Item href={`/projects/${projectId}/design/download`}>UI Design Download</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>                 
        </Nav.Item>
        <Nav.Item>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
              Implementation
            </Dropdown.Toggle>           
            <Dropdown.Menu>
              <Dropdown.Item href={`/projects/${projectId}/git`}>GitDashboard</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
        <Nav.Item>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
              Testing & Integration
            </Dropdown.Toggle>
            <Dropdown.Menu>  
            {(userRoles.includes('Team Lead') || userRoles.includes('Quality Assurance Testers') || userRoles.includes('Developers/Programmers')) && (<Dropdown.Item as={Link} to={`/projects/${projectId}/testing`}>Testing</Dropdown.Item>)}         

            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
        <Nav.Item>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
              Documents
            </Dropdown.Toggle>         
            <Dropdown.Menu>         
              <Dropdown.Item href={`/projects/${projectId}/documents`}>Project Documents</Dropdown.Item>
              <Dropdown.Item href={`/projects/${projectId}/pridocuments`}>My Document</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default ProjectNavbar;
