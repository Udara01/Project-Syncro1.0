import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer'
import QuickAccess from './QuickAccess';
import RecentActivities from './RecentActivities';
import TimeTracking from './TimeTracking';
import UpcomingEvents from './UpcomingEvents';
import ProjectsOverviewPie from './ProjectsOverview'; // Import the pie chart component

import { UserContext } from '../../../contexts/UserContext'; // get user context name and email



import { Container, Row, Col } from 'react-bootstrap';



const DashboardHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { user } = useContext(UserContext); // Adding user context



  //Meeting part
  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    // Fetch meetings from your API
    const fetchMeetings = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/meetings');
            setMeetings(response.data);
        } catch (error) {
            console.error('Error fetching meetings:', error);
        }
    };

    fetchMeetings();
}, []);



  return (
    <div className="App">
      <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />


        <div className="content">
        <Row className="mb-4">
        <h1>Welcome to Syncro {user?.username}</h1>
                <Col md={6}><ProjectsOverviewPie /></Col> 
                <Col md={3}><QuickAccess /></Col>
                <Col md={3}><RecentActivities /></Col>
            </Row>
            <Row>
                <Col md={8}><TimeTracking /></Col>
                <Col md={4}><UpcomingEvents allMeetings={meetings} /></Col> {/* Pass meetings as prop  */}
            </Row>

        </div>
        </div>
      <Footer />
    </div>
  );
};

export default DashboardHome;

