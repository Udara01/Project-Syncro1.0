/*import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Table, Form, Button, ListGroup, Container } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { UserContext } from "../../../contexts/UserContext";
import '../../../styles/RequirementUploadPage.css';


const AddRequirement = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState("Normal");
  const [requirements, setRequirements] = useState([]); 
  const [commentText, setCommentText] = useState(""); 

  const { projectId } = useParams();
  const { user } = useContext(UserContext);
  const userEmail = user.useremail;

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handlePriorityChange = (event) => setPriority(event.target.value);

  useEffect(() => {
    if (projectId) {
      fetchRequirements();
    }
  }, [projectId]);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/requirements`);
      setRequirements(response.data);
    } catch (error) {
      console.error("Error fetching requirements", error);
    }
  };

  const handleUpload = async () => {
    if (!projectId) {
      console.error("Error: Project ID is missing");
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    formData.append("description", description);
    formData.append("projectId", projectId);
    formData.append("priority", priority);
    formData.append("createdBy", userEmail);

    try {
      await axios.post(`http://localhost:4000/api/projects/${projectId}/requirements/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (typeof onSuccess === "function") {
        onSuccess();
      }
      setFiles([]);
      setDescription('');
      setPriority("Normal");
      fetchRequirements();
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };
  const handleCommentChange = (requirementId, text) => {
    setCommentText(prevState => ({ ...prevState, [requirementId]: text }));
  };
  const handleCommentSubmit = async (requirementId) => {
    try {
      await axios.post(`http://localhost:4000/api/projects/${projectId}/requirements/${requirementId}/comments`, {
        userEmail,
        commentText: commentText[requirementId],
      });
      setCommentText(prevState => ({ ...prevState, [requirementId]: "" }));
      fetchRequirements();
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container fluid>
      <Card className="file-upload-card mb-4">
        <Card.Body>
          <Form>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {isDragActive ? <p>Drop the files here...</p> : <p>Drag and drop files here, or click to select files</p>}
            </div>
            <Form.Group controlId="formDescription" className="mb-3 mt-3">
              <Form.Label>Add Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={handleDescriptionChange} />
            </Form.Group>
            <Form.Group controlId="formPriority" className="mb-3">
              <Form.Label>Select Priority</Form.Label>
              <Form.Control as="select" value={priority} onChange={handlePriorityChange}>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </Form.Control>
            </Form.Group>
            {files.length > 0 && (
              <ListGroup className="mb-3">
                {files.map((file, index) => (
                  <ListGroup.Item key={index}>{file.name}</ListGroup.Item>
                ))}
              </ListGroup>
            )}
            <Button variant="primary" onClick={handleUpload} disabled={!projectId}>Upload</Button>
            <Button variant="secondary" onClick={() => setFiles([])} className="ms-2">Cancel</Button>
          </Form>
        </Card.Body>
      </Card>

      <Row className="mt-5">
        <Col>
          <Card className="p-4 shadow-sm">
            <Card.Title className="text-center mb-4">Uploaded Requirement Documents</Card.Title>
            <div style={{ overflowX: 'auto' }}>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>File Name</th>
                    <th>Priority</th>
                    <th>Description</th>
                    <th>Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.map((requirement, index) => (
                    <tr key={requirement._id}>
                      <td>{index + 1}</td>
                      <td>{requirement.fileName.join(", ")}</td>
                      <td>{requirement.priority}</td>
                      <td>{requirement.description}</td>
                      <td>
                        
                        <ul className="comment-list">
                          {requirement.comments.map((comment, i) => (
                            <li key={i} className="mb-1">
                              <strong>{comment.userEmail}</strong>: {comment.commentText}
                            </li>
                          ))}
                        </ul>
                        <Form>
                          <Form.Control
                            type="text"
                            placeholder="Add a comment"
                            value={commentText[requirement._id] || ""}
                            onChange={(e) => handleCommentChange(requirement._id, e.target.value)}
                            className="mt-2"
                          />
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleCommentSubmit(requirement._id)}
                            className="mt-1"
                          >
                            Submit
                          </Button>
                        </Form>
                      </td>
                      <td>
                        {requirement.fileName.map((file, i) => (
                          <div key={i} className="mb-2">
                            <Button
                              variant="success"
                              href={`http://localhost:4000/api/projects/${projectId}/requirements/download/${file}`}
                              download
                            >
                              Download the Document
                            </Button>
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRequirement; */


