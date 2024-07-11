import React from 'react';
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

export default Timeline;