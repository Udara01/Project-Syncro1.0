//import React from 'react';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import ProjectNavbar from '../../../Components/Layouts/ProjectNavbar';

import ProjectOverview from '../Components/ProjectOverview';
import CustomCalendar from '../Components/Calendar';
import TaskList from '../Components/TaskList';
import Timeline from '../Components/Timeline';
import FileUpload from '../Components/FileUpload';
import TeamMembers from '../Components/TeamMembers';
import '../../../styles/ProjectDashboars.css'

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Dashboard() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log(`Fetching project with ID: ${projectId}`);
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}`);
        setProject(response.data);
      } catch (err) {
        console.error('Error fetching project:', err);
        if (err.response && err.response.status === 403) {
          setError('Access denied');
        } else {
          setError('Error fetching project');
        }
      }
    };

    fetchProject();
  }, [projectId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Home">
      <Navbarmain />
      <ProjectNavbar />
      <div className="content" style={{ marginLeft: '250px', marginTop: '56px', padding: '20px' }}>
        {/* Main content goes here */}
        <h1>PROJECT 01</h1>
      </div>
      <p>Project ID: {projectId}</p>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <ProjectOverview />
            <CustomCalendar />
          </div>
          <div className="col-md-4">
            <TaskList />
          </div>
          <div className="col-md-4">
            <Timeline />
            <TeamMembers />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FileUpload />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;