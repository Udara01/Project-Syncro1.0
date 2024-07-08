import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaTasks } from 'react-icons/fa';
import { LuUsers } from "react-icons/lu";
import { FiLayers } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";

const Sidebar = ({ show }) => {
  return (
    <div className={`sidebar ${show ? 'show' : ''}`} style={{ width: '280px', height: '100vh', backgroundColor: '#f8f9fa', position: 'fixed', left: 0, top: 0, transition: 'transform 0.3s ease-in-out', transform: show ? 'translateX(0)' : 'translateX(-100%)' }}>
      <a href="/home" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">Syncro</span>
      </a>
      <hr />

      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">Profile part</span>
      </a><br></br><br></br>
      <hr />


      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active d-flex align-items-center">
            <FaHome className="me-2" />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-dark d-flex align-items-center">
            <FaTasks  className="me-2" />
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
