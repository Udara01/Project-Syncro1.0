// src/Modules/Files/Components/FileUpload.js
import React, { useState, useCallback } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import '../../../styles/FileUpload.css'; // Import the custom styles

const FileUpload = ({ onUpload, projectId }) => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpload = () => {
    onUpload(files, description, projectId); // Include projectId
    setFiles([]); // Clear the files after upload
    setDescription(''); // Clear the description after upload
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card className="file-upload-card">
      <Card.Body>
        <Form>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here...</p> :
                <p>Drag and drop some files here, or click to select files</p>
            }
          </div>
          <Form.Group controlId="formDescription" className="mb-3 mt-3">
            <Form.Label>Add Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={description} 
              onChange={handleDescriptionChange} 
              className="description-textarea"
            />
          </Form.Group>
          {files.length > 0 && (
            <ListGroup className="mb-3">
              {files.map((file, index) => (
                <ListGroup.Item key={index}>{file.name}</ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <Button variant="primary" onClick={handleUpload} className="upload-btn">Upload</Button>
          <Button variant="secondary" className="ms-2 cancel-btn">Cancel</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FileUpload;
