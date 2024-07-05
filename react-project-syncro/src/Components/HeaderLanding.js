//this component use for the landing page

import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './HeaderLanding.css';

const HeaderLanding = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Navbar.Brand href="#">
        <img src="logo.png" alt="Syncro Logo" width="40" className="d-inline-block align-top" style={{ marginLeft:'20px' }}/> {/* Replace with your logo */}
        Syncro
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Button variant="outline-dark" className="mr-2">Signing</Button>
          <Button variant="primary">Signup</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderLanding;
