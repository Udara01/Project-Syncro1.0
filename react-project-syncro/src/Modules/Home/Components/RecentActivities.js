import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const RecentActivities = () => {
    return (
        <Card className="mb-4">
            <Card.Body>
            <div style={{ width: '200px', height: '330px', margin: '0 auto' }}>
                <Card.Title>Recent Activities</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <strong>Document Uploaded</strong><br />
                        <small>1 hour ago by Emily Davis</small>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Document Uploaded</strong><br />
                        <small>1 hour ago by Emily Davis</small>
                    </ListGroup.Item>
                </ListGroup>
                </div>
            </Card.Body>
        </Card>
    );
}

export default RecentActivities;
