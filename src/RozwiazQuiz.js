import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RozwiazQuiz() {
    const { quizId } = useParams();
    const quizData = localStorage.getItem(`quiz-${quizId}`);
    const quiz = quizData ? JSON.parse(quizData) : null;
    const [pytaniaQuizu, setPytaniaQuizu] = useState([]);
    const [odpowiedzi, setOdpowiedzi] = useState([]);
    const [wynik, setWynik] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Dodajemy stan do śledzenia ładowania danych

    useEffect(() => {
        const quizData = localStorage.getItem(`quiz-${quizId}`);
        const loadedQuiz = quizData ? JSON.parse(quizData) : null;
    
        if (loadedQuiz && loadedQuiz.listaPytan) {
            setPytaniaQuizu(loadedQuiz.listaPytan);
            setOdpowiedzi(new Array(loadedQuiz.listaPytan.length).fill(null));
        } else {
            console.log("Quiz nie zawiera pytań.");
        }
        setIsLoading(false);
    }, [quizId]);
    
    

    const handleOdpowiedz = (index, numerPoprawnejOdpowiedzi) => {
        const noweOdpowiedzi = [...odpowiedzi];
        noweOdpowiedzi[index] = numerPoprawnejOdpowiedzi;
        setOdpowiedzi(noweOdpowiedzi);
    };

    const handleSubmit = () => {
        // Obliczenie wyniku
        const punkty = odpowiedzi.reduce((sum, odp, index) => {
            return odp === pytaniaQuizu[index].numerPoprawnejOdpowiedzi ? sum + 1 : sum;
        }, 0);
        setWynik(punkty);
    };


    return (
        
        <div style={{ margin: '200px' }}>
            {isLoading ? (
                <p>Ładowanie danych...</p>
            ) : quiz ? (
                <div>
                    <h2>{quiz.nazwa}</h2>
                    <p>Kategoria: {quiz.kategoria}</p>
                    {/* Sprawdzenie, czy są pytania */}
                    {pytaniaQuizu && pytaniaQuizu.length > 0 ? (
                        pytaniaQuizu.map((pytanie, index) => (
                            <div key={index}>
                                <h3>{pytanie.tresc}</h3>
                                {/* Tutaj renderowanie odpowiedzi */}
                                <ul>
                                    {pytanie.listaOdpowiedzi.map((odpowiedz, odpIndex) => (
                                        <li
                                            key={odpIndex}
                                            onClick={() => handleOdpowiedz(index, odpIndex)}
                                            style={{
                                                cursor: 'pointer',
                                                fontWeight: odpowiedzi[index] === odpIndex ? 'bold' : 'normal',
                                            }}
                                        >
                                            {odpowiedz.tresc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>Brak pytań w quizie.</p>
                    )}
                    {wynik === null ? (
                        <button onClick={handleSubmit}>Sprawdź wynik</button>
                    ) : (
                        <p>Twój wynik: {wynik}/{pytaniaQuizu.length}</p>
                    )}
                </div>
            ) : (
                <p>Quiz nie został znaleziony.</p>
            )}
        </div>
    );
}

export default RozwiazQuiz;
