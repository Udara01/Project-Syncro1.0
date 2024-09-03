import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import { UserContext } from '../../../contexts/UserContext';
import '../../../styles/SettingsPage.css'; // Import custom CSS file

const SettingsPage = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [preferences, setPreferences] = useState({ theme: 'light', notifications: true });
  const [privacySettings, setPrivacySettings] = useState({ profileVisibility: 'public', dataSharing: true });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch user settings from the backend
    axios.get('/api/settings/user', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
    .then(response => {
      setUserInfo({ name: response.data.name, email: response.data.email, phone: response.data.phone });
      setPreferences(response.data.preferences);
      setPrivacySettings(response.data.privacySettings);
    })
    .catch(err => console.error(err));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInfoUpdate = (e) => {
    e.preventDefault();
    axios.put('/api/settings/updateInfo', userInfo, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
    .then(response => setMessage(response.data.message))
    .catch(err => setError(err.response.data.message));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    axios.put('/api/settings/changePassword', passwords, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
    .then(response => setMessage(response.data.message))
    .catch(err => setError(err.response.data.message));
  };

  const handlePreferencesUpdate = (e) => {
    e.preventDefault();
    axios.put('/api/settings/updatePreferences', preferences, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
    .then(response => setMessage(response.data.message))
    .catch(err => setError(err.response.data.message));
  };

  const handlePrivacySettingsUpdate = (e) => {
    e.preventDefault();
    axios.put('/api/settings/updatePrivacy', privacySettings, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
    .then(response => setMessage(response.data.message))
    .catch(err => setError(err.response.data.message));
  };

  const handleAccountDeactivation = () => {
    axios.post('/api/settings/deactivateAccount', {}, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
    .then(response => {
      setMessage(response.data.message);
      // Optionally, redirect the user after account deactivation
    })
    .catch(err => setError(err.response.data.message));
  };

  return (
    <div className="SettingsPage">
      <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} show={true} />

        <div className="content">
          <Container fluid>
            <h2 className="mb-4">User Settings</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mb-4">
              <Col md={6} xs={12}>
                {/* Update User Information */}
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5>Update Information</h5>
                    <Form onSubmit={handleInfoUpdate}>
                      <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={userInfo.name}
                          onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={userInfo.email}
                          onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group controlId="formPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={userInfo.phone}
                          onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">Update Information</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} xs={12}>
                {/* Change Password */}
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5>Change Password</h5>
                    <Form onSubmit={handlePasswordChange}>
                      <Form.Group controlId="formOldPassword">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                          type="password"
                          onChange={e => setPasswords({ ...passwords, oldPassword: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group controlId="formNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">Change Password</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6} xs={12}>
                {/* Update Preferences */}
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5>Preferences</h5>
                    <Form onSubmit={handlePreferencesUpdate}>
                      <Form.Group controlId="formTheme">
                        <Form.Label>Theme</Form.Label>
                        <Form.Control
                          as="select"
                          value={preferences.theme}
                          onChange={e => setPreferences({ ...preferences, theme: e.target.value })}
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="formNotifications">
                        <Form.Check
                          type="checkbox"
                          label="Enable Notifications"
                          checked={preferences.notifications}
                          onChange={e => setPreferences({ ...preferences, notifications: e.target.checked })}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">Update Preferences</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} xs={12}>
                {/* Privacy Settings */}
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5>Privacy Settings</h5>
                    <Form onSubmit={handlePrivacySettingsUpdate}>
                      <Form.Group controlId="formProfileVisibility">
                        <Form.Label>Profile Visibility</Form.Label>
                        <Form.Control
                          as="select"
                          value={privacySettings.profileVisibility}
                          onChange={e => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="formDataSharing">
                        <Form.Check
                          type="checkbox"
                          label="Allow Data Sharing"
                          checked={privacySettings.dataSharing}
                          onChange={e => setPrivacySettings({ ...privacySettings, dataSharing: e.target.checked })}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">Update Privacy Settings</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={12}>
                {/* Account Deactivation */}
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5>Account Deactivation</h5>
                    <p>If you deactivate your account, you will no longer be able to access your data or use this platform. This action cannot be undone.</p>
                    <Button variant="danger" onClick={handleAccountDeactivation}>Deactivate Account</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
