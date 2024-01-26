import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const HistoriaQuizow = ({ listaQuizow, listaUserow }) => {
    const { userId } = useAuth();
    const [listaQuizowUsera, setListaQuizowUsera] = useState([]);
    let keyCounter = 0; // Use let instead of const

    useEffect(() => {
        const user = listaUserow.find((u) => u.id === userId);

        if (user) {
            const listaIdQuizowUsera = user.listaIdQuizow;

            const quizzesUsera = listaIdQuizowUsera.map((quizId) =>
                listaQuizow.find((quiz) => quiz.id === quizId)
            ).filter(Boolean);

            setListaQuizowUsera(quizzesUsera);
        }
    }, [listaUserow, listaQuizow, userId]);

    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "200px" }}>Historia Quizów</h2>
            <div className="quiz-list">
                {listaQuizowUsera.map((quiz) => (
                    <div key={keyCounter++} className="quiz-card">
                        <h3>{quiz.nazwa}</h3>
                        <p>Kategoria: {quiz.kategoria}</p>
                        <p>Data dodania: {quiz.dataDodaniaQuizu.toLocaleDateString()}</p>
                        <p>Data wygaśnięcia: {quiz.dataWygasnieciaQuizu.toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoriaQuizow;
