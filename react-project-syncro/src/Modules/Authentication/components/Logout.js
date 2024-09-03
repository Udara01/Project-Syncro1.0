import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext'; // Adjust the path as necessary

const Logout = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        if (!user) {
            console.error('User context is null. Unable to logout.');
            navigate('/');
            return;
        }
        try {
            const userId = user?.userId;
            // First, log the time out
            await axios.post('http://localhost:4000/api/time-out', { userId}, { withCredentials: true });
            
            // Then, clear the session and log out
            await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
    
            // Clear user context and local storage
            setUser(null);
            localStorage.removeItem('user');
    
            navigate('/'); // Redirect to login page
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;



