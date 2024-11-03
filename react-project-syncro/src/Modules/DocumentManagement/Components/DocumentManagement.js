import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DocumentUpload from './DocumentUpload';
import DocumentList from './DocumentList';
import DocumentUpdateModal from './DocumentUpdateModal';
import DocumentDeleteModal from './DocumentDeleteModal';
import { Container, Row, Col, Alert, Spinner, Button } from 'react-bootstrap';

function DocumentManagement() {
  const { projectId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/${projectId}/documents/show`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setAlertMessage({ text: 'Failed to load documents.', variant: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (newDocument) => {
    setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
    setAlertMessage({ text: 'Document uploaded successfully!', variant: 'success' });
  };

  const handleView = (document) => {
    setAlertMessage({
      text: `Title: ${document.title}\nDescription: ${document.description}\nCategory: ${document.category}`,
      variant: 'info',
    });
  };

  const handleDownload = async (document) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/documents/download/${document._id}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', document.title);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setAlertMessage({ text: `Downloading "${document.title}"...`, variant: 'info' });
    } catch (error) {
      console.error('Error downloading document:', error);
      setAlertMessage({ text: 'Failed to download document.', variant: 'danger' });
    }
  };

  const handleUpdate = (document) => {
    setSelectedDocument(document);
    setShowUpdateModal(true);
  };

  const handleDelete = (doc) => {
    setSelectedDocument(doc);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/documents/delete/${selectedDocument._id}`);
      setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc._id !== selectedDocument._id));
      setAlertMessage({ text: 'Document deleted successfully!', variant: 'success' });
    } catch (error) {
      console.error('Error deleting document:', error);
      setAlertMessage({ text: 'Failed to delete document.', variant: 'danger' });
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleSaveUpdate = async (updatedDocument) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/documents/update/${selectedDocument._id}`, updatedDocument);
      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) => (doc._id === selectedDocument._id ? response.data.document : doc))
      );
      setAlertMessage({ text: 'Document updated successfully!', variant: 'success' });
    } catch (error) {
      console.error('Error updating document:', error);
      setAlertMessage({ text: 'Failed to update document.', variant: 'danger' });
    } finally {
      setShowUpdateModal(false);
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Document Management</h2>
          {alertMessage && (
            <Alert
              variant={alertMessage.variant || 'info'}
              onClose={() => setAlertMessage(null)}
              dismissible
            >
              {alertMessage.text}
            </Alert>
          )}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <DocumentUpload onUploadSuccess={handleUploadSuccess} />
        </Col>
      </Row>

      {loading ? (
        <Row>
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      ) : documents.length === 0 ? (
        <Row>
          <Col className="text-center">
            <p>No documents available. Start by uploading a document.</p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <DocumentList
              documents={documents}
              onView={handleView}
              onDownload={handleDownload}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
      )}

      <DocumentUpdateModal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        document={selectedDocument}
        onSave={handleSaveUpdate}
      />

      <DocumentDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        document={selectedDocument}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
}

export default DocumentManagement;
