import React from 'react';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import ProjectNavbar from '../../../Components/Layouts/ProjectNavbar';

import ProjectOverview from '../Components/ProjectOverview';
import CustomCalendar from '../Components/Calendar';
import TaskList from '../Components/TaskList';
import Timeline from '../Components/Timeline';
import FileUpload from '../Components/FileUpload';
import TeamMembers from '../Components/TeamMembers';
import '../../../styles/ProjectDashboars.css'



function dashboard() {
  return (
    <div className="Home">
      <Navbarmain />
      <ProjectNavbar />
      <div className="content" style={{ marginLeft: '250px', marginTop: '56px', padding: '20px' }}>
        {/* Main content goes here */}
        <h1>PROJECT 01</h1>
      </div>

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

export default dashboard;
