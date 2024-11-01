import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OverviewPanel = () => {
  const { projectId } = useParams();
  const [totalTests, setTotalTests] = useState(0);
  const [activeTests, setActiveTests] = useState(0);
  const [unresolvedIssues, setUnresolvedIssues] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/overview?projectId=${projectId}`);
        const { totalTests, activeTests, unresolvedIssues } = response.data;
        setTotalTests(totalTests);
        setActiveTests(activeTests);
        setUnresolvedIssues(unresolvedIssues);
      } catch (error) {
        console.error('Error fetching overview data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, [projectId]);

  if (loading) {
    return <div>Loading...</div>; // Add custom styling as needed
  }

  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Total Tests</Card.Title>
            <Card.Text>{totalTests}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Active Tests</Card.Title>
            <Card.Text>{activeTests}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Unresolved Issues</Card.Title>
            <Card.Text>{unresolvedIssues}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OverviewPanel;
