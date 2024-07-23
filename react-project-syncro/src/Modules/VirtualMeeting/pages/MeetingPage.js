import React, { useState, useEffect } from 'react';
import MeetingForm from '../Components/MeetingForm';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/VirtualMeeting.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MeetingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [meetings, setMeetings] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get('http://localhost:4000/accessToken');
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.error('Error fetching access token:', error);
        window.location.href = 'http://localhost:4000/authorize';
      }
    };

    fetchAccessToken();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/meetings');
      setMeetings(response.data || []); // Ensure response.data is an array
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleCreateMeeting = async (formData) => {
    if (!accessToken) return false;

    try {
      const response = await axios.post('http://localhost:4000/api/createMeeting', { ...formData, projectId });
      setMeetings([...meetings, response.data]);
      return true;
    } catch (error) {
      if (error.response && error.response.data.code === 124) {
        // Access token expired, refresh it
        try {
          const tokenResponse = await axios.get('http://localhost:4000/accessToken');
          setAccessToken(tokenResponse.data.accessToken);

          const retryResponse = await axios.post('http://localhost:4000/api/createMeeting', { ...formData, projectId });
          setMeetings([...meetings, retryResponse.data]);
          return true;
        } catch (retryError) {
          console.error('Error creating meeting after token refresh:', retryError);
          return false;
        }
      } else {
        console.error('Error creating meeting:', error);
        return false;
      }
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} show={true} projectId={projectId} />

        <div className="d-flex flex-grow-1 content">
          <div className="container-vm mt-5">
            <div className="card shadow custom-width">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Zoom Meeting Scheduler</h4>
              </div>
              <div className="card-body">
                <MeetingForm onSubmit={handleCreateMeeting} projectId={projectId} />
                <Link to={`/meetings`} className="btn btn-primary mt-3">View Meetings</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MeetingPage;
