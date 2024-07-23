import React, {useContext } from "react";
import { FaHome, FaTasks } from 'react-icons/fa';
import { LuUsers } from 'react-icons/lu';
import { FiLayers } from 'react-icons/fi';
import { IoIosSettings } from 'react-icons/io';
import { TbBrandZoom } from "react-icons/tb";
import { Nav } from 'react-bootstrap';
import '../../styles/Sidebar.css';
import { UserContext } from "../../contexts/UserContext"; // Import user context
import { useParams } from 'react-router-dom';


const Sidebar = ({ isSidebarOpen, show, projectId }) => {


  const { user } = useContext(UserContext);
  const params = useParams();
  const actualProjectId = projectId || params.projectId; // Get projectId from params if not provided via props

  return (
 <Nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-sticky">
        <div className="user-section">
          <div className="user-avatar bg-primary rounded-circle">
            <span className="text-white fs-2">{user?.username?.charAt(0)}</span>
          </div>
          <div className="user-info">
            <span className="user-name">{user?.username}</span>
            <br></br>
            <span className="user-email">{user?.useremail}</span>
          </div>
        </div>
        <hr />
        <Nav.Item className="nav-item">
          <Nav.Link href="/home" className="d-flex align-items-center">
            <FaHome className="me-2" />
            <span>Home</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="nav-item">
          <Nav.Link href="/task" className="d-flex align-items-center">
            <FaTasks className="me-2" />
            <span>Tasks</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="nav-item">
          <Nav.Link href="/team" className="d-flex align-items-center">
            <LuUsers className="me-2" />
            <span>Teams</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="nav-item">
          <Nav.Link href="/projects" className="d-flex align-items-center">
            <FiLayers className="me-2" />
            <span>Projects</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="nav-item">
          <Nav.Link href="/setting" className="d-flex align-items-center">
            <IoIosSettings className="me-2" />
            <span>Settings</span>
          </Nav.Link>
        </Nav.Item>
        {/* Add the meeting link if the projectId is available */}
        {actualProjectId && (
          <Nav.Item className="nav-item">
            <Nav.Link href={`/projects/${projectId}/create-meeting`} className="d-flex align-items-center">
              <TbBrandZoom className="me-2" />
              <span>Meeting</span>
            </Nav.Link>
          </Nav.Item>
        )}

        
      </div>
    </Nav>
  );
};
export default Sidebar;
