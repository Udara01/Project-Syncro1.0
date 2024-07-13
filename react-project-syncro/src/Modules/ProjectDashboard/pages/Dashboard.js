// src/components/ProjectDashboard.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link  } from 'react-router-dom';
import axios from 'axios';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import ProjectNavbar from '../../../Components/Layouts/ProjectNavbar';
import ProjectOverview from '../Components/ProjectOverview';
import CustomCalendar from '../Components/Calendar';
import TaskList from '../Components/TaskList';
import Timeline from '../Components/Timeline';
import FileUpload from '../Components/FileUpload';
import TeamMembers from '../Components/TeamMembers';
import { UserContext } from '../../../contexts/UserContext'; // Import UserContext
import '../../../styles/ProjectDashboars.css';

function Dashboard() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const { user } = useContext(UserContext); // Access user context
  const navigate = useNavigate();

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
      <Navbarmain />
      <ProjectNavbar userRoles={userRoles} projectId={projectId} /> {/* Pass userRoles and projectId as props to the ProjectNavbar*/}
      <div className="content" style={{ marginLeft: '250px', marginTop: '56px', padding: '20px' }}>
        <h1>{project.projectName}</h1>
        <p>Roles: {userRoles.join(' | ')}</p> {/* Display all user roles */}


{/*Role base access contoll test*/}
        {userRoles.includes('Project Manager') && (
          <Link to={`/project-planning/${projectId}`}>Go to Project Planning</Link>
        )}
<br></br>
{userRoles.includes('Product Owner') && (
          <Link to={`/product-owner/${projectId}`}>Go to Product Owner Page</Link>
        )}
{/*Role base access contoll test*/}

      </div>
      <p>Project ID: {projectId}</p>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <ProjectOverview />
            <CustomCalendar />
          </div>
          <div className="col-md-4">
            <TaskList />
          </div>
          <div className="col-md-4">
            <Timeline />
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
  );
}

export default Dashboard;