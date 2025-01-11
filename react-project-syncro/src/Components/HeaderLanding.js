//this component use for the landing page

import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/HeaderLanding.css'
import { color } from 'chart.js/helpers';



const HeaderLanding = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Navbar.Brand href="/" style={{ color: '#007bff' }}>
        Syncro
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/login">
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



const MainContentLanding = () => {
  return (
    <Container fluid className="main-content text-center py-5">
      <h1>Welcome to the Syncro</h1>
      <Row className="mt-4">
        <Col md={6} className="text-left">
          <p>Welcome to the Syncro, your one-stop solution for seamless project and remote work management. Our platform is designed to help you and your team collaborate efficiently, manage tasks effectively, and achieve your project goals effortlessly.</p>
          <p>Whether you're working from the office or remotely, Project Manager offers a comprehensive suite of tools to keep your projects on track. From task management and milestone tracking to real-time chat and document management, we've got you covered.</p>
          <p>Get started now and experience a new level of productivity and collaboration.</p>
          <LinkContainer to="/login">
          <Button variant="dark" className="mt-3">Signing</Button>
          </LinkContainer>
        </Col>
        <Col md={6}>
          <video controls className="img-fluid">
            <source src="/Assets/IntroductionSystem.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Col>
      </Row>
    </Container>
  );
};



export { HeaderLanding, MainContentLanding };


