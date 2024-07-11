import React from 'react';

const ProjectOverview = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Project Overview</h5>
        <div className="progress-circle">
          <svg viewBox="0 0 36 36" className="circular-chart blue">
            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="circle" strokeDasharray="67, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
