/*import React, { useContext } from 'react';

const MembersList = () => {
  const { members, loading } = useContext(MembersContext);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Team Members</h1>
      <ul>
        {members.map(member => (
          <li key={member._id}>
            <h3>{member.firstName} {member.lastName}</h3>
            <p>Username: {member.username}</p>
            <p>Email: {member.email}</p>
            <p>Role: {member.role}</p>
            <p>Bio: {member.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersList;*/



// MembersList.js
import React, { useContext } from 'react';
import { MembersContext } from '../contexts/MembersContext';
import { Link } from 'react-router-dom';

const MembersList = () => {
  const { members, loading } = useContext(MembersContext);

  if (loading) return <p>Loading members...</p>;

  return (
    <div>
      <h2>Members List</h2>
      <ul>
        {members.map((member) => (
          <li key={member._id}>
            <Link to={`/profile/${member._id}`}>{member.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersList;

