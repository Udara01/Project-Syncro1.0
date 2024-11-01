import React from 'react';
import { Table, Button } from 'react-bootstrap';

function DocumentList({ documents, onView, onDownload, onUpdate, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc, index) => (
          <tr key={index}>
            <td>{doc.title}</td>
            <td>{doc.description}</td>
            <td>{doc.category}</td>
            <td>
              <Button variant="info" onClick={() => onView(doc)}>View</Button>{' '}
              <Button variant="success" onClick={() => onDownload(doc)}>Download</Button>{' '}
              <Button variant="warning" onClick={() => onUpdate(doc)}>Update</Button>{' '}
              <Button variant="danger" onClick={() => onDelete(doc)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DocumentList;
