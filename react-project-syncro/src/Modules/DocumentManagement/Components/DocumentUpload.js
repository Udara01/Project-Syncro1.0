// src\Modules\DocumentManagement\Components\DocumentUpload.js
import React, { useState, useEffect,useContext } from 'react';
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
  const [loading, setLoading] = useState(false);

  const allowedFormats = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];


  useEffect(() => {
  }, [projectId]);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedFormats.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Invalid file format. Please upload a PDF, DOCX, or XLSX file.');
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
      onUploadSuccess(response.data); // Call onUploadSuccess to notify parent component
      setTitle(''); setDescription(''); setCategory(''); setFile(null); // Clear the form
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
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" />}
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formFile">
        <Form.Label>Upload File</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>
  );
}

export default DocumentUpload;
