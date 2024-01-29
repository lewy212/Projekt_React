// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn') === 'true');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    const login = (username, userId) => {
        setLoggedIn(true);
        setUsername(username);
        setUserId(userId); // Ustawiamy ID użytkownika
        sessionStorage.setItem('loggedIn', 'true');
    };

    const logout = () => {
        setLoggedIn(false);
        setUsername('');
        setUserId(''); // Czyścimy ID użytkownika
        sessionStorage.removeItem('loggedIn');
    };

    const setAuthUsername = (newUsername) => {
        setUsername(newUsername);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, username, userId, login, logout, setAuthUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth musi być używane wewnątrz AuthProvider');
    }
    return context;
};
