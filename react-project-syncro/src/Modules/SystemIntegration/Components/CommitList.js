// CommitList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const CommitList = () => {

  const { projectId } = useParams();
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/github/${projectId}/commits`)
      .then(response => setCommits(response.data))
      .catch(error => console.error(error));
  }, [projectId]);

  return (
    <ListGroup>
      {commits.map(commit => (
        <ListGroup.Item key={commit.sha}>
          <strong>{commit.commit.message}</strong> by {commit.commit.author.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommitList;

