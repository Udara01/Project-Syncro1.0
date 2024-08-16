import React, { useState } from 'react';
import axios from 'axios';

const AddMember = ({ teamId }) => {
    const [name, setName] = useState('');

    const addMember = () => {
        axios.post(`/api/teams/${teamId}/members`, { name }).then(response => {
            console.log('Member added:', response.data);
        });
    };

    return (
        <div>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Search Member" 
            />
            <button onClick={addMember}>Add</button>
        </div>
    );
};

export default AddMember;
