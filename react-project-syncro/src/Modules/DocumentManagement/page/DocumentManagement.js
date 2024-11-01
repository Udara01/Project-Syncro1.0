// src\Modules\DocumentManagement\DocumentManagement.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import DocumentUpload from '../../DocumentManagement/Components/DocumentUpload';
import DocumentList from '../../DocumentManagement/Components/DocumentList';
import DocumentUpdateModal from '../../DocumentManagement/Components/DocumentUpdateModal';
import DocumentDeleteModal from '../../DocumentManagement/Components/DocumentDeleteModal';
import { Container, Row, Col, Alert } from 'react-bootstrap';

function DocumentManagement() {
  const { projectId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    fetchDocuments();
  },);



const fetchDocuments = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/${projectId}/documents/show`);
    setDocuments(response.data);
  } catch (error) {
    console.error('Error fetching documents', error);
  }
};


  const handleUploadSuccess = (newDocument) => {
    setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
    setAlertMessage('Document uploaded successfully!');
  };

  const handleView = (document) => {
    alert(`Viewing document:\nTitle: ${document.title}\nDescription: ${document.description}\nCategory: ${document.category}`);
    // You could also open a modal with more details instead of using an alert.
  };
  

  const handleDownload = async (document) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/documents/download/${document._id}`, {
        responseType: 'blob', // Important for downloading files
      });
      console.log('Download response:', response);
      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', document.title); // You can specify a file name here
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };
  
  

  const handleUpdate = (document) => {
    setSelectedDocument(document);
    setShowUpdateModal(true);
  };

  const handleDelete = async (doc) => {
    if (window.confirm(`Are you sure you want to delete "${doc.title}"?`)) {
      try {
        await axios.delete(`http://localhost:4000/api/documents/delete/${doc._id}`);
        setDocuments(documents.filter((document) => document._id !== doc._id));
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  const handleSaveUpdate = async (updatedDocument) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/documents/update/${selectedDocument._id}`, updatedDocument);
      setDocuments(documents.map((doc) => (doc._id === selectedDocument._id ? response.data.document : doc)));
      setShowUpdateModal(false);
      setAlertMessage('Document updated successfully!');
    } catch (error) {
      console.error('Error updating document:', error);
      setAlertMessage('Failed to update document.');
    }
  };
  

  const handleConfirmDelete = () => {
    setDocuments(documents.filter((doc) => doc.id !== selectedDocument.id));
    setShowDeleteModal(false);
    setAlertMessage('Document deleted successfully!');
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Document Management</h2>
          {alertMessage && <Alert variant="success" onClose={() => setAlertMessage(null)} dismissible>{alertMessage}</Alert>}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <DocumentUpload onUploadSuccess={handleUploadSuccess} />
        </Col>
      </Row>

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


