import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import KomponentPrezentacyjnyProfilu from './KomponentPrezentacyjnyProfilu';

const WyswietlProfil = ({ listaUserow }) => {
    const { loggedIn, userId } = useAuth();
    const [ustawiony, setUstawiony] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = listaUserow.find((user) => user.id === userId);
        setCurrentUser(user);
        setUstawiony(true);
    }, [loggedIn, userId, listaUserow]);

    return (
        <div style={{marginTop: "200px"}}className="user-dashboard">
            {ustawiony ? (
                <KomponentPrezentacyjnyProfilu
                    username={currentUser?.nick || ''}
                    userId={userId}
                    haslo={currentUser?.haslo || ''}
                />
            ) : (
                <p>Nie jesteś zalogowany</p>
            )}
        </div>
    );
};

export default WyswietlProfil;
