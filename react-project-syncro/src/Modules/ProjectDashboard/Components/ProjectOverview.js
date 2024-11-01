import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../styles/ProjectOverview.css';  // External CSS for styles

const ProjectOverview = () => {
  const { projectId } = useParams();
  
  // State to store overall project progress
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const strokeDasharrayValue = `${completionPercentage}, 100`; // Based on percentage

  useEffect(() => {
    // Fetch tasks and calculate overall progress
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/tasks?projectId=${projectId}`);
        
        // Use overall progress in the frontend
        if (response.data.overallProgress !== undefined) {
          setCompletionPercentage(response.data.overallProgress);  // Update progress state
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchData(); // Call the fetch function

  }, [projectId]); // Dependency array ensures fetch runs when `projectId` changes

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Project Overview</h5>
        
        <div className="progress-circle">
          <svg viewBox="0 0 36 36" className="circular-chart blue">
            {/* Circle progress (strokeDasharray controls how much of the circle is visible) */}
            <path
              className="circle"
              strokeDasharray={strokeDasharrayValue}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Display percentage text in the center of the circle */}
            <text x="18" y="20.35" className="percentage-text" textAnchor="middle" fontSize="7">
              {`${completionPercentage}%`}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
