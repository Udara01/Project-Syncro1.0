/*import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Alert } from 'react-bootstrap';

function LeaderTaskDashboard() {
  const { projectId } = useParams(); // Get the projectId from the URL
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/tasks`);
        setTasks(response.data.tasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [projectId]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (tasks.length === 0) {
    return <div>No tasks available for this project.</div>;
  }

  return (
    <div>
      <h3>Task Progress for Project {projectId}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Comments</th>
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
                {task.assignedTo.map(user => (
                  <div key={user._id}>{user.email}</div>
                ))}
              </td>
              <td>{task.comment || 'No comments'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default LeaderTaskDashboard;*/

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Alert, Badge, Button } from 'react-bootstrap';

import TaskAssignModal from './TaskAssignModal'; // Import your modal component
import '../../../styles/TaskDashboard.css'

function LeaderTaskDashboard() {
  const { projectId } = useParams(); // Get the projectId from the URL
  const [tasks, setTasks] = useState([]); // Declare both tasks and setTasks for state management
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state


  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="status-badge pending">Pending</Badge>;
      case 'in-progress':
        return <Badge className="status-badge in-progress">In Progress</Badge>;
      case 'completed':
        return <Badge className="status-badge completed">Completed</Badge>;
      default:
        return status;
    }
  };

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
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/tasks`);
        setTasks(response.data.tasks); // Dynamically update tasks from API response
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [projectId]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="task-dashboard">
      {/* Button to create a new task should always be visible */}
      <div className="d-flex justify-content-end mb-3">
        <Button className="btn-primary" onClick={toggleModal}>
          Create New Task
        </Button>
      </div>

      {/* Render the TaskAssignModal component and pass the required props */}
      <TaskAssignModal
        show={modalVisible}
        handleClose={toggleModal}
        assignTask={handleTaskAssignment}
      />

      {/* Display either the task table or a message if no tasks are available */}
      {tasks.length > 0 ? (
        <>
          <h3>Project Task Overview</h3>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.priority}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{renderStatusBadge(task.status)}</td>
                  <td>
                    {task.assignedTo.map(user => (
                      <div key={user._id}>{user.email}</div>
                    ))}
                  </td>
                  <td>{task.comment || 'No comments'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <div className="no-tasks-message">
          <h5>No tasks available for this project.</h5>
        </div>
      )}
    </div>
  );
}

export default LeaderTaskDashboard;
