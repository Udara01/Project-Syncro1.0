// src/components/ProjectDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProjectSummary from './ProjectSummary';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Project ID:", projectId); // Add this line to check the id
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}`);

        setProject(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
      <p>numberOfMembers: {project.numberOfMembers}</p>
      
      {/* Add more project details as needed */}
    </div>
  );
};

export default ProjectDetails;
