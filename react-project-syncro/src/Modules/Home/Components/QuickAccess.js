import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaProjectDiagram, FaUsers, FaTasks, FaFileAlt } from 'react-icons/fa'; // Import icons

const QuickAccess = () => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <div style={{ width: '200px', height: '330px', margin: '0 auto' }}>
                    <Card.Title>Quick Access</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Link to="/projects" className="text-decoration-none">
                                <FaProjectDiagram style={{ marginRight: '0px' }} /> My Projects
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to="/teams" className="text-decoration-none">
                                <FaUsers style={{ marginRight: '8px' }} /> My Teams
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to="/tasks" className="text-decoration-none">
                                <FaTasks style={{ marginRight: '8px' }} /> My Tasks
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to="/files" className="text-decoration-none">
                                <FaFileAlt style={{ marginRight: '8px' }} /> My Files
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </Card.Body>
        </Card>
    );
}

export default QuickAccess;

