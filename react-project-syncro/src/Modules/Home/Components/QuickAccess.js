import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaProjectDiagram, FaUsers, FaTasks, FaFileAlt, FaBell } from 'react-icons/fa'; // Updated FaBell for Notifications
import '../../../styles/QuickAccess.css'; // Import the CSS file for custom styles

const QuickAccess = () => {
    const location = useLocation(); // To get the current route path

    return (
        <Card className="quick-access-card mb-4 shadow-sm rounded">
            <Card.Body>
                <Card.Title className="text-center mb-3">Quick Access</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item className={`quick-access-item ${location.pathname === '/projects' ? 'active' : ''}`}>
                        <Link to="/projects" className="text-decoration-none d-flex align-items-center">
                            <FaProjectDiagram className="me-2 quick-access-icon" /> My Projects
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className={`quick-access-item ${location.pathname === '/teams' ? 'active' : ''}`}>
                        <Link to="/teams" className="text-decoration-none d-flex align-items-center">
                            <FaUsers className="me-2 quick-access-icon" /> My Teams
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className={`quick-access-item ${location.pathname === '/tasks' ? 'active' : ''}`}>
                        <Link to="/tasks" className="text-decoration-none d-flex align-items-center">
                            <FaTasks className="me-2 quick-access-icon" /> My Tasks
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className={`quick-access-item ${location.pathname === '/files' ? 'active' : ''}`}>
                        <Link to="/files" className="text-decoration-none d-flex align-items-center">
                            <FaFileAlt className="me-2 quick-access-icon" /> My Files
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className={`quick-access-item ${location.pathname === '/notification' ? 'active' : ''}`}>
                        <Link to="/notification" className="text-decoration-none d-flex align-items-center">
                            <FaBell className="me-2 quick-access-icon" /> Notifications
                        </Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default QuickAccess;
