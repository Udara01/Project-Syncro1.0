/*import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Alert } from 'react-bootstrap';

function TaskList() {
  const { projectId, userEmail } = useParams(); // Get the projectId from the URL
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/tasks/user/${userEmail}`);
        setTasks(response.data.tasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [projectId, userEmail]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (tasks.length === 0) {
    return <div>No tasks assigned to you for this project.</div>;
  }

  return (
    <div>
      <h3>Your Assigned Tasks</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TaskList;*/


import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Alert, Button, Form } from 'react-bootstrap';

import TaskAssignModal from './TaskAssignModal'; // Import your modal component
import '../../../styles/TaskList.css'; // Add updated styles here
import { UserContext } from '../../../contexts/UserContext';

function TaskList() {
  const { projectId} = useParams(); // Get the projectId and userEmail from the URL
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); // For tracking which task the user is updating
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('pending');

  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const { user } = useContext(UserContext);

  const userEmail = user.useremail;

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Function to handle task assignment
  const handleTaskAssignment = (newTask) => {
    setTasks([...tasks, newTask]); // Add the new task to the tasks list
    console.log('Task Assigned:', newTask); // For debugging
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/tasks/user/${userEmail}`);
        setTasks(response.data.tasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleTaskUpdate = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/project/${projectId}/tasks/${taskId}`, {
        status,
        comment,
      });
      // Update the task in the UI
      setTasks(tasks.map(task => task._id === taskId ? response.data.task : task));
      setSelectedTask(null); // Close the form after update
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update the task.');
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (tasks.length === 0) {
    return <div>No tasks assigned to you for this project.</div>;
  }

  return (
    <div className="task-list">
  {/* Render the TaskAssignModal component and pass the required props */}
  <TaskAssignModal
    show={modalVisible}
    handleClose={toggleModal}
    assignTask={handleTaskAssignment}
  />

  <h3>Your Assigned Tasks</h3>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Priority</th>
        <th>Due Date</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task) => (
        <tr key={task._id}>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.priority}</td>
          <td>{new Date(task.dueDate).toLocaleDateString()}</td>
          <td>{task.status}</td>
          <td>
            {selectedTask === task._id ? (
              <Form>
                <Form.Group controlId="statusSelect">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="commentInput">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Add your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <Button className="btn-success btn-sm" onClick={() => handleTaskUpdate(task._id)}>
                  Save
                </Button>
                <Button className="btn-secondary btn-sm" onClick={() => setSelectedTask(null)}>
                  Cancel
                </Button>
              </Form>
            ) : (
              <Button className="btn-primary btn-sm" onClick={() => setSelectedTask(task._id)}>
                Mark as Completed / Add Comment
              </Button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>

  );
}

export default TaskList;
