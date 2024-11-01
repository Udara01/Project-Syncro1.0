import React, { useState, useEffect } from 'react';
import DocumentUpload from './DocumentUpload';
import DocumentList from './DocumentList';
import DocumentUpdateModal from './DocumentUpdateModal';
import DocumentDeleteModal from './DocumentDeleteModal';
import { Container, Row, Col, Alert, Card, Button } from 'react-bootstrap';

function PrivateDocument() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    fetchPrivateDocuments();
  }, []);

  const fetchPrivateDocuments = async () => {
    try {
      const response = await fetch('/api/privateDocuments', { method: 'GET' });
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Failed to fetch private documents:', error);
    }
  };

  const handleUpload = async (document) => {
    try {
      const response = await fetch('/api/privateDocuments/upload', {
        method: 'POST',
        body: JSON.stringify(document),
        headers: { 'Content-Type': 'application/json' },
      });
      const newDocument = await response.json();
      setDocuments([...documents, newDocument]);
      setAlertMessage('Document uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload document:', error);
    }
  };

  const handleUpdate = (document) => {
    setSelectedDocument(document);
    setShowUpdateModal(true);
  };

  const handleDelete = (document) => {
    setSelectedDocument(document);
    setShowDeleteModal(true);
  };

  const handleSaveUpdate = (updatedDocument) => {
    setDocuments(
      documents.map(doc => (doc.id === selectedDocument.id ? { ...doc, ...updatedDocument } : doc))
    );
    setShowUpdateModal(false);
    setAlertMessage('Document updated successfully!');
  };

  const handleConfirmDelete = () => {
    setDocuments(documents.filter(doc => doc.id !== selectedDocument.id));
    setShowDeleteModal(false);
    setAlertMessage('Document deleted successfully!');
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2 className="text-center text-primary">My Private Documents</h2>
          {alertMessage && (
            <Alert variant="success" onClose={() => setAlertMessage(null)} dismissible>
              {alertMessage}
            </Alert>
          )}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={{ span: 8, offset: 2 }}>
          <DocumentUpload onUpload={handleUpload} />
        </Col>
      </Row>

      <Row>
        {documents.length > 0 ? (
          documents.map(doc => (
            <Col md={4} key={doc.id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{doc.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{doc.category}</Card.Subtitle>
                  <Card.Text>{doc.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-primary" onClick={() => handleUpdate(doc)}>
                      Update
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleDelete(doc)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No private documents available.</Alert>
          </Col>
        )}
      </Row>

      {/* Update Document Modal */}
      <DocumentUpdateModal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        document={selectedDocument}
        onSave={handleSaveUpdate}
      />

      {/* Delete Document Confirmation Modal */}
      <DocumentDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        document={selectedDocument}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
}

export default PrivateDocument;
