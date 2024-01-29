import React from 'react';

const KomponentPrezentacyjnyProfilu = ({ username, userId,haslo }) => {
    console.log(username)
    return (
        <div className="user-profile">
            <h2>Profil Użytkownika</h2>
            <p>ID użytkownika: {userId}</p>
            <p>Nazwa użytkownika: {username}</p>
            <p>Haslo: {haslo}</p>
        </div>
    );
};

export default KomponentPrezentacyjnyProfilu;
