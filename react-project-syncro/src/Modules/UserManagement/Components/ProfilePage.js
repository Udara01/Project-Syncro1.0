// ProfilePage.js
/*import React, { useContext, useEffect, useState } from 'react';
import { MembersContext } from '../../../contexts/MembersContext';
import { useParams } from 'react-router-dom';
import UserCalendar from './UserCalendar';
import UserProfile from './UserProfile';
import UserProjects from './UserProjects';
import UserPerformance from './UserPerformance';
import { Container, Row, Col, Card} from 'react-bootstrap';

const ProfilePage = () => {
  const { userId } = useParams();
  const { members } = useContext(MembersContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const selectedUser = members.find((member) => member._id === userId);
    setUser(selectedUser);
  }, [userId, members]);

  if (!user) return <p>User not found.</p>;

  return (
    <Container>
      <h2>{user.username}'s Profile</h2>
      <p>{user.role}</p>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <UserProfile />
            </Col>
            <Col md={6}>
              <UserCalendar />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
          <UserProjects />
          <UserPerformance />

    </Container>
  );
};

export default ProfilePage; */


import React, { useContext, useEffect, useState } from 'react';
import { MembersContext } from '../../../contexts/MembersContext';
import { useParams } from 'react-router-dom';
import UserCalendar from './UserCalendar';
import UserProfile from './UserProfile';
import UserProjects from './UserProjects';
import UserPerformance from './UserPerformance';
import { Container, Row, Col, Card} from 'react-bootstrap';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';

  const ProfilePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const { userId } = useParams();
    const { members } = useContext(MembersContext);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const selectedUser = members.find((member) => member._id === userId);
      setUser(selectedUser);
    }, [userId, members]);
  
    if (!user) return <p>User not found.</p>;


  return (
    <div className="Home">
      <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} show={true} />

        <div className="content" style={{ marginLeft: isSidebarOpen ? '0px' : '-10px', marginTop: '56px', padding: '20px' }}>
          <div className="container">
            {/* Page Header */}
        
            <Container>
      <h2>{user.username}'s Profile</h2>
      <p>{user.role}</p>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <UserProfile />
            </Col>
            <Col md={6}>
              <UserCalendar />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
          <UserProjects />
          <UserPerformance />

    </Container>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
