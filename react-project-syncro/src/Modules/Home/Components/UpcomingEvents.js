// src/Modules/Home/Components/UpcomingEvents.js
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../styles/UpcomingEvents.css'
import { UserContext } from '../../../contexts/UserContext';

const UpcomingEvents = ({ allMeetings = [] }) => { // Set default prop value
    const { user } = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        if (user) {
            const userMeetings = allMeetings.filter(meeting =>
                meeting.members && meeting.members.includes(user.useremail)
            );
            setMeetings(userMeetings);
        }
    }, [user, allMeetings]);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const meetingDates = meetings.map(meeting => new Date(meeting.start_time).toDateString());
            if (meetingDates.includes(date.toDateString())) {
                return <div className="meeting-indicator"></div>;
            }
        }
        return null;
    };

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    const meetingsOnSelectedDate = meetings.filter(
        meeting => new Date(meeting.start_time).toDateString() === selectedDate?.toDateString()
    );


    const openMeetingUrl = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };


    return (
        <Card className="mb-4">
            <Card.Body>
                <div style={{ width: '300px', margin: '0 auto' }}>
                    <Card.Title>Upcoming Events</Card.Title>
                    <Calendar 
                        onChange={onDateChange} 
                        tileContent={tileContent}
                    />
                    {selectedDate && (
                        <div>
                            <h6>Meetings on {selectedDate.toDateString()}:</h6>
                            {meetingsOnSelectedDate.length === 0 ? (
                                <p>No meetings scheduled.</p>
                            ) : (
                                meetingsOnSelectedDate.map((meeting, index) => (
                                    <div key={index} className="meeting-details">
                                        <p><strong>Topic:</strong> {meeting.topic}</p>
                                        <p><strong>Time:</strong> {new Date(meeting.start_time).toLocaleTimeString()}</p>
                                        <p><strong>Duration:</strong> {meeting.duration} minutes</p>
                                        <Button variant="primary" onClick={() => openMeetingUrl(meeting.join_url)}>
                                        Join Meeting
                                         </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

UpcomingEvents.propTypes = {
    allMeetings: PropTypes.arrayOf(PropTypes.shape({
        topic: PropTypes.string.isRequired,
        start_time: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        members: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
};

export default UpcomingEvents;
