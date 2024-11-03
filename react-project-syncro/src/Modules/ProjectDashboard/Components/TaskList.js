/*import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom'; // Use NavLink for navigation
import { Alert } from 'react-bootstrap';
import { UserContext } from "../../../contexts/UserContext"; // Import user context

const TaskList = () => {
  const { projectId } = useParams(); // Get the projectId from the URL
  const [tasks, setTasks] = useState([]); // State to store fetched tasks
  const [error, setError] = useState(null); // For error handling

  const { user } = useContext(UserContext); // Get the user details from context
  const userEmail = user.useremail; // Extract user email from context

  // Fetch tasks assigned to the user for the specific project
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/tasks/user/${userEmail}`);
        setTasks(response.data.tasks); // Set tasks in state
        console.log(userEmail)
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [projectId, userEmail]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>; // Show an error if fetching fails
  }

  if (tasks.length === 0) {
    return <div>No tasks assigned to you for this project.</div>; // If no tasks, show a message
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Your Assigned Tasks</h5>
        {tasks.map((task, index) => (
          <div key={index} className="task-item mb-3">
            <h6>{task.title}</h6> {/* Task title *//*}
            <p>{task.description}</p> {/* Task description *//*}
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p> {/* Due date *//*}
          </div>
        ))}

        {/* Add a simple text-based link to view all tasks *//*}
        <NavLink to={`/projects/${projectId}/userTask`} className="text-primary">
          View All Tasks for This Project
        </NavLink>
      </div>
    </div>
  );
};

export default TaskList;
*/


import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { UserContext } from "../../../contexts/UserContext";
import '../../../styles/TaskList.css';

const TaskList = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);
  const userEmail = user.useremail;

  // Helper function to calculate the remaining time for a due date
  const calculateRemainingTime = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - now;

    if (timeDiff <= 0) return "Time's up!";

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Set initial countdown for each task
  const [countdowns, setCountdowns] = useState({});

  // Fetch tasks assigned to the user for the specific project
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

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prevCountdowns) =>
        tasks.reduce((acc, task) => {
          acc[task._id] = calculateRemainingTime(task.dueDate);
          return acc;
        }, {})
      );
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [tasks]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (tasks.length === 0) {
    return <div className="no-tasks">No tasks assigned to you for this project.</div>;
  }

  return (
    <div className="card task-list-card shadow-sm">
      <div className="card-header text-white task-list-header">
        <h5 className="mb-0">Your Assigned Tasks</h5>
      </div>
      <div className="card-body">
        {tasks.map((task) => (
          <div key={task._id} className="task-item mb-4">
            <h6 className="task-title">{task.title}</h6>
            <p className="task-desc">{task.description}</p>
            <p className="task-due">
              Due Date: <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </p>
            <p className="task-remaining">
              Time Remaining: <span>{countdowns[task._id]}</span>
            </p>
          </div>
        ))}

          <NavLink
            to={`/projects/${projectId}/userTask`}
            className="view-all-link"
            style={{ marginLeft: "10px",
              marginRight: "70px"
            }} // Adjust the value as needed
          >
            View All Your Tasks
          </NavLink>

      </div>
    </div>
  );
};

export default TaskList;

