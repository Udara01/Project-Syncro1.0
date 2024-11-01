import React, { useEffect, useState, useContext, useCallback } from "react";
import { Row, Col, Card, Table, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import { useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const RequirementList = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [prioritizedRequirements, setPrioritizedRequirements] = useState([]); // Separate state for prioritized

  const { projectId } = useParams();
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

  const handlePriorityChange = (event) => setPriority(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const [commentText, setCommentText] = useState({});

  // Fetch general requirements
  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/requirements`);
      setRequirements(response.data);
    } catch (error) {
      console.error("Error fetching requirements", error);
    }
  };

  // Fetch prioritized requirements
  const fetchPrioritizedRequirements = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/Prioritized`);
      setPrioritizedRequirements(response.data);
    } catch (error) {
      console.error("Error fetching prioritized requirements", error);
    }
  };

  // Upload prioritized requirements
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

  // Comment handling for both types
  const handleCommentChange = (id, text) => setCommentText((prevState) => ({ ...prevState, [id]: text }));

  const handleCommentSubmit = async (requirementId, type = "requirement") => {
    const endpoint = type === "prioritized" 
      ? `http://localhost:4000/api/projects/${projectId}/Prioritized/${requirementId}/comments`
      : `http://localhost:4000/api/projects/${projectId}/requirements/${requirementId}/comments`;

    try {
      await axios.post(endpoint, {
        userEmail,
        commentText: commentText[requirementId],
      });
      setCommentText((prevState) => ({ ...prevState, [requirementId]: "" }));
      type === "prioritized" ? fetchPrioritizedRequirements() : fetchRequirements();
    } catch (error) {
      console.error(`Error adding comment to ${type}`, error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      {/* Regular Requirements Section */}
      <Card className="mt-4">
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Download Requirement Documents</Card.Title>
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
                        <Form.Control
                          type="text"
                          placeholder="Add a comment"
                          value={commentText[requirement._id] || ""}
                          onChange={(e) => handleCommentChange(requirement._id, e.target.value)}
                        />
                        <Button
                          onClick={() => handleCommentSubmit(requirement._id, "requirement")}
                        >
                          Submit
                        </Button>
                      </td>
                      <td>
                        {requirement.fileName.map((file, i) => (
                          <Button
                            key={i}
                            href={`http://localhost:4000/api/projects/${projectId}/requirements/download/${file}`}
                            download
                          >
                            Download
                          </Button>
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

      {/* Prioritized Requirements Section */}
      <Card className="mt-4">
        <Card.Body>
          <h4>Upload Prioritized Project Requirement Document</h4>
          <Form>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? <p>Drop files here...</p> : <p>Drag and drop files here, or click to select files</p>}
            </div>
            <Form.Control as="textarea" rows={3} value={description} onChange={handleDescriptionChange} />
            <Form.Control as="select" value={priority} onChange={handlePriorityChange}>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </Form.Control>
            <Button onClick={handleUpload}>Upload</Button>
          </Form>

          <h3>Prioritized Requirements</h3>
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
              {prioritizedRequirements.map((priority, index) => (
                <tr key={priority._id}>
                  <td>{index + 1}</td>
                  <td>{priority.fileName.join(", ")}</td>
                  <td>{priority.priority}</td>
                  <td>{priority.description}</td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Add a comment"
                      value={commentText[priority._id] || ""}
                      onChange={(e) => handleCommentChange(priority._id, e.target.value)}
                    />
                    <Button
                      onClick={() => handleCommentSubmit(priority._id, "prioritized")}
                    >
                      Submit
                    </Button>
                  </td>
                  <td>
                    {priority.fileName.map((file, i) => (
                      <Button
                        key={i}
                        href={`http://localhost:4000/api/projects/${projectId}/Prioritized/download/${file}`}
                        download
                      >
                        Download
                      </Button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RequirementList;
