import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../styles/Footer.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-5">
      <Container>
        <Row className="mb-4">
          <Col md={3}>
            <img src="/Assets/logo.png" alt="Syncro Logo" className="footer-logo mb-3" />
            <br></br><br></br>
            <h4>Subscribe to Newsletter</h4>
            <Form className="d-flex align-items-center">
              <Form.Control type="email" placeholder="you@example.com" className="me-2" />
              <Button type="submit" variant="primary">Submit</Button>
            </Form>
          </Col>
          <Col md={3}>
            <h4>Privacy Policy</h4>
            <ul className="list-unstyled">
              <li><a href="#overview">Overview</a></li>
              <li><a href="#data-usage">Data Usage</a></li>
              <li><a href="#cookies">Cookies</a></li>
              <li><a href="#data-protection">Data Protection</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h4>Terms of Service</h4>
            <ul className="list-unstyled">
              <li><a href="#introduction">Introduction</a></li>
              <li><a href="#user-responsibilities">User Responsibilities</a></li>
              <li><a href="#account-management">Account Management</a></li>
              <li><a href="#prohibited-activities">Prohibited Activities</a></li>
            </ul>
          </Col>
          <Col md={3}>
          <h4>Contact Us</h4>
          <ul className="list-unstyled">
              <li><FaEnvelope className="me-2" /> <a href="mailto:syncrosoftware1.0@gmail.com">syncrosoftware1.0@gmail.com         </a></li>
              <li><FaPhone className="me-2" /> <a href="tel:+9477567890">+94-77-567-890</a></li>
              <li><FaMapMarkerAlt className="me-2" /> Colombo 7, Sri Lanka</li>
            </ul>
          </Col>
        </Row>
        <div className="footer-bottom text-center mt-4">
          <p>&copy; 2024 Syncro - All Rights Reserved</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;



