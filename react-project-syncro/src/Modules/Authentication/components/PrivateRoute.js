// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);

    React.useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:4000/api/auth/protected', { withCredentials: true });
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
