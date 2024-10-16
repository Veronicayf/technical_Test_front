import React from 'react';
import { Navigate } from 'react-router-dom';

// El componente ProtectedRoute recibe children como prop
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // Si no hay token, redirige al login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si el token está presente, renderiza los componentes hijos (rutas protegidas)
    return children;
};

export default ProtectedRoute;