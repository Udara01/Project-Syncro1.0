import React from 'react';
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

export default FileList;
