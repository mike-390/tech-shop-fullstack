import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // read directly from localStorage
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role')); 

    const login = (newToken, newRole) => {
        // DEBUGGING
        console.log('AuthContext login called with:', { newToken, newRole });
        
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
        setToken(newToken);
        setRole(newRole);
        
        // Check if data was stored correctly
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

    // if a token exists, create a user object with its role; otherwise, set it to null.
    const user = token ? { role: role, email: 'User' } : null;

    return (
        <AuthContext.Provider value={{ 
            token, 
            role, 
            isAdmin, 
            login, 
            logout, 
            isAuthenticated: !!token,
            user 
        }}>
            {children}
        </AuthContext.Provider>
    );
};