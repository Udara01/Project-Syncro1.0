import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DocumentDeleteModal({ show, onHide, document, onConfirm }) {

  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {document ? (
          <>Are you sure you want to delete the document "{document.title}"?</>
        ) : (
          "Document not found."
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="danger" onClick={() => onConfirm(document)} disabled={!document}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DocumentDeleteModal;
