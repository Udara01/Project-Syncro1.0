/*import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button, ProgressBar, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function MilestoneList() {
  const [milestones, setMilestones] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/milestones`);
        setMilestones(response.data);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      }
    };

    fetchMilestones();
  }, [projectId]);

  const markComplete = async (id) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone._id === id ? { ...milestone, status: 'Completed', progress: 100 } : milestone
      )
    );

    try {
      await axios.patch(`http://localhost:4000/api/projects/${projectId}/milestones/${id}`, { status: 'Completed', progress: 100 });
    } catch (error) {
      console.error('Error marking milestone as complete:', error);
    }
  };

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
              {milestone.assignedTeam.map((member, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-center border-0">
                  <FaUser className="me-2 text-primary" />
                  {member}
                </ListGroup.Item>
              ))}
            </ListGroup>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => markComplete(milestone._id)}
              disabled={milestone.status === 'Completed'}
              className="mt-3 w-100"
            >
              {milestone.status === 'Completed' ? 'Completed' : 'Mark as Complete'}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default MilestoneList;  */


import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button, ProgressBar, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUser, FaTrash } from 'react-icons/fa';

function MilestoneList() {
  const [milestones, setMilestones] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/milestones`);
        setMilestones(response.data);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      }
    };
    fetchMilestones();
  }, [projectId]);

  const markComplete = async (id) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone._id === id ? { ...milestone, status: 'Completed', progress: 100 } : milestone
      )
    );
    try {
      await axios.patch(`http://localhost:4000/api/projects/${projectId}/milestones/${id}`, { status: 'Completed', progress: 100 });
    } catch (error) {
      console.error('Error marking milestone as complete:', error);
    }
  };

  const deleteMilestone = async (id) => {
    setMilestones((prevMilestones) => prevMilestones.filter((milestone) => milestone._id !== id));
    try {
      await axios.delete(`http://localhost:4000/api/projects/${projectId}/milestones/delete/${id}`);
    } catch (error) {
      console.error('Error deleting milestone:', error);
    }
  };

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
              {milestone.assignedTeam.map((member, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-center border-0">
                  <FaUser className="me-2 text-primary" />
                  {member}
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="d-flex mt-3">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => markComplete(milestone._id)}
                disabled={milestone.status === 'Completed'}
                className="flex-fill me-2"
              >
                {milestone.status === 'Completed' ? 'Completed' : 'Mark as Complete'}
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteMilestone(milestone._id)}
                className="flex-fill"
              >
                <FaTrash /> Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default MilestoneList;


