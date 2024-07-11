import React from 'react';
import { Card } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const UpcomingEvents = () => {
    return (
        <Card className="mb-4">
            <Card.Body>
            <div style={{ width: '300px', height: '330px', margin: '0 auto' }}>
                <Card.Title>Upcoming Events</Card.Title>
                <Calendar />
                </div>
            </Card.Body>
        </Card>
    );
}

export default UpcomingEvents;
