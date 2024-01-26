// Logowanie.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Logowanie = ({ listaUserow }) => {
    const { loggedIn, username, userId, login, logout, setAuthUsername } = useAuth();
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        listaUserow.forEach((user) => {
            if (user.nick === username && user.haslo === password) {
                login(user.nick, user.id);
                setAuthUsername('');
                setPassword('');
            }
        });
    };

    const handleLogout = () => {
        logout();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            {loggedIn ? (
                <>
                    <p>
                        Witaj, {username}! (ID użytkownika: {userId})
                    </p>
                    <button className="btn" onClick={handleLogout}>
                        Wyloguj
                    </button>
                </>
            ) : (
                <>
                    <h1 className="header-styled-h1">Logowanie</h1>
                    <label>
                        Nazwa użytkownika:
                        <input
                            className="text-styled"
                            type="text"
                            value={username}
                            onChange={(e) => setAuthUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </label>
                    <label>
                        Hasło:
                        <input
                            className="text-styled"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </label>
                    <button className="btn" onClick={handleLogin}>
                        Zaloguj
                    </button>
                </>
            )}
        </div>
    );
};

export default Logowanie;
