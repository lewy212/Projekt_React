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
            <div className="navLogoBox">
            <Link to="/" className="navLogo">
                <img src="/logo.png" alt="żubr" style={{ height: "100px", margin: "25px"}} />
            </Link>
            </div>

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
                    <Link to="/zarejestruj" className="navElement">
                        Zarejestruj sie
                    </Link>
                ) : null}
                {loggedIn ? (
                    <Link to="/profil" className="navElement">
                        Wyswietl profil
                    </Link>
                ) : null}
                {!loggedIn ? (
                    <Link to="/logowanie" className="navElement">
                        Login
                    </Link>
                ) : (
                    <button onClick={handleLogout} className="navElement">
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
