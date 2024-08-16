import React from 'react';
import TeamList from '../Components/TeamList';
import AddMember from '../Components/AddMember';
import '../../../styles/teamManagement.css';


const TeamManagement = () => {
    return (
        <div>
            <h2>Team Management</h2>
            <div className="team-management-container">
                <TeamList />
                <AddMember />
                {/* MemberDetails can be conditionally rendered based on selection */}
            </div>
        </div>
    );
};

export default TeamManagement;