import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Table, Form, Button, ListGroup, Container } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { UserContext } from "../../../contexts/UserContext";
import '../../../styles/RequirementUploadPage.css';

const AddRequirement = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState("Normal");
  const [requirements, setRequirements] = useState([]);
  const [commentText, setCommentText] = useState({});

  const { projectId } = useParams();
  const { user } = useContext(UserContext);
  const userEmail = user.useremail;

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  useEffect(() => {
    if (projectId) {
      fetchRequirements();
    }
  }, [projectId]);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/requirements`);
      setRequirements(response.data);
    } catch (error) {
      console.error("Error fetching requirements", error);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    formData.append("description", description);
    formData.append("projectId", projectId);
    formData.append("priority", priority);
    formData.append("createdBy", userEmail);

    try {
      await axios.post(`http://localhost:4000/api/projects/${projectId}/requirements/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess?.();
      setFiles([]);
      setDescription('');
      setPriority("Normal");
      fetchRequirements();
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  const handleCommentSubmit = async (requirementId) => {
    try {
      await axios.post(`http://localhost:4000/api/projects/${projectId}/requirements/${requirementId}/comments`, {
        userEmail,
        commentText: commentText[requirementId],
      });
      setCommentText(prev => ({ ...prev, [requirementId]: "" }));
      fetchRequirements();
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container fluid>
      <Card className="file-upload-card mb-4 shadow-lg p-4">
        <Card.Body>
          <Form>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-primary">Drop the files here...</p>
              ) : (
                <p className="text-muted">Drag and drop files here, or click to select files</p>
              )}
            </div>
            <Form.Group controlId="formDescription" className="mb-3 mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPriority" className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Control as="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </Form.Control>
            </Form.Group>
            {files.length > 0 && (
              <ListGroup className="file-list mb-3">
                {files.map((file, index) => (
                  <ListGroup.Item key={index} className="file-list-item">{file.name}</ListGroup.Item>
                ))}
              </ListGroup>
            )}
            <Button variant="primary" onClick={handleUpload} disabled={!projectId}>Upload</Button>
            <Button variant="outline-secondary" onClick={() => setFiles([])} className="ms-2">Cancel</Button>
          </Form>
        </Card.Body>
      </Card>

      <Row className="mt-5">
        <Col>
          <Card className="p-4 shadow-sm">
            <Card.Title className="text-center mb-4">Uploaded Requirements</Card.Title>
            <div className="table-responsive">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>File Name</th>
                    <th>Priority</th>
                    <th>Description</th>
                    <th>Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.map((req, index) => (
                    <tr key={req._id}>
                      <td>{index + 1}</td>
                      <td>{req.fileName.join(", ")}</td>
                      <td>{req.priority}</td>
                      <td>{req.description}</td>
                      <td>
                      <div className="comment-section">
                          {req.comments.map((comment, i) => (
                            <div key={i} className="comment">
                              <div className="comment-avatar">
                                {comment.userEmail[0].toUpperCase()}
                              </div>
                              <div className="comment-content">
                                <div className="comment-header">
                                  <span className="comment-user">{comment.userEmail}</span>
                                  <span className="comment-timestamp">{new Date(comment.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="comment-text">{comment.commentText}</p>
                              </div>
                            </div>
                          ))}
                          <Form className="comment-form">
                            <Form.Control
                              type="text"
                              placeholder="Add a comment"
                              value={commentText[req._id] || ""}
                              onChange={(e) => setCommentText(prev => ({ ...prev, [req._id]: e.target.value }))}
                              className="mt-2"
                            />
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleCommentSubmit(req._id)}
                              className="mt-2"style={{ marginBottom: '29px' }}
                            >
                              Submit
                            </Button>
                          </Form>
                        </div>
                      </td>
                      <td>
                        {req.fileName.map((file, i) => (
                          <Button
                            key={i}
                            variant="success"
                            href={`http://localhost:4000/api/projects/${projectId}/requirements/download/${file}`}
                            download
                            className="mb-2"
                          >
                            Download
                          </Button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRequirement;

