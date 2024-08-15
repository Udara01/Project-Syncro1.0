import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { UserContext } from '../../../contexts/UserContext';
import { useParams} from 'react-router-dom';


const localizer = momentLocalizer(moment);

const CustomCalendar = ( ) => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useContext(UserContext);
  const { projectId } = useParams();

  // Fetch meetings for the current user and project when the component mounts
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/meetings');
        const userMeetings = response.data.filter(meeting =>
          meeting.members.includes(user.useremail) && meeting.projectId === projectId
        );
        const formattedMeetings = userMeetings.map(meeting => ({
          title: meeting.topic,
          start: new Date(meeting.start_time),
          end: new Date(new Date(meeting.start_time).getTime() + meeting.duration * 60000), // Convert duration to milliseconds
          ...meeting // Spread the meeting object to include all details
        }));
        setEvents(formattedMeetings);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };

    fetchMeetings();
  }, [user, projectId]);

  // Handle event click to show modal with meeting details
  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Handle closing of the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="card" style={{ width: '700px', height: '600px', margin: '0 auto' }}>
      <div className="card-body">
        <div style={{ width: '600px', height: '330px', margin: '0 auto' }}>
          <h5 className="card-title">Upcoming Events</h5>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            onSelectEvent={handleSelectEvent}
          />
        </div>
        {selectedEvent && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: '10px' }}>
                <strong>Time:</strong> {new Date(selectedEvent.start).toLocaleString()}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Duration:</strong> {selectedEvent.duration} minutes
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Message:</strong> {selectedEvent.message}
              </div>
              <div>
                <strong>Link:</strong> <a href={selectedEvent.join_url} target="_blank" rel="noopener noreferrer">{selectedEvent.join_url}</a>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={() => window.open(selectedEvent.join_url, '_blank', 'noopener,noreferrer')}>
                Join Meeting
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CustomCalendar;
