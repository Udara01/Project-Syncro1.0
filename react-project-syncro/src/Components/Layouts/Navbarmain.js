import React, { useState,useContext } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBell, FaSearch } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from "./SidebarHome";


import { UserContext } from "../../contexts/UserContext";//import user name and email to the navbar

function Navbarmain() {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSearch = () => {
    alert('Search icon clicked');
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
  const { user } = useContext(UserContext);//adding user context

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ padding: '10px 20px' }}>
        <Nav.Link onClick={toggleSidebar}><TiThMenu style={{ fontSize: '20px', marginRight: '20px' }} /></Nav.Link>
        <Navbar.Brand href="#home">Syncro</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Form className="mx-auto" style={{ width: '600px' }}>
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
                  top: '50%',
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
          <Nav className="align-items-center" style={{ marginRight: '20px' }}>

            <Nav.Link href="#notifications"><FaBell style={{ fontSize: '20px', marginRight: '20px' }} /></Nav.Link>

            <NavDropdown
              title={<AiOutlineUser style={{ fontSize: '24px', }} />}
              id="basic-nav-dropdown"
              alignRight
            >
              <NavDropdown.Item href="#profile">{user?.username}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#settings"><IoSettingsOutline style={{ fontSize: '22px', marginRight: '40px', marginLeft: '20px' }} /></Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Render Sidebar conditionally based on showSidebar state */}
      <Sidebar show={showSidebar} />
    </>
  );
}

export default Navbarmain;
