import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Table, Form, Button, Card, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Team from '../../../contexts/Team';  // Import the Team component
import "../../../styles/TaskDashboard.css";  // Add custom styling here if needed

const TaskDashboard = () => {
  const { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    description: "",
    assignees: [],
    priority: "",
    status: ""
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "assignees") {
      setTaskDetails({ ...taskDetails, [name]: value.split(',').map(assignee => assignee.trim()) });
    } else {
      setTaskDetails({ ...taskDetails, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(taskDetails);
    handleClose();
  };

  const createTask = async (taskData) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/tasks/${projectId}/create`, taskData);
      console.log('Task created:', response.data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleAssigneesChange = (selectedAssignees) => {
    setTaskDetails(prevDetails => ({
      ...prevDetails,
      assignees: selectedAssignees
    }));
  };

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
              <span>Task Details</span>
              <Button variant="light" onClick={handleShow}>
                Create Task
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Assignees</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" style={{ height: "100px" }}></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header className="bg-success text-white">
              Sub Tasks
            </Card.Header>
            <Card.Body>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Assignees</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" style={{ height: "100px" }}></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header className="bg-success text-white">
              Comments & Attachments
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div style={{ height: "150px", backgroundColor: "#F8D7DA" }}></div>
                  <div className="text-center mt-2">Comments</div>
                </Col>
                <Col md={6}>
                  <div style={{ height: "150px", backgroundColor: "#F8D7DA" }}></div>
                  <div className="text-center mt-2">Attachments</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header className="bg-success text-white">Due Dates</Card.Header>
            <Card.Body>
              <div style={{ backgroundColor: "#F8D7DA", padding: "15px" }}>
                <Form.Group>
                  <Form.Control type="date" />
                  <Form.Control type="time" className="mt-2" />
                </Form.Group>
              </div>
            </Card.Body>
          </Card>

          <Button variant="outline-secondary" className="w-100">
            <i className="bi bi-gear-fill"></i> Notification Setting
          </Button>
        </Col>
      </Row>

      {/* Create Task Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={taskDetails.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTaskAssignees" className="mt-3">
              <Form.Label>Assignees</Form.Label>
              <Team onSelectMember={handleAssigneesChange} /> {/* Use Team component */}
            </Form.Group>

            <Form.Group controlId="formTaskPriority" className="mt-3">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={taskDetails.priority}
                onChange={handleInputChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTaskStatus" className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={taskDetails.status}
                onChange={handleInputChange}
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaskDashboard;



