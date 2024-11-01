import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function DocumentUpdateModal({ show, onHide, document, onSave }) {
  // Use document properties or fallback values if document is null
  const [title, setTitle] = useState(document ? document.title : '');
  const [description, setDescription] = useState(document ? document.description : '');
  const [category, setCategory] = useState(document ? document.category : '');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Update state when the selected document changes
    if (document) {
      setTitle(document.title);
      setDescription(document.description);
      setCategory(document.category);
    }
  }, [document]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, category, file });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile">
            <Form.Label>Upload New Version</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit">Save Changes</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default DocumentUpdateModal;
