/*import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Table, Button, Form, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UserContext } from "../../../contexts/UserContext"; // Import user context

import axios from 'axios';

const DesignDownload = ( ) => {
    const [designs, setDesigns] = useState([]);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { projectId } = useParams();

    const { user } = useContext(UserContext); // Get the user details from context
    const userEmail = user.useremail; // Extract user email from context

    useEffect(() => {
        loadDesigns();
    }, []);

    // Load designs from the server
    const loadDesigns = async () => {
      if (!projectId) {
          setError('Project ID is missing.');
          return;
      }
      try {
          const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/designs-with-comments`);
          setDesigns(response.data);
      } catch (error) {
          console.error('Error fetching designs', error);
          setError('Error fetching designs');
      }
  };

    // Submit a comment for a design
    const submitComment = async (designId) => {
      if (!comment) {
          setError('Comment cannot be empty');
          return;
      }
      try {
          await axios.post(`http://localhost:4000/api/projects/${projectId}/designs/${designId}/comment`, { 
              commentText: comment, 
              userEmail // Send userEmail instead of userId 
          });
          setSuccess('Comment added successfully');
          setComment('');
          loadDesigns(); // Reload designs to show the new comment
      } catch (error) {
          console.error('Error submitting comment', error);
          setError('Error submitting comment');
      }
  };
  

    return (
        <Container>
            <Row className="mt-4">
                <Col>
                    <h2>Download Designs and Leave Comments</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Design Name</th>
                                <th>Date Uploaded</th>
                                <th>Download</th>
                                <th>Comments</th>
                                <th>Add Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {designs.map((design, index) => (
                                <tr key={design._id}>
                                    <td>{index + 1}</td>
                                    <td>{design.fileName}</td>
                                    <td>{new Date(design.uploadDate).toLocaleString()}</td>
                                    <td>
                                        <a href={`/api/designs/download/${design._id}`} download>
                                            Download
                                        </a>
                                    </td>
                                    <td>
                                        {design.comments.length > 0 ? (
                                            <ul>
                                                {design.comments.map((comment, idx) => (
                                                    <li key={idx}>
                                                      <strong>{comment.userEmail}</strong>
                                                        {comment.commentText} - {new Date(comment.date).toLocaleString()}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            'No comments yet'
                                        )}
                                    </td>
                                    <td>
                                        <Form>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Add your comment"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Button
                                                variant="primary"
                                                onClick={() => submitComment(design._id)}
                                                className="mt-2"
                                            >
                                                Submit Comment
                                            </Button>
                                        </Form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default DesignDownload;
*/



import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UserContext } from "../../../contexts/UserContext"; // Import user context
import axios from 'axios';

const DesignDownload = () => {
    const [designs, setDesigns] = useState([]);
    const [commentsVisibility, setCommentsVisibility] = useState({}); // Track visibility for each design
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { projectId } = useParams();
    const { user } = useContext(UserContext); // Get the user details from context
    const userEmail = user.useremail; // Extract user email from context
    const [commentTexts, setCommentTexts] = useState({}); // Track comment text for each design

    useEffect(() => {
        loadDesigns();
    }, []);

    // Load designs from the server
    const loadDesigns = async () => {
        if (!projectId) {
            setError('Project ID is missing.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/designs-with-comments`);
            setDesigns(response.data);
        } catch (error) {
            console.error('Error fetching designs', error);
            setError('Error fetching designs');
        }
    };

    // Toggle comment visibility for a specific design
    const toggleCommentsVisibility = (designId) => {
        setCommentsVisibility((prev) => ({
            ...prev,
            [designId]: !prev[designId], // Toggle visibility
        }));
    };

    // Submit a comment for a design
    const submitComment = async (designId) => {
        const commentText = commentTexts[designId]; // Get comment text for specific design
        if (!commentText) {
            setError('Comment cannot be empty');
            return;
        }
        try {
            await axios.post(`http://localhost:4000/api/projects/${projectId}/designs/${designId}/comment`, { 
                commentText, 
                userEmail // Send userEmail instead of userId 
            });
            setSuccess('Comment added successfully');
            setCommentTexts((prev) => ({ ...prev, [designId]: '' })); // Reset the specific comment text
            loadDesigns(); // Reload designs to show the new comment
        } catch (error) {
            console.error('Error submitting comment', error);
            setError('Error submitting comment');
        }
    };

    return (
        <Container>
            <Row className="mt-4">
                <Col>
                    <h2>Download Designs and Leave Comments</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Row>
                        {designs.map((design, index) => (
                            <Col md={6} lg={4} key={design._id} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{design.fileName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            Uploaded on {new Date(design.uploadDate).toLocaleString()}
                                        </Card.Subtitle>
                                        <Card.Text>
                                        <Button
                                            variant="primary"
                                            href={`http://localhost:4000/api/designs/download/${design._id}`}
                                            download
                                        >
                                            Download Design
                                        </Button>
                                        </Card.Text>

                                        {/* Scroll Down Button */}
                                        <Button
                                            variant="link"
                                            onClick={() => toggleCommentsVisibility(design._id)}
                                        >
                                            {commentsVisibility[design._id] ? 'Hide Comments' : 'Show Comments'}
                                        </Button>

                                        {/* Comments Section */}
                                        {commentsVisibility[design._id] && (
                                            <div>
                                                <strong>Comments:</strong>
                                                {design.comments.length > 0 ? (
                                                    <ul>
                                                        {design.comments.map((comment, idx) => (
                                                            <li key={idx}>
                                                                <strong>{comment.userEmail}</strong>: {comment.commentText} - {new Date(comment.date).toLocaleString()}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No comments yet</p>
                                                )}
                                            </div>
                                        )}

                                        {/* Comment Input */}
                                        <Form>
                                            <Form.Group controlId={`comment${design._id}`}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Add your comment"
                                                    value={commentTexts[design._id] || ''}
                                                    onChange={(e) => setCommentTexts((prev) => ({ ...prev, [design._id]: e.target.value }))}
                                                />
                                            </Form.Group>
                                            <Button
                                                variant="secondary"
                                                onClick={() => submitComment(design._id)}
                                                className="mt-2"
                                            >
                                                Submit Comment
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default DesignDownload;
