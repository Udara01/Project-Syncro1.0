import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const RepoDetails = () => {
  const { projectId } = useParams();
  const [repo, setRepo] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRepoDetails = () => {
    setLoading(true);
    axios.get(`http://localhost:4000/api/github/${projectId}/repo-details`)
      .then(response => {
        setRepo(response.data);
        setError('');
      })
      .catch(() => {
        setError('Error fetching repo details. Please check your internet connection or try again later.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRepoDetails();
  }, [projectId]);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            {error && (
              <>
                <Alert variant="danger">
                  {error}
                </Alert>
                <Button variant="primary" onClick={fetchRepoDetails}>
                  Retry
                </Button>
              </>
            )}
            {!error && (
              <>
                <Card.Title>{repo.name || 'Repository Details'}</Card.Title>
                <Card.Text>{repo.description || 'No description available.'}</Card.Text>
                <Button variant="outline-primary" href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  Visit Repository
                </Button>
              </>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default RepoDetails;
