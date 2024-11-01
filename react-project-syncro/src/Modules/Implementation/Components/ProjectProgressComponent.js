import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectProgressComponent = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch project progress from the server
    const fetchProgress = async () => {
      const res = await axios.get('http://localhost:5000/progress');
      setProgress(res.data.progress);
    };
    fetchProgress();
  }, []);

  return (
    <div className="container mt-5">
      <h3>Project Development Progress</h3>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressComponent;
