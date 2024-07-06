//this component use for the landing page

import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './HeaderLanding.css';

const HeaderLanding = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Navbar.Brand href="#">
        <img src="logo.png" alt="Syncro Logo" width="40" className="d-inline-block align-top" style={{ marginLeft: '20px' }} /> {/* Replace with your logo */}
        Syncro
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/signin">
            <Button variant="outline-dark" className="mr-2">Sign In</Button>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Button variant="primary">Sign Up</Button>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderLanding;


