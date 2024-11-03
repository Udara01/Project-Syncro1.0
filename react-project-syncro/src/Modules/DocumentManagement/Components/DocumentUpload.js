/*import React, { useState, useContext } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from "../../../contexts/UserContext";


function DocumentUpload({ onUploadSuccess }) {
  const { projectId } = useParams();
  const { user } = useContext(UserContext);
  const userEmail = user.useremail;
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const allowedFormats = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedFormats.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Invalid file format. Please upload a PDF, DOCX, or XLSX file.');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('projectId', projectId);
    formData.append("createdBy", userEmail);
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false);
      setSuccessMessage('Document uploaded successfully!');
      onUploadSuccess(response.data); // Notify parent component of successful upload
      setTitle(''); setDescription(''); setCategory(''); setFile(null); // Reset the form
    } catch (error) {
      setLoading(false);
      setError('Upload failed. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !category || !file) {
      setError('Please fill out all fields and select a valid file.');
      return;
    }
    handleUpload();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {successMessage && <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>{successMessage}</Alert>}

      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter document title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          isInvalid={!title && error}
        />
        <Form.Control.Feedback type="invalid">Title is required.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter a brief description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isInvalid={!description && error}
        />
        <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter document category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          isInvalid={!category && error}
        />
        <Form.Control.Feedback type="invalid">Category is required.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formFile">
        <Form.Label>Upload File</Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileChange}
          isInvalid={!file && error}
        />
        <Form.Control.Feedback type="invalid">Valid file is required (PDF, DOCX, or XLSX).</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading || !title || !description || !category || !file}>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" /> Uploading...
          </>
        ) : (
          'Upload'
        )}
      </Button>
    </Form>
  );
}

export default DocumentUpload;*/

import React, { useState, useContext } from 'react';
import { Form, Button, Alert, Tab, Tabs, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from "../../../contexts/UserContext";
import '../../../styles/DocumentUpload.css'; // Ensure this CSS file is created with the necessary styles

function DocumentUpload({ onUploadSuccess, onCancel }) {
  const { projectId } = useParams();
  const { user } = useContext(UserContext);
  const userEmail = user.useremail;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('options');

  const allowedFormats = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedFormats.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Invalid file format. Please upload a PDF, DOCX, or XLSX file.');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('projectId', projectId);
    formData.append("createdBy", userEmail);
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false);
      setSuccessMessage('Document uploaded successfully!');
      onUploadSuccess(response.data);
      setTitle(''); setDescription(''); setCategory(''); setFile(null); // Reset the form
    } catch (error) {
      setLoading(false);
      setError('Upload failed. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !category || !file) {
      setError('Please fill out all fields and select a valid file.');
      return;
    }
    handleUpload();
  };

  return (
    <div className="upload-container">
      <h2>Upload Files</h2>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {successMessage && <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>{successMessage}</Alert>}

      <div className="file-drop-zone">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <p>Drop files here or <span className="browse-link">browse</span></p>
        {file && <p className="file-preview">Selected file: {file.name}</p>}
      </div>

      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="options" title="Options">
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter document title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={!title && error}
            />
            <Form.Control.Feedback type="invalid">Title is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter document category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              isInvalid={!category && error}
            />
            <Form.Control.Feedback type="invalid">Category is required.</Form.Control.Feedback>
          </Form.Group>
        </Tab>
        <Tab eventKey="description" title="Description">
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter a brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={!description && error}
            />
            <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
          </Form.Group>
        </Tab>
        <Tab eventKey="advanced" title="Advanced">
          {/* Add any additional fields here, like privacy settings or notifications */}
          <Form.Group controlId="formNotifyEmail">
            <Form.Label>Notify by Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email for notifications" />
          </Form.Group>
        </Tab>
      </Tabs>

      <div className="button-group">
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={loading || !title || !description || !category || !file}
          className="upload-button"
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Uploading...
            </>
          ) : (
            'Upload'
          )}
        </Button>
      </div> <br/>
      <div>
      <Button
          variant="secondary"
          onClick={onCancel}
          className="cancel-button"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default DocumentUpload;
