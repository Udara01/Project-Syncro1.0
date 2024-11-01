import React, { useEffect, useState } from 'react';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NewIssueForm from '../../TestingandInitiation/Components/NewIssueForm';


const IssueLog = () => {
  const { projectId } = useParams();
  const [issues, setIssues] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [SelectedIssueLog, setSelectedIssueLog] = useState(null);
  
  // Fetch issues from the server when the component mounts
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/issues/${projectId}`);
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, [projectId]);

  const filteredIssues = issues.filter(issue =>
    (priorityFilter ? issue.severity === priorityFilter : true) &&
    (statusFilter ? issue.status === statusFilter : true)
  );

  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const deleteIssue = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/issues/${id}`);
      setIssues(issues.filter(issue => issue._id !== id)); // Update the local state
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  const handleSave = () => {
    // Optionally, refresh test cases here or perform other actions on save
    setShowModal(false);
    setSelectedIssueLog(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIssueLog(null); // Reset on close
  };

  const handleUpdate = (issue) => {
    setSelectedIssueLog(issue); // Set test case data to edit
    setShowModal(true); // Show modal
  };

  return (
    <div>
      <h4>Issue Log</h4>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Select
            aria-label="Filter by Priority"
            onChange={e => setPriorityFilter(e.target.value)}
            className="mb-3"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Critical">Critical</option>
            <option value="Low">Low</option>

          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select
            aria-label="Filter by Status"
            onChange={e => setStatusFilter(e.target.value)}
            className="mb-3"
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </Form.Select>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Issue_ID</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {filteredIssues.map(issue => (
            <React.Fragment key={issue._id}>
              <tr onClick={() => toggleRowExpansion(issue._id)} style={{ cursor: 'pointer' }}>
                <td>{issue.issueId}</td>
                <td>{issue.description}</td>
                <td>{issue.severity}</td>
                <td>{issue.status}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2" // Adds margin to the right of the button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(issue); // Open modal with selected test case
                    }}
                  >
                    Update
                  </Button>

                  <Button variant="danger" 
                  size="sm" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    deleteIssue(issue._id); }}>
                    Delete
                  </Button>
                </td>
              </tr>
              {expandedRow === issue._id && (
                <tr>
                  <td colSpan="5">
                    <div>
                      <strong>Actual Outcomes:</strong> {issue.actualOutComes}
                      <br />
                      <strong>Steps to Reproduce:</strong> {issue.stepsToReproduce}
                      <br />
                      <strong>Assigned To:</strong> {issue.assignedTo}
                      <br />
                      <strong>Date Reported:</strong> {issue.dateReported}
                      <br />
                      <strong>Expected Resolution Date:</strong> {issue.expectedResolutionDate}
                      <br />
                      <strong>Actual Resolution Date:</strong> {issue.actualResolutionDate || 'N/A'}
                      <br />
                      <strong>Comments:</strong> {issue.comments}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <NewIssueForm
          show={showModal}
          handleClose={handleCloseModal}
          handleSave={handleSave}
          SelectedIssueLog={SelectedIssueLog}
        />
      )}
    </div>
  );
};

export default IssueLog;
