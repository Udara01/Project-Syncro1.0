/*import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/Timeline.css'; // Make sure to create and import a CSS file for additional styling

const Timeline = () => {
  return (
    <div className="container my-5">
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-content">
            <h5>Planning</h5>
            <p>June</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
            <p>June</p>
            <h5>Requirement Gathering</h5>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
            <h5>Planning</h5>
            <p>June</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
            <p>June</p>
            <h5>Requirement Gathering</h5>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
            <h5>Planning</h5>
            <p>June</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
            <p>June</p>
            <h5>Requirement Gathering</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline; */



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/Timeline.css';
import { useParams } from 'react-router-dom';


const Timeline = () => {
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

  return (
    <div className="container my-5" >
      <h4 className="mb-4 text-primary">Project Milestones</h4>
      <div className="timeline">
        {milestones.map((milestone, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-content">
              <h5>{milestone.title}</h5>
              <p>{new Date(milestone.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
