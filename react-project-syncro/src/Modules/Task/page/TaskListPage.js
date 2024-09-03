import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../src/styles/TaskList.css';
import { useParams } from 'react-router-dom';

const TaskListPage = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { projectId } = useParams();

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} show={true} projectId={projectId} />

        <div className="d-flex flex-grow-1 content">
          <div className="container mt-5">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Tasks You Have to Complete</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  {tasks.map(task => (
                    <div key={task._id} className="col-md-6 mb-4">
                      <div className="card shadow">
                        <div className="card-body">
                          <h5 className="card-title">Document Uploaded</h5>
                          <p className="card-text">{task.name}</p>
                          <p className="card-text">Due: {task.dueDate}</p>
                          <p className="card-text">Status: {task.completed ? 'Completed' : task.confirmed ? 'Confirmed' : 'Pending'}</p>
                          {!task.confirmed && (
                            <button className="btn btn-primary" onClick={() => confirmTask(task._id)}>
                              Confirm
                            </button>
                          )}
                          {task.confirmed && !task.completed && (
                            <button className="btn btn-success" onClick={() => completeTask(task._id)}>
                              Complete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TaskListPage;
