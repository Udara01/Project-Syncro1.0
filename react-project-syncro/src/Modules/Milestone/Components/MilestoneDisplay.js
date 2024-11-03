import React, { useEffect, useState } from 'react';
import { Card, ListGroup, ProgressBar, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function MilestoneDisplay() {
  const [milestones, setMilestones] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/milestones`);
        setMilestones(response.data); // Emails are now directly in assignedTeam
      } catch (error) {
        console.error('Error fetching milestones:', error);
      }
    };
    fetchMilestones();
  }, [projectId]);

  return (
    <div>
      {milestones.map((milestone) => (
        <Card key={milestone._id} className="mb-4 shadow-sm border-0 rounded">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Card.Title className="mb-0">{milestone.title}</Card.Title>
              <Badge bg={milestone.status === 'Completed' ? 'success' : milestone.status === 'In Progress' ? 'warning' : 'secondary'}>
                {milestone.status}
              </Badge>
            </div>
            <Card.Text className="text-muted">{milestone.description}</Card.Text>
            <div className="d-flex justify-content-between text-muted">
              <small>Start: {new Date(milestone.startDate).toLocaleDateString()}</small>
              <small>End: {new Date(milestone.endDate).toLocaleDateString()}</small>
            </div>
            <ProgressBar now={milestone.progress} label={`${milestone.progress}%`} className="my-3" />

            <ListGroup variant="flush" className="border-top pt-2">
              <ListGroup.Item className="border-0">
                <strong>Assigned Team:</strong>
              </ListGroup.Item>
              {milestone.assignedTeamEmail.map((member, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-center border-0">
                  <FaUser className="me-2 text-primary" />
                  {member}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default MilestoneDisplay;
