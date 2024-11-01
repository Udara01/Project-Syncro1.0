import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Badge, Button } from 'react-bootstrap';
import '../../styles/Navbarmain.css';
import { FaBell, FaSearch } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTasks, FaFlag, FaCalendarAlt, FaComments, FaFileAlt, FaProjectDiagram, FaFileUpload } from 'react-icons/fa'; // Import icons

const Navbarmain = ({ toggleSidebar, isSidebarOpen }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const userId = user.userId
  ; 



  useEffect(() => {

//fetching notifications for the corresponding user
    const fetchNotifications = async () => {
      if (user) {
        try {
          const res = await axios.get(`http://localhost:4000/api/notifications/${user.userId}`);
          const sortedNotifications = res.data.sort((a, b) => a.isRead - b.isRead);
          setNotifications(sortedNotifications);
          setUnreadCount(sortedNotifications.filter(notification => !notification.isRead).length);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };

    fetchNotifications();
  }, [user]);

  const handleSearch = () => {
    alert('Search icon clicked');
  };

  const handleLogout = async () => {
    if (!user) {
      console.error('User context is null. Unable to logout.');
      navigate('/');
      return;
    }
  
    try {
      const userId = user.userId;
      console.log(`Logging out user with ID: ${userId}`);
      
      // Log the time out
      await axios.post('http://localhost:4000/api/time-out', { userId }, { withCredentials: true });


      console.log('Time out logged successfully.');
  
      // Clear the session and log out
      await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
      console.log('User logged out successfully.');
  
      // Clear user context and local storage
      setUser(null);
      localStorage.removeItem('user');
  
      navigate('/'); // Redirect to login page
    } catch (err) {
      console.error('Logout error:', err.response?.data || err.message);
    }
  };  


//mark as notification read logic
  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/api/notifications/${id}`, { isRead: true });
      setNotifications(notifications.map(notification =>
        notification._id === id ? { ...notification, isRead: true } : notification
      ));
      setUnreadCount(unreadCount - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  //Add icon front of the notification message based on the notification type
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

  //calculate time for the notification
  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = Math.abs(now - new Date(date)) / 1000;
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = Math.floor(diff % 60);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

 //This is use to when click on the notification navigate to the directory. based on the notification type commonly introduce some navigation path 
  const navigateToLink = (type) => {
    switch(type) {
//notification type meeting navigate path will be /meetings
      case 'meeting':
        navigate('/meetings');
        break;
      case 'file':
        navigate('/file');
        break;
        case 'project':
        navigate('/projects');
        break;
      // Add more cases as needed
      default:
        navigate('/notifications');
        break;
    }
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Nav.Link onClick={toggleSidebar}>
        <TiThMenu style={{ fontSize: '20px', marginRight: '20px', marginLeft: '20px' }} />
      </Nav.Link>
      <Navbar.Brand href="#home" className="ml-2">Syncro</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="mx-auto" style={{ width: '600px', position: 'relative', marginTop: '15px' }}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for something"
              className="mr-sm-2"
              style={{ borderRadius: '20px', paddingRight: '40px' }}
            />
            <InputGroup.Text
              onClick={handleSearch}
              style={{
                position: 'absolute',
                right: '10px',
                top: '30%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Form>
        <Nav className="align-items-center" style={{ marginRight: '20px', marginTop: '10px' }}>
          <NavDropdown
            className="notification-dropdown"
            title={
              <div className="notification-icon-wrapper">
                <FaBell style={{ fontSize: '20px', marginRight: '20px', marginBottom: '1px' }} />
                {unreadCount > 0 && <Badge pill bg="danger" className="notification-badge">{unreadCount}</Badge>}
              </div>
            }
            id="notification-dropdown"
            alignRight
          >
            <NavDropdown.Item header>Notifications</NavDropdown.Item>
            <NavDropdown.Divider />
            {notifications.length === 0 ? (
              <NavDropdown.Item>No notifications</NavDropdown.Item>
            ) : (
              notifications.slice(0, 10).map((notification) => (
                <NavDropdown.Item 
                key={notification._id} 
                className="notification-item"
                
                  >
                  <div className="d-flex align-items-center">
                    {getIcon(notification.type)}<span className="notification-message ml-2" style={{ marginLeft: '5px' }}
                    
//when click on the message navigate to the path                    
                    onClick={() => {
                      markAsRead(notification._id);
                      navigateToLink(notification.type);
                    }}
                    >{notification.message}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-muted ml-2">{getTimeAgo(notification.createdAt)}</span>
                    {!notification.isRead && (
                      <Button
                        onClick={() => markAsRead(notification._id)}
                        variant="outline-primary"
                        size="sm"
                        className="ml-2"
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </NavDropdown.Item>
              ))
            )}
            {notifications.length > 6 && <NavDropdown.Divider />}
            {notifications.length > 6 && (
              <NavDropdown.Item href="/notification">See All Notifications</NavDropdown.Item>
            )}
          </NavDropdown>                
          <NavDropdown
            title={<AiOutlineUser style={{ fontSize: '24px' }} />}
            id="basic-nav-dropdown"
            alignRight
          >
            <NavDropdown.Item href={`/profile/${userId}`}>{user?.username}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/setting">
            <IoSettingsOutline style={{ fontSize: '22px', marginRight: '40px', marginLeft: '20px' }} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbarmain;



