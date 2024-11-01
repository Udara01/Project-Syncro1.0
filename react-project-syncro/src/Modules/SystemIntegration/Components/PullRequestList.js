// PullRequestList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const PullRequestList = () => {
  const { projectId } = useParams();
  const [pullRequests, setPullRequests] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/github/${projectId}/pull-requests`)  
      .then(response => setPullRequests(response.data))
      .catch(error => console.error(error));
  }, [projectId]);

  return (
    <ListGroup>
      {pullRequests.map(pr => (
        <ListGroup.Item key={pr.id}>
          <strong>{pr.title}</strong> by {pr.user.login}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default PullRequestList;
