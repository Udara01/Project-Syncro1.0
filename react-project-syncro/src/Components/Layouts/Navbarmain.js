import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBell, FaSearch } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";

import Sidebar from "./SidebarHome";
//import '../../styles/Navbarmain.css';

function Navbarmain() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSearch = () => {
    alert('Search icon clicked');
  };

  return (
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
            <NavDropdown.Item href="#profile">John John</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Log out</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="#settings"><IoSettingsOutline style={{ fontSize: '22px', marginRight: '40px', marginLeft: '20px' }} /></Nav.Link>

        </Nav>
      </Navbar.Collapse>

      {/* Render Sidebar conditionally based on showSidebar state */}
      {showSidebar && <Sidebar />}
    </Navbar>
  );
}

export default Navbarmain;
