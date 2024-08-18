import React from 'react';
import { useParams } from 'react-router-dom';


import axios from 'axios';

const AddMember = () => {
    const { teamId } = useParams(); // Get teamId from URL params

    const addMember = async (memberData) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/teams/${teamId}/members`, memberData);
            console.log('Member added:', response.data);
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    
    return (
        <div>
            {/* Form or UI to add member */}
            <button onClick={() => addMember({ name: 'New Member' })}>Add Member</button>
        </div>
    );
};

export default AddMember;