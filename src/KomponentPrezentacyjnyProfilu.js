import React from 'react';

const KomponentPrezentacyjnyProfilu = ({ username, userId,haslo }) => {
    console.log(username)
    return (
        <div className="user-profile">
            <h1>Profil Użytkownika</h1>
            <p>ID użytkownika: {userId}</p>
            <p>Nazwa użytkownika: {username}</p>
            <p>Haslo: {haslo}</p>
        </div>
    );
};

export default KomponentPrezentacyjnyProfilu;
