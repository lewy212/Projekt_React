import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
    const { loggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="topnav">
            <div className="topnavElements">
                <Link to="/" className="navElement">
                    Home
                </Link>
                <Link to="/quizy" className="navElement">
                    Quizy
                </Link>
                <Link to="/ranking" className="navElement">
                    Ranking
                </Link>
                <Link to="/nic" className="navElement">
                    Dodaj Quiz
                </Link>
                {loggedIn ? (
                        <Link to="/historiaQuizow" className="navElement">
                            Historia Quizow
                        </Link>
                    ) :null}
                {!loggedIn ? (
                    <Link to="/logowanie" className="navElement">
                        Login
                    </Link>
                ) : (
                    <button onClick={handleLogout} className="navElement">
                        Logout
                    </button>
                )}
                {!loggedIn ? (
                    <Link to="/zarejestruj" className="navElement">
                        Zarejestruj sie
                    </Link>
                ) : null}
            </div>
        </div>
    );
};

export default Navbar;
