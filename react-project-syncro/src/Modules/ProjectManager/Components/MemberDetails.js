import React, { useState } from 'react';

const MemberDetails = ({ member }) => {
    return (
        <div>
            <h3>{member.name}</h3>
            <p>{member.details}</p>
            {/* Add additional member details as needed */}
        </div>
    );
};

export default MemberDetails;
