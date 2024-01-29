import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import UserClass from "./klasy/UserClass";
import {Redirect} from "react-router-dom";

const Rejestracja = ({ dodajUseraDoListy, listaUserow, idOstatniegoUsera }) => {
    const { loggedIn } = useAuth();
    const [zarejestrowany, setZarejestrowany] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const handleRegistration = (e) => {
        e.preventDefault();
        let walidacja=false

        setUsernameError('');
        setPasswordError('');


        if (password !== confirmPassword) {
            setPasswordError('Hasło i potwierdzenie hasła muszą być takie same');
            walidacja=true;
        }


        if (password.length < 5) {
            setPasswordError(prevError => prevError + ' Hasło użytkownika musi mieć co najmniej 5 znaków');
            walidacja=true;
        }

        if (username.length < 5 || !/\d/.test(username)) {
            setUsernameError('Nazwa musi mieć co najmniej 5 znaków i zawierać co najmniej jedną liczbę');
            walidacja=true;
        }
        if(walidacja===true)
        {
            return;
        }
        let user = new UserClass(idOstatniegoUsera + 1, username, password, []);
        dodajUseraDoListy(user);

        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setZarejestrowany(true);
    };

    if (zarejestrowany) {
        return <Redirect to="/logowanie" />;
    }

    return (
        <div className="registration-container">
            {zarejestrowany ? (
                <p>Jesteś już zarejestrowany.</p>
            ) : (
                <>
                    <h1 className="header-styled-h1">Rejestracja</h1>
                    <form onSubmit={handleRegistration}>
                        <label>
                            Nazwa użytkownika:
                            <input
                                className="text-styled2"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                required
                            />
                            {usernameError && <span className="error-message">{usernameError}</span>}
                        </label>
                        <label>
                            Hasło:
                            <input
                                className="text-styled2"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                            {passwordError && <span className="error-message">{passwordError}</span>}
                        </label>
                        <label>
                            Potwierdź hasło:
                            <input
                                className="text-styled2"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                        </label>
                        <button className="zarejestrujButton" type="submit">
                            Zarejestruj się
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Rejestracja;
