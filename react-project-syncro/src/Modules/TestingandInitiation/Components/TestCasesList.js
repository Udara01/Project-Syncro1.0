import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Form, Collapse, Card, Button } from 'react-bootstrap';
import NewTestCaseForm from '../../TestingandInitiation/Components/NewTestCaseForm';

const TestCasesList = () => {
  const [testCases, setTestCases] = useState([]);
  const { projectId } = useParams();
  const [filter, setFilter] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(null);

  // Fetch test cases on component mount
  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/testing/${projectId}`);
        setTestCases(response.data);
      } catch (error) {
        console.error("Error fetching test cases:", error);
      }
    };

    if (projectId) fetchTestCases();
  }, [projectId]);

  // Toggle collapse for details view
  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Filtered cases by status
  const filteredCases = testCases.filter(test =>
    filter ? test.status === filter : true
  );


  const handleUpdate = (test) => {
    setSelectedTestCase(test); // Set test case data to edit
    setShowModal(true); // Show modal
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTestCase(null); // Reset on close
  };

  // Delete test case function
  const deleteTestCase = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/testing/${id}`);
      setTestCases(testCases.filter(test => test._id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting test case:", error);
    }
  };
  const handleSave = () => {
    // Optionally, refresh test cases here or perform other actions on save
    setShowModal(false);
    setSelectedTestCase(null);
  };


  return (
    
    <div className="mb-4">
      <h4>Test Cases</h4>
      <Form.Select
        aria-label="Filter by Status"
        onChange={e => setFilter(e.target.value)}
        className="mb-3"
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Passed">Passed</option>
        <option value="Failed">Failed</option>
      </Form.Select>

      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Test Case ID</th>
            <th>Test Case</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCases.map(test => (
            <React.Fragment key={test._id}>
              <tr onClick={() => toggleRow(test._id)} style={{ cursor: 'pointer' }}>
                <td>{test.testCaseId}</td> {/* Display MongoDB's unique ID */}
                <td>{test.name}</td>
                <td>{test.status}</td>
                <td>

                 {/* Update Button with handleUpdate function*/}
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(test); 
                    }}
                  >
                    Update
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents row toggle when clicking delete
                      deleteTestCase(test._id);
                    }}
                  >
                    Delete 
                  </Button>

                </td>
              </tr>
              <tr>
                <td colSpan="4" className="p-0">
                  <Collapse in={expandedRow === test._id}>
                    <div className="p-3">
                      <Card>
                        <Card.Body>
                          <Card.Title>Test Case Details</Card.Title>
                          <Card.Text as="div">
                            <div className="row">
                              <div className="col-md-6 mb-2">
                                <strong>Feature:</strong> {test.feature} <br />
                                <strong>Description:</strong> {test.description} <br />
                                <strong>Pre-Conditions:</strong> {test.preConditions} <br />
                                <strong>Post Condition:</strong> {test.postCondition}
                              </div>
                              <div className="col-md-6 mb-2">
                                <strong>Created By:</strong> {test.createdBy} <br />
                                <strong>Date of Creation:</strong> {test.dateOfCreation} <br />
                                <strong>Reviewed By:</strong> {test.reviewedBy} <br />
                                <strong>Date of Review:</strong> {test.dateOfReview}
                              </div>
                            </div>
                            <hr />
                            <h6>Execution Details</h6>
                            <div className="row">
                              <div className="col-md-6 mb-2">
                                <strong>Test Steps:</strong> {test.testSteps} <br />
                                <strong>Test Data/Inputs:</strong> {test.testData} <br />
                              </div>
                              <div className="col-md-6 mb-2">
                                <strong>Expected Outcome:</strong> {test.expectedOutcome} <br />
                                <strong>Actual Result:</strong> {test.actualResult || 'Not executed yet'} <br />
                                <strong>Status:</strong> {test.status} <br />
                              </div>
                            </div>
                            <hr />
                            <h6>Additional Comments</h6>
                            <div>{test.comments || 'No additional comments'}</div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <NewTestCaseForm
          show={showModal}
          handleClose={handleCloseModal}
          handleSave={handleSave}
          selectedTestCase={selectedTestCase}
        />
      )}
    </div>
  );
};

export default TestCasesList;
