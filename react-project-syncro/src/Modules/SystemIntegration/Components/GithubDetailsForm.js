import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button, Spinner, Alert, OverlayTrigger, Tooltip, Container, Row, Col, Collapse } from 'react-bootstrap';

const GithubDetailsForm = () => {
  const { projectId } = useParams();
  const [formData, setFormData] = useState({ projectId, githubToken: '', owner: '', repo: '' });
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // State to manage visibility of details

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', message: '' }); // Clear any previous message
    try {
      const response = await axios.post('http://localhost:4000/api/github/github-details/save', formData);
      setStatusMessage({ type: 'success', message: response.data.message });
      setFormData({ projectId, githubToken: '', owner: '', repo: '' }); // Clear all fields except projectId
    } catch (error) {
      setStatusMessage({
        type: 'danger',
        message: error.response?.data?.error || 'An error occurred while saving the details.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Save GitHub Details</h4>
      
      {/* Toggle Button for Details */}
      <Button 
        variant="link" 
        onClick={() => setShowDetails(!showDetails)} 
        className="mb-3"
        aria-controls="github-details-collapse" 
        aria-expanded={showDetails}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </Button>

      {/* Collapse Panel for Details */}
      <Collapse in={showDetails}>
        <div id="github-details-collapse">
          <p className="mb-4">
            To access your GitHub repositories, you need a Personal Access Token (PAT). 
            Please follow these steps to create one:
          </p>
          <ol className="mb-4">
            <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">GitHub’s Personal Access Tokens page</a>.</li>
            <li>Click on <strong>Generate new token</strong>.</li>
            <li>Give your token a descriptive name.</li>
            <li>Select the <strong>repo</strong> scope for repository access.</li>
            <li>Click <strong>Generate token</strong> and copy your new token.</li>
          </ol>
          <p className="mb-4"><em>Keep your token safe and do not share it with anyone.</em></p>
        </div>
      </Collapse>

      {/* Show status message */}
      {statusMessage.message && (
        <Alert variant={statusMessage.type} onClose={() => setStatusMessage({ type: '', message: '' })} dismissible>
          {statusMessage.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="githubToken">
              <Form.Label>
                <OverlayTrigger placement="right" overlay={<Tooltip>Enter your GitHub token here for authentication.</Tooltip>}>
                  <span>GitHub Token:</span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="password"
                name="githubToken"
                value={formData.githubToken}
                onChange={handleChange}
                placeholder="Enter GitHub token"
                required
                disabled={loading}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="owner">
              <Form.Label>
                <OverlayTrigger placement="right" overlay={<Tooltip>Enter the GitHub username or organization.</Tooltip>}>
                  <span>Owner:</span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="Enter repository owner"
                required
                disabled={loading}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="repo">
              <Form.Label>
                <OverlayTrigger placement="right" overlay={<Tooltip>Enter the GitHub repository name.</Tooltip>}>
                  <span>Repository Name:</span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                name="repo"
                value={formData.repo}
                onChange={handleChange}
                placeholder="Enter repository name"
                required
                disabled={loading}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Saving...
            </>
          ) : (
            'Save GitHub Details'
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default GithubDetailsForm;
