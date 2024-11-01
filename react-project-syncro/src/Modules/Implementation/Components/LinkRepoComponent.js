import React, { useState } from 'react';
import axios from 'axios';

const LinkRepoComponent = () => {
  const [repoLink, setRepoLink] = useState('');
  const [message, setMessage] = useState('');

  const linkRepo = async () => {
    try {
      const res = await axios.post('http://localhost:5000/link-repo', { repoLink });
      setMessage(res.data.message);
    } catch (error) {
      console.error('Error linking repository:', error);
      setMessage('Failed to link repository');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Link GitHub Repository</h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter GitHub Repository URL"
          value={repoLink}
          onChange={(e) => setRepoLink(e.target.value)}
        />
        <button className="btn btn-primary" onClick={linkRepo}>Link Repo</button>
      </div>
      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
};

export default LinkRepoComponent;
