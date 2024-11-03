import React, { useEffect, useState, useContext, useCallback } from "react";
import { Row, Col, Card, Table, Form, Button, ListGroup, Badge  } from 'react-bootstrap';
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import { useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";




const RequirementList = ({onSuccess}) => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [prioritizedRequirements, setPrioritizedRequirements] = useState([]); // Separate state for prioritized
  const [selectedFile, setSelectedFile] = useState(null);

  const { projectId } = useParams(); // Assume projectId is passed as a route param
  const [priority, setPriority] = useState("Normal");
  const { user } = useContext(UserContext);
  const userEmail = user.useremail;

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  useEffect(() => {
    fetchRequirements();
    fetchPrioritizedRequirements();
  }, [projectId]);




  
  const handlePriorityChange = (event) => {setPriority(event.target.value);};
  const handleDescriptionChange = (event) => setDescription(event.target.value);;


  const [commentText, setCommentText] = useState("");

  //Download Requirement Documents
  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/requirements`);
      setRequirements(response.data);
    } catch (error) {
      console.error("Error fetching requirements", error);
    }
  };

  const handleCommentChange = (requirementId, text) => {
    setCommentText((prevState) => ({ ...prevState, [requirementId]: text }));
  };

  const handleCommentSubmit = async (requirementId) => {
    try {
      await axios.post(`http://localhost:4000/api/projects/${projectId}/requirements/${requirementId}/comments`, {
        userEmail,
        commentText: commentText[requirementId],
      });
      setCommentText((prevState) => ({ ...prevState, [requirementId]: "" }));
      fetchRequirements();
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };



  //Upload Prioritized Project Requirement Document
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
    await axios.post(`http://localhost:4000/api/projects/${projectId}/Prioritized/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    setFiles([]);
    setDescription('');
    setPriority("Normal");
    fetchPrioritizedRequirements();
  } catch (error) {
    console.error("Error uploading files", error);
  }
};




const fetchPrioritizedRequirements = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/Prioritized`);
    setPrioritizedRequirements(response.data);
  } catch (error) {
    console.error("Error fetching prioritized requirements", error);
  }
};

const handlePrioritizedCommentChange = (PrioritizedID, text) => {
  setCommentText((prevState) => ({ ...prevState, [PrioritizedID]: text }));
};

