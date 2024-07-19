import React from 'react';
import MeetingForm from '../Components/MeetingForm';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/VirtualMeeting.css';

const MeetingPage = ({ onSubmit, projectId }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbarmain />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="container-fluid p-3">
          <MeetingForm onSubmit={onSubmit} projectId={projectId} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MeetingPage;
