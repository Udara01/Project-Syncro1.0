import React, { useContext, useEffect, useState } from 'react';
import { MembersContext } from '../../../contexts/MembersContext';
import { useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/UserCalendar.css';

const localizer = momentLocalizer(moment);

const UserCalendar = () => {
  const { userId } = useParams();
  const { members } = useContext(MembersContext);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); // State for the selected task
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const fetchTasksByUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/tasks/user/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadUserAndTasks = async () => {
      const selectedUser = members.find((member) => member._id === userId);
      setUser(selectedUser);

      if (selectedUser) {
        const userTasks = await fetchTasksByUser(userId);
        setTasks(userTasks);
      }
    };

    loadUserAndTasks();
  }, [userId, members]);

  if (!user) return <p>Loading user data...</p>;

  const events = tasks.map((task) => ({
    title: `${task.title} - ${task.status}`,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    allDay: true,
    status: task.status,
    ...task // Pass the whole task object to access details later
  }));

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad';

    if (event.status === 'completed') {
      backgroundColor = '#6c757d';
    } else if (event.status === 'in-progress') {
      backgroundColor = '#ffc107';
    } else if (event.status === 'pending') {
      backgroundColor = '#28a745';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
        padding: '5px',
      },
    };
  };

  // Open modal with selected task details
  const handleTaskClick = (event) => {
    setSelectedTask(event);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="text-center mb-4">{user.username}'s Task Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          tooltipAccessor={(event) => `${event.title} - Due: ${moment(event.start).format('LL')}`}
          onSelectEvent={handleTaskClick} // Trigger modal on task click
          messages={{
            next: 'Next',
            previous: 'Prev',
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            agenda: 'Agenda',
          }}
        />
      </div>

      {/* Modal for Task Details */} 
      {selectedTask && (
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedTask.title} - Task Details</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="taskTitle">Title</label>
                    <input type="text" className="form-control" id="taskTitle" value={selectedTask.title} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="taskStatus">Status</label>
                    <input type="text" className="form-control" id="taskStatus" value={selectedTask.status} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="taskDueDate">Due Date</label>
                    <input type="text" className="form-control" id="taskDueDate" value={moment(selectedTask.dueDate).format('LL')} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="taskDescription">Description</label>
                    <textarea className="form-control" id="taskDescription" value={selectedTask.description || 'No description available'} readOnly />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCalendar;