const PrioritizedCommentSubmit = async (PrioritizedID) => {
  try {
    await axios.post(`http://localhost:4000/api/projects/${projectId}/Prioritized/${PrioritizedID}/comments`, {
      userEmail,
      commentText: commentText[PrioritizedID],
    });
    setCommentText((prevState) => ({ ...prevState, [PrioritizedID]: "" }));
    fetchPrioritizedRequirements();  // Refresh list after comment submission
  } catch (error) {
    console.error("Error adding comment", error);
  }
};

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
<div>
<Card className="mt-4">
      <Card.Body>
        <Row className="mt-5">
          <Col>
            <Card className="p-4 shadow-sm">
              <Card.Title className="text-center mb-4">Download Raw Requirement Documents</Card.Title>
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
                        <div className="comment-section">
                          {requirement.comments.map((comment, i) => (
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
                              value={commentText[requirement._id] || ""}
                              onChange={(e) => setCommentText(prev => ({ ...prev, [requirement._id]: e.target.value }))}
                              className="mt-2"
                            />
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleCommentSubmit(requirement._id)}
                              className="mt-2" style={{ marginBottom: '29px' }}
                            >
                              Submit
                            </Button>
                          </Form>
                        </div>
                        </td>
                        <td>
                          {requirement.fileName.map((file, i) => (
                            <div key={i} className="mb-2">
                              <Button
                                variant="success"
                                href={`http://localhost:4000/api/projects/${projectId}/requirements/download/${file}`}
                                download
                              >
                                Download
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
        </Card.Body>
    </Card>


        {/* Prioritize Requirements Section */}
    <Card>
      <Card.Body>
      <h4 className="mt-5">Upload Prioritized Project Requirement Document</h4>

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
            <Button variant="primary" onClick={handleUpload} disabled={!projectId}>Prioritize</Button>
            <Button variant="secondary" onClick={() => setFiles([])} className="ms-2">Cancel</Button>
          </Form>
      </Card.Body>
    </Card>


    <Card className="shadow-sm mb-5">
        <Card.Body>
          <Row>
            <Col>
              <h3 className="text-center mb-4">Download Prioritized Requirement Documents</h3>
              <Table striped bordered hover responsive className="table-fixed">
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
                  {prioritizedRequirements.map((priority, index) => (
                    <tr key={priority._id}>
                      <td>{index + 1}</td>
                      <td>{priority.fileName.join(", ")}</td>
                      <td>
                        <Badge
                          bg={
                            priority.priority === "High" ? "danger" :
                            priority.priority === "Normal" ? "primary" : "success"
                          }
                        >
                          {priority.priority}
                        </Badge>
                      </td>
                      <td>{priority.description}</td>
                     {/* <td>
                        <ListGroup variant="flush" className="comment-list">
                          {priority.comments.map((comment, i) => (
                            <ListGroup.Item key={i} className="border-0 px-1 py-2">
                              <strong>{comment.userEmail}</strong>: {comment.commentText}
                            </ListGroup.Item>
                          ))}
                          <Form className="mt-2">
                            <Form.Control
                              type="text"
                              placeholder="Add a comment"
                              value={commentText[priority._id] || ""}
                              onChange={(e) => handlePrioritizedCommentChange(priority._id, e.target.value)}
                              className="mt-1"
                            />
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => PrioritizedCommentSubmit(priority._id)}
                              className="mt-1"
                            >
                              Submit
                            </Button>
                          </Form>
                        </ListGroup>
                      </td>*/}
                                            <td>
                        <ListGroup variant="flush" className="comment-list">
                          {priority.comments.map((comment, i) => (
                            <ListGroup.Item key={i} className="border-0 px-1 py-2 d-flex align-items-start">
                              <div className="comment-avatar">
                                {comment.userEmail[0].toUpperCase()}
                              </div>
                              <div className="comment-content">
                                <div className="comment-header">
                                  <strong className="comment-user">{comment.userEmail}</strong>
                                  <span className="comment-timestamp">{new Date(comment.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="comment-text">{comment.commentText}</p>
                              </div>
                            </ListGroup.Item>
                          ))}
                          <Form className="comment-form mt-3 d-flex">
                            <Form.Control
                              type="text"
                              placeholder="Ask a question"
                              value={commentText[priority._id] || ""}
                              onChange={(e) => handlePrioritizedCommentChange(priority._id, e.target.value)}
                              className="comment-input"
                            />
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => PrioritizedCommentSubmit(priority._id)}
                              className="comment-submit-button ms-2"  style={{ marginBottom: '29px' }}
                            >
                              Submit
                            </Button>
                          </Form>
                        </ListGroup>
                      </td>
                      <td>
                        {priority.fileName.map((file, i) => (
                          <div key={i} className="mb-2">
                            <Button
                              variant="success"
                              href={`http://localhost:4000/api/projects/${projectId}/Prioritized/download/${file}`}
                              download
                              size="sm"
                            >                  
                              Download
                            </Button>
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
</div>
  );
};

export default RequirementList;















/*
  import React, { useEffect, useState, useContext, useCallback } from "react";
import { Row, Col, Card, Table, Form, Button, ListGroup, Badge  } from 'react-bootstrap';
import axios from "axios";
import { useDropzone } from 'react-dropzone';

import { useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const RequirementList = ({onSuccess}) => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');

  const { projectId } = useParams(); // Assume projectId is passed as a route param
  const [requirements, setRequirements] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [priority, setPriority] = useState("Normal");

  const { user } = useContext(UserContext);
  const userEmail = user.useremail;

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  useEffect(() => {
    fetchRequirements();
    fetchPrioritizedRequirements();
  }, [projectId]);


  
  const handlePriorityChange = (event) => {setPriority(event.target.value);};
  const handleDescriptionChange = (event) => setDescription(event.target.value);;


  const [commentText, setCommentText] = useState("");

  //Download Requirement Documents
  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/requirements`);
      setRequirements(response.data);
    } catch (error) {
      console.error("Error fetching requirements", error);
    }
  };

  const handleCommentChange = (requirementId, text) => {
    setCommentText((prevState) => ({ ...prevState, [requirementId]: text }));
  };

  const handleCommentSubmit = async (requirementId) => {
    try {
      await axios.post(`http://localhost:4000/api/projects/${projectId}/requirements/${requirementId}/comments`, {
        userEmail,
        commentText: commentText[requirementId],
      });
      setCommentText((prevState) => ({ ...prevState, [requirementId]: "" }));
      fetchRequirements();
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };



  //Upload Prioritized Project Requirement Document
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
    await axios.post(`http://localhost:4000/api/projects/${projectId}/Prioritized/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    setFiles([]);
    setDescription('');
    setPriority("Normal");
    fetchPrioritizedRequirements();
  } catch (error) {
    console.error("Error uploading files", error);
  }
};

const fetchPrioritizedRequirements = async () => {
  try {                 
    const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/Prioritized`);
    setRequirements(response.data);
  } catch (error) {
    console.error("Error fetching requirements", error);
  }
};



const handlePrioritizedCommentChange = (PrioritizedID, text) => {
  setCommentText((prevState) => ({ ...prevState, [PrioritizedID]: text }));
};

const PrioritizedCommentSubmit = async (PrioritizedID) => {
  try {
    await axios.post(`http://localhost:4000/api/projects/${projectId}/Prioritized/${PrioritizedID}/comments`, {
      userEmail,
      commentText: commentText[PrioritizedID],
    });
    setCommentText((prevState) => ({ ...prevState, [PrioritizedID]: "" }));
    fetchPrioritizedRequirements();  // Refresh list after comment submission
  } catch (error) {
    console.error("Error adding comment", error);
  }
};

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
<div>
<Card className="mt-4">
      <Card.Body>
        <Row className="mt-5">
          <Col>
            <Card className="p-4 shadow-sm">
              <Card.Title className="text-center mb-4">Download Requirement Documents</Card.Title>
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
                                Download
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
        </Card.Body>
    </Card>


        <Card>
        <Card.Body>
        <h4 className="mt-5">Upload Prioritized Project Requirement Document</h4>
  
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
              <Button variant="primary" onClick={handleUpload} disabled={!projectId}>Prioritize</Button>
              <Button variant="secondary" onClick={() => setFiles([])} className="ms-2">Cancel</Button>
            </Form>
        </Card.Body>
      </Card>
  
  
      <Card className="shadow-sm mb-5">
          <Card.Body>
            <Row>
              <Col>
                <h3 className="text-center mb-4">Download Requirement Documents</h3>
                <Table striped bordered hover responsive className="table-fixed">
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
                    {requirements.map((priority, index) => (
                      <tr key={priority._id}>
                        <td>{index + 1}</td>
                        <td>{priority.fileName.join(", ")}</td>
                        <td>
                          <Badge
                            bg={
                              priority.priority === "High" ? "danger" :
                              priority.priority === "Normal" ? "primary" : "success"
                            }
                          >
                            {priority.priority}
                          </Badge>
                        </td>
                        <td>{priority.description}</td>
                        <td>
                          <ListGroup variant="flush" className="comment-list">
                            {priority.comments.map((comment, i) => (
                              <ListGroup.Item key={i} className="border-0 px-1 py-2">
                                <strong>{comment.userEmail}</strong>: {comment.commentText}
                              </ListGroup.Item>
                            ))}
                            <Form className="mt-2">
                              <Form.Control
                                type="text"
                                placeholder="Add a comment"
                                value={commentText[priority._id] || ""}
                                onChange={(e) => handlePrioritizedCommentChange(priority._id, e.target.value)}
                                className="mt-1"
                              />
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => PrioritizedCommentSubmit(priority._id)}
                                className="mt-1"
                              >
                                Submit
                              </Button>
                            </Form>
                          </ListGroup>
                        </td>
                        <td>
                          {priority.fileName.map((file, i) => (
                            <div key={i} className="mb-2">
                              <Button
                                variant="success"
                                href={`http://localhost:4000/api/projects/${projectId}/Prioritized/download/${file}`}
                                download
                                size="sm"
                              >                  
                                Download
                              </Button>
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
  </div>
    );
  };
  
  export default RequirementList;*/