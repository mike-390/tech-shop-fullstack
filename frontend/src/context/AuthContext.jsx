import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role')); 

    const login = (newToken, newRole) => {
        // DEBUGGING
        console.log('AuthContext login called with:', { newToken, newRole });
        
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
        setToken(newToken);
        setRole(newRole);
        
        // check
        console.log('Token saved:', localStorage.getItem('token'));
        console.log('Role saved:', localStorage.getItem('role'));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken(null);
        setRole(null);
    };

    // Check if the role is 'ADMIN'
    const isAdmin = role === 'ADMIN';

    return (
        <AuthContext.Provider value={{ token, role, isAdmin, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};