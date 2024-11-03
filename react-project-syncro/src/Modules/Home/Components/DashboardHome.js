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
  const hours = new Date().getHours();
  const greeting = hours < 12 ? "Good morning" : hours < 18 ? "Good afternoon" : "Good evening";


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
        <h1>{greeting}, {user?.username}! 👋 Welcome to Syncro</h1>
        <p>We’re glad to see you. Let’s make today productive!</p>

                <Col md={4}><ProjectsOverviewPie /></Col> 
                <Col md={3} style={{ marginTop: '10px' }}><QuickAccess /></Col>
                <Col md={5} style={{ marginTop: '7px' }}><RecentActivities /></Col>
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

