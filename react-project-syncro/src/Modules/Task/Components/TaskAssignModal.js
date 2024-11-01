import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function TaskAssignModal({ show, handleClose, assignTask }) {
  const [task, setTask] = useState({ title: '', description: '', priority: 'medium', dueDate: '', assignedTo: [] });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
        setUsers(response.data.teamMembers);
      } catch (err) {
        setError('Error fetching team members');
        console.error(err);
      }
    };

    if (projectId) {
      fetchTeamMembers();
    }
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4000/api/project/${projectId}/tasks`, task);
      assignTask(response.data.task);
      handleClose();
    } catch (err) {
      console.error('Error submitting task:', err);
      setSubmitError('Failed to submit task. Please try again.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submitError && <div className="text-danger">{submitError}</div>}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe the task"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Assign To</Form.Label>
              <Form.Control
                as="select"
                multiple
                onChange={(e) => setTask({ ...task, assignedTo: [...e.target.selectedOptions].map((o) => o.value) })}
                required
              >
                {users.length === 0 ? (
                  <option disabled>No members available</option>
                ) : (
                  users.map((user) => (
                    <option key={user._id} value={user.email}> {/* Use user email instead of ID */}
                      {user.name} - {user.role} ({user.email}) {/* Show user email */}
                    </option>
                  ))
                )}
              </Form.Control>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md={6}>
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} md={6}>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Col className="text-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Assign Task
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
  
}

export default TaskAssignModal;
