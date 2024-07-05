//This main content use for the Landing page
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './MainContentLanding.css';

const MainContentLanding = () => {
  return (
    <Container fluid className="main-content text-center py-5">
      <h1>Welcome to the Syncro</h1>
      <Row className="mt-4">
        <Col md={6} className="text-left">
          <p>Welcome to Project Manager, your one-stop solution for seamless project and remote work management. Our platform is designed to help you and your team collaborate efficiently, manage tasks effectively, and achieve your project goals effortlessly.</p>
          <p>Whether you're working from the office or remotely, Project Manager offers a comprehensive suite of tools to keep your projects on track. From task management and milestone tracking to real-time chat and document management, we've got you covered.</p>
          <p>Get started now and experience a new level of productivity and collaboration.</p>
          <Button variant="dark" className="mt-3">Signing</Button>
        </Col>
        <Col md={6}>
          <video controls className="img-fluid">
            <source src="IntroductionSystem.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContentLanding;

