import React from 'react';

const ProjectSummary = ({ project }) => {
  return (
    <div>
      <h2>Project Summary</h2>
      <p>{project.description}</p>
      <p>Key Metrics: {project.keyMetrics}</p>
    </div>
  );
};

export default ProjectSummary;
