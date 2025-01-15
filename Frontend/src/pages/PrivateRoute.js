import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default PrivateRoute;
