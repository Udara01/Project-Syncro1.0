import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import { UserContext } from '../../../contexts/UserContext';
import '../../../styles/ProjectDashboard.css';
import GanttChart from '../Components/GanttChart';
import MilestoneForm from '../../Milestone/Components/MilestoneForm';
import { Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';

function ProjectPlan() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
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

        <div className="content" style={{ marginLeft: isSidebarOpen ? '0px' : '-10px', marginTop: '56px', padding: '20px' }}>
          <div className="container">
            {/* Page Header */}
            <div className="page-header d-flex align-items-center justify-content-between">
              <h2>Project Plan</h2>
              <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="add-milestone-tooltip">Add a new milestone</Tooltip>}
              >
                <Button variant="primary" onClick={() => setShowMilestoneModal(true)} className="d-flex align-items-center">
                  <FaPlusCircle className="mr-2" /> Add Milestone
                </Button>
              </OverlayTrigger>
            </div>

            {/* Modal for Milestone Form */}
            <Modal show={showMilestoneModal} onHide={() => setShowMilestoneModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Create New Milestone</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <MilestoneForm />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowMilestoneModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Gantt Chart Section */}
            <div className="gantt-chart-section mt-4">
              <h4 className="section-title">Project Timeline</h4>
              <GanttChart />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProjectPlan;
