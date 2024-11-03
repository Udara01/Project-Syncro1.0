/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';

import OverviewPanel from '../../TestingandInitiation/Components/OverviewPanel';
import TestCasesList from '../../TestingandInitiation/Components/TestCasesList';
import IssueLog from '../../TestingandInitiation/Components/IssueLog';
import NewTestCaseForm from '../../TestingandInitiation/Components/NewTestCaseForm';
import NewIssueForm from '../../TestingandInitiation/Components/NewIssueForm';

const TestingPage = () => {
  const { projectId } = useParams();

  const [showTestCaseModal, setShowTestCaseModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpenTestCaseModal = () => setShowTestCaseModal(true);
  const handleCloseTestCaseModal = () => setShowTestCaseModal(false);
  
  const handleOpenIssueModal = () => setShowIssueModal(true);
  const handleCloseIssueModal = () => setShowIssueModal(false);

  const handleSaveTestCase = (testCase) => {
    // Code to save the test case to the backend
    console.log("Saved Test Case:", testCase);
    handleCloseTestCaseModal(); // Close modal after saving
  };

  const handleSaveIssue = (issue) => {
    // Code to save the issue to the backend
    console.log("Saved Issue:", issue);
    handleCloseIssueModal(); // Close modal after saving
  };

  useEffect(() => {
    // Fetch data or perform other side effects
    setLoading(false); // Simulating data loading; set to false when data is ready
  }, [projectId]);

  return (
    <div className="container my-4">
      <h2 className="text-center">System Testing Dashboard</h2>
      
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <span className="ms-2">Loading...</span>
        </div>
      ) : (
        <>
          <Card className="mb-4">
            <Card.Body>
              <OverviewPanel />
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-between mb-3">
            <Button variant="primary" onClick={handleOpenTestCaseModal}>
              Log New Test Case
            </Button>
            <Button variant="danger" onClick={handleOpenIssueModal}>
              Log New Issue
            </Button>
          </div>

          <Card className="mb-4">
            <Card.Header>Test Cases</Card.Header>
            <Card.Body>
              <TestCasesList />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Issue Log</Card.Header>
            <Card.Body>
              <IssueLog />
            </Card.Body>
          </Card>

          <NewTestCaseForm
            show={showTestCaseModal}
            handleClose={handleCloseTestCaseModal}
            handleSave={handleSaveTestCase}
          />
          <NewIssueForm
            show={showIssueModal}
            handleClose={handleCloseIssueModal}
            handleSave={handleSaveIssue}
          />
        </>
      )}
    </div>
  );
};

export default TestingPage;*/



import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';

import OverviewPanel from '../Components/OverviewPanel';
import TestCasesList from '../Components/TestCasesList';
import IssueLog from '../Components/IssueLog';
import NewTestCaseForm from '../Components/NewTestCaseForm';
import NewIssueForm from '../Components/NewIssueForm';

import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';



  const TestingPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const [userRoles, setUserRoles] = useState([]);
    const { user } = useContext(UserContext);


    const [showTestCaseModal, setShowTestCaseModal] = useState(false);
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [loading, setLoading] = useState(true);
  
    const handleOpenTestCaseModal = () => setShowTestCaseModal(true);
    const handleCloseTestCaseModal = () => setShowTestCaseModal(false);
    
    const handleOpenIssueModal = () => setShowIssueModal(true);
    const handleCloseIssueModal = () => setShowIssueModal(false);
  
    const handleSaveTestCase = (testCase) => {
      // Code to save the test case to the backend
      console.log("Saved Test Case:", testCase);
      handleCloseTestCaseModal(); // Close modal after saving
    };
  
    const handleSaveIssue = (issue) => {
      // Code to save the issue to the backend
      console.log("Saved Issue:", issue);
      handleCloseIssueModal(); // Close modal after saving
    };
  
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
      setLoading(false); // Simulating data loading; set to false when data is ready
    }, [projectId, user.useremail]);
  
    if (!project) return <div>Loading...</div>;
  
    return (
      <div className="Home">
        <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Sidebar isSidebarOpen={isSidebarOpen} show={true} projectId={projectId} />
          <div className="container my-4">
      <h2 className="text-center">System Testing Dashboard</h2>
      
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <span className="ms-2">Loading...</span>
        </div>
      ) : (
        <>
          <Card className="mb-4">
            <Card.Body>
              <OverviewPanel />
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-between mb-3">
            <Button variant="primary" onClick={handleOpenTestCaseModal}>
              Log New Test Case
            </Button>
            <Button variant="danger" onClick={handleOpenIssueModal}>
              Log New Issue
            </Button>
          </div>

          <Card className="mb-4">
            <Card.Header>Test Cases</Card.Header>
            <Card.Body>
              <TestCasesList />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Issue Log</Card.Header>
            <Card.Body>
              <IssueLog />
            </Card.Body>
          </Card>

          <NewTestCaseForm
            show={showTestCaseModal}
            handleClose={handleCloseTestCaseModal}
            handleSave={handleSaveTestCase}
          />
          <NewIssueForm
            show={showIssueModal}
            handleClose={handleCloseIssueModal}
            handleSave={handleSaveIssue}
          />
        </>
      )}
    </div>
        </div>
        <Footer />
      </div>
    );
  }
  
export default TestingPage;
