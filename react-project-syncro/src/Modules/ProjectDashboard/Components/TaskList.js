import { useState, useEffect, useContext } from 'react';
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
            <h6>{task.title}</h6> {/* Task title */}
            <p>{task.description}</p> {/* Task description */}
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p> {/* Due date */}
          </div>
        ))}

        {/* Add a simple text-based link to view all tasks */}
        <NavLink to={`/projects/${projectId}/tasks`} className="text-primary">
          View All Tasks for This Project
        </NavLink>
      </div>
    </div>
  );
};

export default TaskList;
