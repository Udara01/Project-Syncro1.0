import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-5">
      <Container>
        <Row className="mb-4">
          <Col md={6}>
            <h3>Subscribe to Newsletter</h3>
            <Form inline>
              <Form.Control type="email" placeholder="you@example.com" className="mr-2" />
              <Button type="submit" variant="primary">Submit</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <h4>Privacy Policy</h4>
            <ul className="list-unstyled">
              <li>Overview</li>
              <li>Data Usage</li>
              <li>Cookies</li>
              <li>Data Protection</li>
            </ul>
          </Col>
          <Col md={4}>
            <h4>Terms of Service</h4>
            <ul className="list-unstyled">
              <li>Introduction</li>
              <li>User Responsibilities</li>
              <li>Account Management</li>
              <li>Prohibited Activities</li>
            </ul>
          </Col>
          <Col md={4}>
            <h4>Contact Us</h4>
            <p>Syncro@projectmanagement.com</p>
            <p>+94-77-567-890</p>
            <p>Colombo 7, Sri Lanka</p>
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

