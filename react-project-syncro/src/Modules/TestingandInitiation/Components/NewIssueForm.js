import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewIssueForm = ({ show, handleClose, handleSave, SelectedIssueLog }) => {
  const [members, setMembers] = useState([]);
  const { projectId } = useParams();
  const [error, setError] = useState('');
  const [issue, setIssue] = useState({
    issueId: '',
    description: '',
    severity: '',
    status: '',
    actualOutComes: '',
    stepsToReproduce: '',
    assignedTo: '',
    dateReported: '',
    expectedResolutionDate: '',
    actualResolutionDate: '',
    comments: '',
  });

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

  // Populate form with existing issue data if SelectedIssueLog is provided
  useEffect(() => {
    if (SelectedIssueLog) {
      setIssue({
        issueId: SelectedIssueLog.issueId || '',
        description: SelectedIssueLog.description || '',
        severity: SelectedIssueLog.severity || '',
        status: SelectedIssueLog.status || '',
        actualOutComes: SelectedIssueLog.actualOutComes || '',
        stepsToReproduce: SelectedIssueLog.stepsToReproduce || '',
        assignedTo: SelectedIssueLog.assignedTo || '',
        dateReported: SelectedIssueLog.dateReported || '',
        expectedResolutionDate: SelectedIssueLog.expectedResolutionDate || '',
        actualResolutionDate: SelectedIssueLog.actualResolutionDate || '',
        comments: SelectedIssueLog.comments || '',
      });
    } else {
      setIssue({
        issueId: '',
        description: '',
        severity: '',
        status: '',
        actualOutComes: '',
        stepsToReproduce: '',
        assignedTo: '',
        dateReported: '',
        expectedResolutionDate: '',
        actualResolutionDate: '',
        comments: '',
      });
    }
  }, [SelectedIssueLog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue((prev) => ({ ...prev, [name]: value }));
  };

  const saveIssue = async () => {
    try {
      if (SelectedIssueLog) {
        // Update existing issue
        const response = await axios.put(`http://localhost:4000/api/issues/${SelectedIssueLog._id}`, {
          ...issue,
        });
        handleSave(response.data); // Call the handleSave function with the updated issue data
      } else {
        // Create new issue
        const response = await axios.post(`http://localhost:4000/api/issues`, {
          projectId, // Include projectId here
          ...issue, // Spread the rest of the issue properties
        });
        handleSave(response.data); // Call the handleSave function with the saved issue data
      }
      handleClose(); // Close the modal
    } catch (error) {
      setError('Error saving issue'); // Handle error
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{SelectedIssueLog ? 'Edit Issue' : 'New Issue'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>} {/* Display error message */}
        <Form>
          <Form.Group className="mb-3" controlId="issueDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe the issue"
              name="description"
              value={issue.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="issueSeverity">
            <Form.Label>Severity</Form.Label>
            <Form.Select
              name="severity"
              value={issue.severity}
              onChange={handleChange}
            >
              <option>Select severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="issueStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={issue.status}
              onChange={handleChange}
            >
              <option>Select status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="actualOutComes">
            <Form.Label>Actual Outcomes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What actually happened, which differs from the expected outcome."
              name="actualOutComes"
              value={issue.actualOutComes}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="stepsToReproduce">
            <Form.Label>Steps to Reproduce</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Provide steps to reproduce the issue"
              name="stepsToReproduce"
              value={issue.stepsToReproduce}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="assignedTo">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              as="select" name="assignedTo"
              value={issue.assignedTo}
              onChange={handleChange}>
              <option value="">Assigned member</option>
              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.email} - {member.role}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="dateReported">
            <Form.Label>Date Reported</Form.Label>
            <Form.Control
              type="date"
              name="dateReported"
              value={issue.dateReported}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="expectedResolutionDate">
            <Form.Label>Expected Resolution Date</Form.Label>
            <Form.Control
              type="date"
              name="expectedResolutionDate"
              value={issue.expectedResolutionDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="actualResolutionDate">
            <Form.Label>Actual Resolution Date</Form.Label>
            <Form.Control
              type="date"
              name="actualResolutionDate"
              value={issue.actualResolutionDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="comments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Additional comments"
              name="comments"
              value={issue.comments}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="primary" onClick={saveIssue}>
          {SelectedIssueLog ? 'Update Issue' : 'Save Issue'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewIssueForm;
