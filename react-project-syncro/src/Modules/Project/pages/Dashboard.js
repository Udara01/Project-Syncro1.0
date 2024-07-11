import React from 'react';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import ProjectNavbar from '../../../Components/Layouts/ProjectNavbar';


function dashboard() {
  return (
    <div className="Home">
      <Navbarmain />
      <ProjectNavbar />
      <div className="content" style={{ marginLeft: '250px', marginTop: '56px', padding: '20px' }}>
        {/* Main content goes here */}
        <h1>Welcome to the Dashboard</h1>
      </div>
    </div>
  );
}

export default dashboard;
