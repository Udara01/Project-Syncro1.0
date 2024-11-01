import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CommitList from '../Components/CommitList';
import PullRequestList from '../Components/PullRequestList';
import RepoDetails from '../Components/RepoDetails';
import GithubDetailsForm from '../Components/GithubDetailsForm';
import { FaCodeBranch, FaHistory, FaPlusCircle } from 'react-icons/fa';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';


  const GitDashboard = () => {
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


          <Container className="my-4">
      <h1 className="text-center mb-4">Project Git Dashboard</h1>
      <RepoDetails />
      <Row className="mt-4">
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header className="d-flex align-items-center">
              <FaPlusCircle className="me-2" /> <h5 className="mb-0">Save GitHub Details</h5>
            </Card.Header>
            <Card.Body>
              <GithubDetailsForm />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header className="d-flex align-items-center">
              <FaHistory className="me-2" /> <h5 className="mb-0">Commit History</h5>
            </Card.Header>
            <Card.Body>
              <CommitList />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header className="d-flex align-items-center">
              <FaCodeBranch className="me-2" /> <h5 className="mb-0">Pull Requests</h5>
            </Card.Header>
            <Card.Body>
              <PullRequestList />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
        </div>
        <Footer />
      </div>
    );
  }
  
export default GitDashboard;
