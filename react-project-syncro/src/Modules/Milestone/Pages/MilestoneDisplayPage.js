import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import { UserContext } from '../../../contexts/UserContext';
import '../../../styles/ProjectDashboard.css';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import MilestoneDisplay from '../Components/MilestoneDisplay';

function MilestoneDisplayPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const { user } = useContext(UserContext);
  const { projectId } = useParams();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log(`Fetching project with ID: ${projectId}`);
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}`);
        setProject(response.data);

        const currentUserEmail = user.useremail;
        const roles = response.data.teamMembers
          .filter(member => member.email === currentUserEmail)
          .map(member => member.role);
        
        setUserRoles(roles.length > 0 ? roles : ['No roles assigned']);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err.response?.status === 403 ? 'Access denied' : 'Error fetching project');
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
        <div className="content" style={{ marginLeft: isSidebarOpen ? '0px' : '-10px', marginTop: '56px', padding: '20px' }}>
          <Container>
            <Row className="align-items-center mb-3">
              <Col>
                <h2 className="text-primary">Project Milestones</h2>
              </Col>
            </Row>

            {/* Milestone List */}
            <Row>
              <Col>
                <MilestoneDisplay />
              </Col>
            </Row>

            {/* Add Milestone Modal */}
            <Modal show={showMilestoneModal} onHide={() => setShowMilestoneModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Create New Milestone</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowMilestoneModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MilestoneDisplayPage;
