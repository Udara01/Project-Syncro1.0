import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card} from 'react-bootstrap';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';

import DesignDownload from '../Components/DesignDownload';

  const DesignDownloadPage = () => {
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
          console.error('Error fetching project:', err);
          setError(err.response && err.response.status === 403 ? 'Access denied' : 'Error fetching project');
        }
      };
      fetchProject();
    }, [projectId, user.useremail]);
  
    if (!project) return <div>Loading...</div>;
  
    return (
      <div className="Home">
        <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Sidebar isSidebarOpen={isSidebarOpen} show={true} projectId={projectId} />
  
            <div className="container">
            <DesignDownload />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
export default DesignDownloadPage;
