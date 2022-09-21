import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const RequireAuth = ({ children }) => {
    const { currentUser } = useAuth()
    const location = useLocation()

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (currentUser && currentUser.emailVerified === false)
        return <Navigate to="/verify-email" state={{ from: location }} />;

    return children;
}

export default RequireAuth