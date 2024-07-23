/*import React from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';
import '../../../styles/FileList.css'; // Import the custom styles

const FileList = ({ documents, onSelect }) => {
    return (
        <div className="file-list-container">
            <h5>Prioritize Project Requirements you Added</h5>
            <ListGroup>
                {documents.map(doc => (
                    <ListGroup.Item key={doc.id} className="file-list-item">
                        <div className="file-info">
                            <Form.Check 
                                type="checkbox" 
                                label={doc.name} 
                                checked={doc.selected} 
                                onChange={() => onSelect(doc.id)}
                            />
                            {doc.comments > 0 && (
                                <Button variant="link" size="sm" className="comments-btn">
                                    {doc.comments} Click here to see comments
                                </Button>
                            )}
                        </div>
                        <Button variant="link" href={doc.downloadLink} className="download-btn">
                            Click here to download..
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default FileList;*/

import React from 'react';
import { Card, Col, Row, Button, Form } from 'react-bootstrap';
import '../../../styles/FileList.css'; // the custom styles

const FileList = ({ documents, onSelect }) => {
    return (
        <div className="file-list-container">
            <h5>Prioritize Project Requirements Added</h5>
            <Row>
                {documents.map(doc => (
                    <Col key={doc.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card className={`file-card ${doc.selected ? 'selected' : ''}`} onClick={() => onSelect(doc.id)}>
                            <Card.Body>
                                <Form.Check 
                                    type="checkbox" 
                                    label={doc.name} 
                                    checked={doc.selected} 
                                    onChange={() => onSelect(doc.id)}
                                />
                                {doc.comments > 0 && (
                                    <Button variant="link" size="sm" className="comments-btn">
                                        {doc.comments} Click here to see comments
                                    </Button>
                                )}
                                <Button variant="link" href={doc.downloadLink} className="download-btn">
                                    Click here to download..
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default FileList;

