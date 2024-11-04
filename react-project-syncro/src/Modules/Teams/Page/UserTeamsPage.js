import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer'
import { UserContext } from '../../../contexts/UserContext'; // get user context name and email
import UserTeams from '../Components/UserTeams';



import { Container, Row, Col } from 'react-bootstrap';



const UserTeamsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { user } = useContext(UserContext); // Adding user context





  return (
    <div className="App">
      <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
        
        <div className="content">
        <Row className="mb-8">
            <UserTeams />

        </Row>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default UserTeamsPage;
