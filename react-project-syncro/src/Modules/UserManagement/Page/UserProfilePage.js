import React, { useContext, useEffect, useState } from 'react';
import { MembersContext } from '../../../contexts/MembersContext';
import { useParams } from 'react-router-dom';
import UserCalendar from '../Components/UserCalendar';
import UserProfile from '../Components/UserProfile';
import UserProjects from '../Components/UserProjects';
import UserPerformance from '../Components/UserPerformance';
import { Container, Row, Col, Card} from 'react-bootstrap';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import UpdateUserForm from '../Components/UpdateUserForm';

  const UserProfilePage = () => {
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
            <UpdateUserForm />
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

export default UserProfilePage;