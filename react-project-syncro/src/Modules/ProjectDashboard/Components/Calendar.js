import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { UserContext } from '../../../contexts/UserContext';
import { useParams } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const CustomCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useContext(UserContext);
  const { projectId } = useParams();
  const userEmail = user.useremail;

  // Fetch meetings and tasks for the current user and project
  useEffect(() => {
    const fetchMeetingsAndTasks = async () => {
      try {
        // Fetch meetings
        const meetingResponse = await axios.get('http://localhost:4000/api/meetings');
        const userMeetings = meetingResponse.data.filter(
          meeting => meeting.members.includes(userEmail) && meeting.projectId._id === projectId
        );

        // Format meetings for the calendar
        const formattedMeetings = userMeetings.map(meeting => ({
          title: meeting.topic,
          start: new Date(meeting.start_time),
          end: new Date(new Date(meeting.start_time).getTime() + meeting.duration * 60000),
          type: 'meeting', // Tag to distinguish meeting events
          ...meeting
        }));

        // Fetch tasks
        const taskResponse = await axios.get(`http://localhost:4000/api/project/${projectId}/tasks/user/${userEmail}`);
        const userTasks = taskResponse.data.tasks;

        // Format tasks for the calendar
        const formattedTasks = userTasks.map(task => ({
          title: task.title,
          start: new Date(task.dueDate),
          end: new Date(task.dueDate),
          type: 'task', // Tag to distinguish task events
          ...task
        }));

        // Combine meetings and tasks into a single events array
        setEvents([...formattedMeetings, ...formattedTasks]);
      } catch (error) {
        console.error('Error fetching meetings or tasks:', error);
      }
    };

    fetchMeetingsAndTasks();
  }, [userEmail, projectId]);

  // Handle event click to show modal with event details
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
    <div className="card" style={{ width: '700px', height: '800px', margin: '0 auto' }}>
      <div className="card-body">
        <h5 className="card-title">Upcoming Events</h5>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          selectable
          onSelectEvent={handleSelectEvent}
        />
        {selectedEvent && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedEvent.type === 'meeting' ? (
                <>
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
                    <strong>Link:</strong>{' '}
                    <a href={selectedEvent.join_url} target="_blank" rel="noopener noreferrer">
                      {selectedEvent.join_url}
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Description:</strong> {selectedEvent.description}
                  </div>
                  <div>
                    <strong>Due Date:</strong> {new Date(selectedEvent.start).toLocaleDateString()}
                  </div>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              {selectedEvent.type === 'meeting' && (
                <Button
                  variant="primary"
                  onClick={() => window.open(selectedEvent.join_url, '_blank', 'noopener,noreferrer')}
                >
                  Join Meeting
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CustomCalendar;

