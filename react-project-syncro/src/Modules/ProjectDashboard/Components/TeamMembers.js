import React from 'react';

const TeamMembers = () => {
  const members = [
    { name: "Mary", role: "UI/UX Designer" },
    { name: "William", role: "Senior Programmer" },
    { name: "James", role: "Database Administrator" },
    // Add more members as needed
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Team Members</h5>
        {members.map((member, index) => (
          <div key={index} className="team-member">
            <h6>{member.name}</h6>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
