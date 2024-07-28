import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';
import { ListGroup, Button, Container } from 'react-bootstrap';
import { FaTasks, FaFlag, FaCalendarAlt, FaComments, FaFileAlt, FaProjectDiagram, FaFileUpload } from 'react-icons/fa';
import '../../../styles/Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        try {
          const res = await axios.get(`http://localhost:4000/api/notifications/${user.userId}`);
          setNotifications(res.data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };

    fetchNotifications();
  }, [user]);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/api/notifications/${id}`, { isRead: true });
      setNotifications(notifications.map(notification =>
        notification._id === id ? { ...notification, isRead: true } : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'task': return <FaTasks />;
      case 'milestone': return <FaFlag />;
      case 'meeting': return <FaCalendarAlt />;
      case 'chat': return <FaComments />;
      case 'document': return <FaFileAlt />;
      case 'project': return <FaProjectDiagram />;
      case 'file': return <FaFileUpload />;
      default: return null;
    }
  };

  return (
    <Container className="notifications-container mt-5">
      <h2 className="text-center mb-4">Notifications</h2>
      <ListGroup>
        {notifications.map((notification) => (
          <ListGroup.Item key={notification._id} className={`d-flex justify-content-between align-items-center ${notification.isRead ? 'read' : 'unread'}`}>
            <div className="d-flex align-items-center">
              {getIcon(notification.type)}<span className="ml-2">{notification.message}</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-muted mr-3">{notification.timeSince}</span>
              {!notification.isRead && (
                <Button onClick={() => markAsRead(notification._id)} variant="primary" size="sm">Mark as read</Button>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Notifications;

