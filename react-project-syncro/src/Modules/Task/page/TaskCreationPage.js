import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import TaskCreationForm from '../Pages/Components/TaskCreationForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/TaskCreation.css';
import { useParams } from 'react-router-dom';

const TaskCreationPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { projectId } = useParams();

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
                <h4 className="mb-0">Create Task</h4>
              </div>
              <div className="card-body">
                <TaskCreationForm projectId={projectId} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TaskCreationPage;
