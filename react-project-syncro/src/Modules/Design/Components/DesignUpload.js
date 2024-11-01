/*import React, { useState, useEffect, useContext } from 'react'; // Make sure to import useEffect
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Table } from 'react-bootstrap';
import axios from 'axios';

import { UserContext } from "../../../contexts/UserContext"; // Import user context

const DesignUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [designs, setDesigns] = useState([]);
  const [commentText, setCommentText] = useState(''); // For new comment
  const { projectId } = useParams();
  const { user } = useContext(UserContext);
  const userEmail = user.useremail;

  const validFormats = ['image/png', 'image/jpeg', 'application/pdf', 'application/x-fig'];
  
  const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && validFormats.includes(selectedFile.type)) {
          setFile(selectedFile);
          setError('');
      } else {
          setFile(null);
          setError('Invalid file format. Acceptable formats: PNG, JPG, PDF, FIG.');
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file) {
          setError('Please select a valid file before uploading.');
          return;
      }
      const formData = new FormData();
      formData.append('design', file);
      formData.append('userEmail', userEmail); // Add user email

      try {
          await axios.post(`http://localhost:4000/api/projects/${projectId}/designs/upload`, formData);
          setSuccess('File uploaded successfully!');
          setError('');
          loadDesigns();
      } catch (error) {
          setError('Failed to upload file.');
      }
  };
/*
  const loadDesigns = async () => {
      try {
          const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/designs-with-comments`);
          setDesigns(response.data);
      } catch (error) {
          setError('Error fetching designs');
      }
  };*/
  
 /* const loadDesigns = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/designs-with-comments`);
        const userDesigns = response.data.filter(design => design.uploaderEmail === userEmail);
        setDesigns(userDesigns);
    } catch (error) {
        setError('Error fetching designs');
    }
};

  const handleCommentSubmit = async (designId) => {
      try {
          await axios.post(`http://localhost:4000/api/projects/${projectId}/designs/${designId}/comment`, {
              userEmail,
              commentText,
          });
          setCommentText('');
          loadDesigns(); // Refresh designs after new comment
      } catch (error) {
          setError('Error adding comment');
      }
  };

  useEffect(() => {
      loadDesigns();
  }, [projectId]);

  return (
      <Container>
          <Row className="mt-4">
              <Col md={{ span: 6, offset: 3 }}>
                  <h2>Upload Design</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}
                  <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="designUpload">
                          <Form.Label>Select Design File (PNG, JPG, PDF, FIG)</Form.Label>
                          <Form.Control type="file" onChange={handleFileChange} />
                      </Form.Group>
                      <Button variant="primary" type="submit" className="mt-3">Upload</Button>
                  </Form>
              </Col>
          </Row>

          <Row className="mt-4">
              <Col md={{ span: 8, offset: 2 }}>
                  <h3>Uploaded Designs</h3>
                  <Table striped bordered hover>
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Design Name</th>
                              <th>Date Uploaded</th>
                              <th>Comments</th>
                              <th>Download</th>
                          </tr>
                      </thead>
                      <tbody>
                          {designs.map((design, index) => (
                              <tr key={design._id}>
                                  <td>{index + 1}</td>
                                  <td>{design.fileName}</td>
                                  <td>{new Date(design.uploadDate).toLocaleString()}</td>
                                  <td>
                                      <ul>
                                          {design.comments.map((comment, idx) => (
                                              <li key={idx}>
                                                  <strong>{comment.userEmail}</strong>: {comment.commentText}
                                              </li>
                                          ))}
                                      </ul>
                                      <Form.Group controlId="commentText">
                                          <Form.Control
                                              type="text"
                                              placeholder="Add a comment"
                                              value={commentText}
                                              onChange={(e) => setCommentText(e.target.value)}
                                          />
                                          <Button variant="secondary" onClick={() => handleCommentSubmit(design._id)} className="mt-2">Comment</Button>
                                      </Form.Group>
                                  </td>
                                  <td><a href={`/api/designs/download/${design._id}`} download>Download</a></td>
                              </tr>
                          ))}
                      </tbody>
                  </Table>
              </Col>
          </Row>
      </Container>
  );
};

export default DesignUpload;*/

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Table, Card } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from "../../../contexts/UserContext";

const DesignUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [designs, setDesigns] = useState([]);
  const [commentText, setCommentText] = useState('');
  const { projectId } = useParams();
  const { user } = useContext(UserContext);
  const userEmail = user.useremail;

  const validFormats = ['image/png', 'image/jpeg', 'application/pdf', 'application/x-fig'];

  const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && validFormats.includes(selectedFile.type)) {
          setFile(selectedFile);
          setError('');
      } else {
          setFile(null);
          setError('Invalid file format. Acceptable formats: PNG, JPG, PDF, FIG.');
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file) {
          setError('Please select a valid file before uploading.');
          return;
      }
      const formData = new FormData();
      formData.append('design', file);
      formData.append('userEmail', userEmail);

      try {
          await axios.post(`http://localhost:4000/api/projects/${projectId}/designs/upload`, formData);
          setSuccess('File uploaded successfully!');
          setError('');
          loadDesigns();
      } catch (error) {
          setError('Failed to upload file.');
      }
  };

  const loadDesigns = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/designs-with-comments`);
        const userDesigns = response.data.filter(design => design.uploaderEmail === userEmail);
        setDesigns(userDesigns);
    } catch (error) {
        setError('Error fetching designs');
    }
  };

  const handleCommentSubmit = async (designId) => {
      try {
          await axios.post(`http://localhost:4000/api/projects/${projectId}/designs/${designId}/comment`, {
              userEmail,
              commentText,
          });
          setCommentText('');
          loadDesigns(); // Refresh designs after new comment
      } catch (error) {
          setError('Error adding comment');
      }
  };

  useEffect(() => {
      loadDesigns();
  }, [projectId]);

  return (
      <Container className="mt-5">
          {/* Upload Form */}
          <Row>
              <Col md={{ span: 8, offset: 2 }}>
                  <Card className="p-4 shadow-sm">
                      <Card.Title className="text-center mb-4">Upload Design</Card.Title>
                      {error && <Alert variant="danger">{error}</Alert>}
                      {success && <Alert variant="success">{success}</Alert>}
                      <Form onSubmit={handleSubmit}>
                          <Form.Group controlId="designUpload">
                              <Form.Label>Select Design File (PNG, JPG, PDF, FIG)</Form.Label>
                              <Form.Control type="file" onChange={handleFileChange} />
                          </Form.Group>
                          <Button variant="primary" type="submit" className="mt-3">Upload</Button>
                      </Form>
                  </Card>
              </Col>
          </Row>

          {/* Display Designs */}
          <Row className="mt-5">
              <Col md={{ span: 8, offset: 2 }}>
                  <Card className="p-4 shadow-sm">
                      <Card.Title className="text-center mb-4">Uploaded Designs</Card.Title>
                      <Table striped bordered hover responsive>
                          <thead>
                              <tr>
                                  <th>#</th>
                                  <th>Design Name</th>
                                  <th>Date Uploaded</th>
                                  <th>Comments</th>
                                  <th>Download</th>
                              </tr>
                          </thead>
                          <tbody>
                              {designs.map((design, index) => (
                                  <tr key={design._id}>
                                      <td>{index + 1}</td>
                                      <td>{design.fileName}</td>
                                      <td>{new Date(design.uploadDate).toLocaleString()}</td>
                                      <td>
                                          <ul>
                                              {design.comments.map((comment, idx) => (
                                                  <li key={idx}>
                                                      <strong>{comment.userEmail}</strong>: {comment.commentText}
                                                  </li>
                                              ))}
                                          </ul>
                                          <Form.Group controlId="commentText">
                                              <Form.Control
                                                  type="text"
                                                  placeholder="Add a comment"
                                                  value={commentText}
                                                  onChange={(e) => setCommentText(e.target.value)}
                                              />
                                              <Button variant="secondary" onClick={() => handleCommentSubmit(design._id)} className="mt-2">Comment</Button>
                                          </Form.Group>
                                      </td>
                                      <td>
                                          <a href={`http://localhost:4000/api/designs/download/${design._id}`} download>
                                              <Button variant="link">Download</Button>
                                          </a>
                                      </td>
                                  </tr>
                              ))}          
                          </tbody>
                      </Table>
                  </Card>
              </Col>
          </Row>
      </Container>
  );
};

export default DesignUpload;
