import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaTasks } from 'react-icons/fa';
import { LuUsers } from 'react-icons/lu';
import { FiLayers } from 'react-icons/fi';
import { IoIosSettings } from 'react-icons/io';

import { UserContext } from "../../contexts/UserContext"; // Import user context

const Sidebar = ({ show }) => {
  const { user } = useContext(UserContext); // Adding user context

  return (
    <div
      className={`sidebar ${show ? 'show' : ''}`}
      style={{
        width: '280px',
        height: 'calc(100vh - 56px)', // Adjust height to fit the viewport minus navbar height
        backgroundColor: '#f8f9fa',
        position: 'fixed',
        left: 0,
        top: '56px', // Adjust top to position below navbar
        transition: 'transform 0.3s ease-in-out',
        transform: show ? 'translateX(0)' : 'translateX(-100%)',
        zIndex: 1000, // Ensure sidebar is above content
        overflowY: 'auto', // Enable scrolling if sidebar height exceeds viewport
        paddingBottom: '100px', // Ensure space at the bottom for the footer
      }}
    >
      <div className="d-flex flex-column align-items-center mb-3 mt-3">
        <div className="user-avatar bg-primary rounded-circle d-flex justify-content-center align-items-center mb-3" style={{ width: '80px', height: '80px' }}>
          <span className="text-white fs-2">{user?.username?.charAt(0)}</span>
        </div>
        <div className="text-center">
          <span className="fs-5 fw-bold">{user?.username}</span>
          <br />
          <span className="text-muted">{user?.useremail}</span>
        </div>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="/home" className="nav-link active d-flex align-items-center">
            <FaHome className="me-2" />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-dark d-flex align-items-center">
            <FaTasks className="me-2" />
            <span>Tasks</span>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-dark d-flex align-items-center">
            <LuUsers className="me-2" />
            <span>Teams</span>
          </a>
        </li>
        <li>
          <a href="/" className="nav-link link-dark d-flex align-items-center">
            <FiLayers className="me-2" />
            <span>Projects</span>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-dark d-flex align-items-center">
            <IoIosSettings className="me-2" />
            <span>Setting</span>
          </a>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default Sidebar;
