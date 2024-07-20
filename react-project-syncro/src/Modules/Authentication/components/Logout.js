// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
            navigate('/login'); // Redirect to login page
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;

