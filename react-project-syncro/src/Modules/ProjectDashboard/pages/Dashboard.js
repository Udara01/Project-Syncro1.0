/*import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import ProjectNavbar from '../../../Components/Layouts/ProjectNavbar';
import ProjectOverview from '../Components/ProjectOverview';
import CustomCalendar from '../Components/Calendar';
import TaskList from '../Components/TaskList';
import Timeline from '../Components/Timeline';
import FileUpload from '../Components/FileUpload';
import TeamMembers from '../Components/TeamMembers';
import { UserContext } from '../../../contexts/UserContext'; // Import UserContext
import '../../../styles/ProjectDashboard.css';
import PrivateDocument from '../../DocumentManagement/Components/PrivateDocument';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { projectId,userId } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const { user } = useContext(UserContext); // Access user context
  
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log(`Fetching project with ID: ${projectId}`);
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}`);
        setProject(response.data);

        // Find all roles for the current user in the project
        const currentUserEmail = user.useremail; // Get the current user's email
        const roles = response.data.teamMembers
          .filter(member => member.email === currentUserEmail)
          .map(member => member.role);
          const userId = user ? user._id : null;
          
        setUserRoles(roles.length > 0 ? roles : ['No roles assigned']);
      } catch (err) {
        console.error('Error fetching project:', err);
        if (err.response && err.response.status === 403) {
          setError('Access denied');
        } else {
          setError('Error fetching project');
        }
      }
    };

    

    fetchProject();
  }, [projectId, user.useremail]);


  
  if (error) {
    return <div>{error}</div>;
  }
  
  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Home">
      <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} show={true} projectId={projectId} />

        <div className="content" style={{ marginLeft: isSidebarOpen ? '0px' : '-10px', marginTop: '56px', padding: '20px' }}>
          <ProjectNavbar userRoles={userRoles} projectId={projectId} /> {/* Pass userRoles and projectId as props to the ProjectNavbar *//*}
{/*
           Role-based access control test 
          {userRoles.includes('Project Manager') && (
            <Link to={`/project-planning/${projectId}`}>Go to Project Planning</Link>
          )}
          <br />
          {userRoles.includes('Product Owner') && (
            <Link to={`/product-owner/${projectId}`}>Go to Product Owner Page</Link>
          )}

          <br />
          <Link to={`/projects/${projectId}/add-meeting`}>Create a New Meeting</Link>

          <Link to={`/projects/${projectId}/create-meeting`}>Create a New Meeting2</Link>
<br></br>
          <Link to={`/projects/${projectId}/taskCreat`}>Create a New task</Link> 
        


         <Link to={`/projects/${projectId}/sprints`}>Project Plan</Link> <br></br>*//*}

          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <ProjectOverview />
                <CustomCalendar />
                <Timeline />
              </div>

              <div className="col-md-4">
                <br></br>
                <h1>{project.projectName}</h1>

                <p>Roles Of Project: {userRoles.join(' | ')}</p>

              </div>

              <div className="col-md-4">
                <TaskList />
                <TeamMembers />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <FileUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;*/


import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import ProjectNavbar from '../../../Components/Layouts/ProjectNavbar';
import ProjectOverview from '../Components/ProjectOverview';
import CustomCalendar from '../Components/Calendar';
import TaskList from '../Components/TaskList';
import Timeline from '../Components/Timeline';
import FileUpload from '../Components/FileUpload';
import TeamMembers from '../Components/TeamMembers';
import { UserContext } from '../../../contexts/UserContext';
import '../../../styles/ProjectDashboard.css';
import PrivateDocument from '../../DocumentManagement/Components/PrivateDocument';
import { Card, Col, Row } from 'react-bootstrap';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}`);
        setProject(response.data);

        const currentUserEmail = user.useremail;
        const roles = response.data.teamMembers
          .filter(member => member.email === currentUserEmail)
          .map(member => member.role);

        setUserRoles(roles.length > 0 ? roles : ['No roles assigned']);
      } catch (err) {
        setError(err.response && err.response.status === 403 ? 'Access denied' : 'Error fetching project');
      }
    };

    fetchProject();
  }, [projectId, user.useremail]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!project) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="Home">
      <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} show={true} projectId={projectId} />
        <div className="content" style={{ marginLeft: isSidebarOpen ? '0px' : '-10px', marginTop: '56px', padding: '20px' }}>
          <ProjectNavbar userRoles={userRoles} projectId={projectId} />

          <div className="container mt-4">
            <div className="row">
              <div className="col-md-4 mb-3">
                <ProjectOverview />
                <CustomCalendar />
                <div className='time' style={{  }}>
                <Timeline />
                </div>
                
              </div>
              
              <div className="col-md-4 mb-3 text-center" style={{ marginTop: '25px' }}>
                <div className="project-info-card shadow-sm p-4 rounded">
                  <h2 className="project-title mb-3">{project.projectName}</h2>
                  <p className="project-roles">Roles in Project</p>
                  <div className="role-badges">
                    {userRoles.map((role, index) => (
                      <span key={index} className="badge role-badge">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

    

              <div className="col-md-4 mb-3" >
                <TaskList />
                <TeamMembers />
                
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <FileUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;