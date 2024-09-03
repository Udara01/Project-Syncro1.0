// TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TaskList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/api/tasks?userId=${userId}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [userId]);

  const confirmTask = async (taskId) => {
    try {
      await axios.post(`/api/tasks/${taskId}/confirm`);
      alert('Task confirmed');
      setTasks(tasks.map(task => task._id === taskId ? { ...task, confirmed: true } : task));
    } catch (error) {
      console.error('Error confirming task:', error);
    }
  };

  const completeTask = async (taskId) => {
    try {
      await axios.post(`/api/tasks/${taskId}/complete`);
      alert('Task marked as complete');
      setTasks(tasks.map(task => task._id === taskId ? { ...task, completed: true } : task));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <div>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Status: {task.completed ? 'Completed' : task.confirmed ? 'Confirmed' : 'Pending'}</p>
            {!task.confirmed && <button onClick={() => confirmTask(task._id)}>Confirm</button>}
            {task.confirmed && !task.completed && <button onClick={() => completeTask(task._id)}>Complete</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
