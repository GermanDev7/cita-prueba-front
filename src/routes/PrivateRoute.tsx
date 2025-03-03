import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    requiredRole: 'admin' | 'doctor' | 'patient';
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRole, children }) => {
    const { token, role } = useSelector((state: RootState) => state.auth);

    if (!token || role !== requiredRole) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>
}

export default PrivateRoute;