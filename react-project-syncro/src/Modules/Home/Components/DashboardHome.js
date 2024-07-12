import React, { useState,useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Footer from '../../../Components/Layouts/Footer';
import QuickAccess from './QuickAccess';
import RecentActivities from './RecentActivities';
import TimeTracking from './TimeTracking';
import UpcomingEvents from './UpcomingEvents';
import ProjectsOverviewPie from './ProjectsOverview'; // Import the pie chart component


import { UserContext } from '../../../contexts/UserContext'; // get user contest name and email


const Dashboard = () => {

    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };
    const { user } = useContext(UserContext);//adding user context
  
    return (
        <Container fluid>
        <Navbarmain toggleSidebar={toggleSidebar} />

        <div
        className="content"
        style={{
        paddingLeft: showSidebar ? '280px' : '20px',
        marginTop: '6px',
        padding: '20px',
        marginBottom: '5px', // Adjusted to ensure space for the footer
        }}>
            <h1>Welcome to Syncro {user?.username}</h1>
      </div>
            <Row className="mb-4">
                <Col md={6}><ProjectsOverviewPie /></Col> {/* Use the pie chart component */}
                <Col md={3}><QuickAccess /></Col>
                <Col md={3}><RecentActivities /></Col>
            </Row>
            <Row>
                <Col md={8}><TimeTracking /></Col>
                <Col md={4}><UpcomingEvents /></Col>
            </Row>

            <Footer />
        </Container>
    );
}

export default Dashboard;
