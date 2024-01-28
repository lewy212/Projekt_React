import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Logowanie = ({ listaUserow }) => {
    const { loggedIn, username, userId, login, logout, setAuthUsername } = useAuth();
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
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
                    <form onSubmit={handleLogin}>
                        <label>
                            Nazwa użytkownika:
                            <input
                                className="text-styled"
                                type="text"
                                value={username}
                                onChange={(e) => setAuthUsername(e.target.value)}
                                autoComplete="username"
                            />
                        </label>
                        <label>
                            Hasło:
                            <input
                                className="text-styled"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </label>
                        <button type="submit" className="btn">
                            Zaloguj
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Logowanie;
