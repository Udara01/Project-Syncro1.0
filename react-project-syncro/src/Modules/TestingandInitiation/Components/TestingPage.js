import React, { useState, useEffect } from 'react';
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

          {/* Modals for New Test Case and Issue */}
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

export default TestingPage;


