import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewTestCaseForm = ({ show, handleClose, handleSave, selectedTestCase  }) => {
  const { projectId } = useParams();
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  const [testCase, setTestCase] = useState({
    name: '',
    feature: '',
    description: '',
    preConditions: '',
    testSteps: '',
    testData: '',
    expectedOutcome: '',
    postCondition: '',
    actualResult: '',
    status: '',
    comments: '',
    createdBy: '',
    dateOfCreation: '',
    reviewedBy: '',
    dateOfReview: '',
  });

  useEffect(() => {
    if (selectedTestCase) {
      setTestCase(selectedTestCase); // Populate form with existing data
    }
  }, [selectedTestCase]);

  const saveTestCase = async () => {
    const url = selectedTestCase
      ? `http://localhost:4000/api/testing/${selectedTestCase._id}`
      : 'http://localhost:4000/api/testing';

    const method = selectedTestCase ? 'put' : 'post';
    
    try {
      const response = await axios[method](url, { ...testCase, projectId });
      if (response.status === 200 || response.status === 201) {
        handleSave(); // refresh list after saving
        handleClose(); // close modal
      }
    } catch (err) {
      console.error('Error saving test case:', err);
    }
  };

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
        console.log(response.data); // Check data here
        setMembers(response.data.teamMembers);
      } catch (err) {
        setError('Error fetching team members');
        console.error(err);
      }
    };
    

    fetchTeamMembers();
  }, [projectId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestCase((prev) => ({ ...prev, [name]: value }));
  };

 /* const saveTestCase = async () => {
    // Basic validation for required fields
    if (!testCase.name || !testCase.feature || !testCase.expectedOutcome) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/api/testing', {
        ...testCase,
        projectId,
      });
      if (response.status === 201) {
        handleClose();
      }
    } catch (err) {
      setError('Error saving test case.');
    }
  };*/

  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>{selectedTestCase ? 'Edit Test Case' : 'New Test Case'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <Tabs defaultActiveKey="generalInfo" id="test-case-form-tabs">
          <Tab eventKey="generalInfo" title="General Info">
            <Form.Group className="mb-3" controlId="testCaseName">
              <Form.Label>Test Case Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter test case name"
                name="name"
                value={testCase.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="testCaseFeature">
              <Form.Label>Feature</Form.Label>
              <Form.Control
                type="text"
                placeholder="Feature to test"
                name="feature"
                value={testCase.feature}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="testCaseDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Brief description of the test case"
                name="description"
                value={testCase.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Tab>

          <Tab eventKey="stepsData" title="Test Steps & Data">
            <Form.Group className="mb-3" controlId="preConditions">
              <Form.Label>Pre-Conditions</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Conditions required before executing"
                name="preConditions"
                value={testCase.preConditions}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="testSteps">
              <Form.Label>Test Steps</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Step-by-step instructions from an end-user’s perspective"
                name="testSteps"
                value={testCase.testSteps}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="testData">
              <Form.Label>Test Data/Inputs</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Data inputs required for testing"
                name="testData"
                value={testCase.testData}
                onChange={handleChange}
              />
            </Form.Group>
          </Tab>

          <Tab eventKey="results" title="Results">
            <Form.Group className="mb-3" controlId="expectedOutcome">
              <Form.Label>Expected Outcome</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="The expected result of the test"
                name="expectedOutcome"
                value={testCase.expectedOutcome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postCondition">
              <Form.Label>Post Condition</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Conditions to be fulfilled after execution"
                name="postCondition"
                value={testCase.postCondition}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="actualResult">
              <Form.Label>Actual Result</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="The actual outcome after execution"
                name="actualResult"
                value={testCase.actualResult}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={testCase.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
              </Form.Control>
            </Form.Group>
          </Tab>

          <Tab eventKey="additionalInfo" title="Additional Info">
            <Form.Group className="mb-3" controlId="comments">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Any additional comments"
                name="comments"
                value={testCase.comments}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createdBy">
              <Form.Label>Created By</Form.Label>
              <Form.Control 
              as="select" name="createdBy" 
              value={testCase.createdBy} 
              onChange={handleChange}>

                <option value="">Select member</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.email} - {member.role}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="dateOfCreation">
              <Form.Label>Date of Creation</Form.Label>
              <Form.Control
                type="date"
                name="dateOfCreation"
                value={testCase.dateOfCreation}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="reviewedBy">
              <Form.Label>Reviewed By</Form.Label>
              <Form.Control 
              as="select" name="reviewedBy" 
              value={testCase.reviewedBy} 
              onChange={handleChange}>
                <option value="">Select member</option>

                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.email} - {member.role}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="dateOfReview">
              <Form.Label>Date of Review</Form.Label>
              <Form.Control
                type="date"
                name="dateOfReview"
                value={testCase.dateOfReview}
                onChange={handleChange}
              />
            </Form.Group>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={saveTestCase}>
        {selectedTestCase ? 'Update Test Case' : 'Save Test Case'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewTestCaseForm;
