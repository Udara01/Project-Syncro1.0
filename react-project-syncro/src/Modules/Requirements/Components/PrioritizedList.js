/*import React, { useEffect, useState, useContext, useCallback } from "react";
import { Row, Col, Card, Table, Form, Button, ListGroup, Badge  } from 'react-bootstrap';
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import { useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

import '../../../styles/RequirementUploadPage.css';



const PrioritizedList = ({onSuccess}) => {
  const [files, setFiles] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [prioritizedRequirements, setPrioritizedRequirements] = useState([]); // Separate state for prioritized

  const { projectId } = useParams(); // Assume projectId is passed as a route param
  const { user } = useContext(UserContext);
  const userEmail = user.useremail;

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  useEffect(() => {
    fetchRequirements();
    fetchPrioritizedRequirements();
  }, [projectId]);




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


  //Upload Prioritized Project Requirement Document
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
                    <th>Ask Questions</th>
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
                              placeholder="Ask a Questions"
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

export default PrioritizedList;*/


import React, { useEffect, useState, useContext, useCallback } from "react";
import { Row, Col, Card, Table, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import { useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import '../../../styles/RequirementUploadPage.css';

const PrioritizedList = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [prioritizedRequirements, setPrioritizedRequirements] = useState([]);
  const { projectId } = useParams();
  const { user } = useContext(UserContext);
  const userEmail = user.useremail;
  const [commentText, setCommentText] = useState("");

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  useEffect(() => {
    fetchRequirements();
    fetchPrioritizedRequirements();
  }, [projectId]);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/requirements`);
      setRequirements(response.data);
    } catch (error) {
      console.error("Error fetching requirements", error);
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
      fetchPrioritizedRequirements();
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
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
                    <th>Ask Questions</th>
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

export default PrioritizedList;

