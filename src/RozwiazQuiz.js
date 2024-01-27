import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import PodejscieClass from './klasy/PodejscieClass';

const RozwiazQuiz = ({ match, listaQuizow, listaUserow }) => {
    const quizId = match.params.id;
    const { userId } = useAuth();
    const [quiz, setQuiz] = React.useState(null);
    const [aktualnePytanie, setAktualnePytanie] = React.useState(0);
    const [wynik, setWynik] = React.useState(0);
    const [showWynik, setShowWynik] = React.useState(false);


    useEffect(() => {
        const aktualnyQuiz = listaQuizow.find((quiz) => quiz.id === parseInt(quizId));
        setQuiz(aktualnyQuiz);

    }, [quizId, listaQuizow]);

    useEffect(() => {
        if (showWynik) {
            handleDodajPodejscie();
        }
    }, [showWynik]);

    const handleClick = (wybranaOdpowiedz) => {
        const isCorrect = wybranaOdpowiedz === quiz.listaPytan[aktualnePytanie].numerPoprawnejOdpowiedzi;
        if (isCorrect) {
            setWynik(wynik + 1);
        }

        const nastepnePytanie = aktualnePytanie + 1;
        if (nastepnePytanie < quiz.listaPytan.length) {
            setAktualnePytanie(nastepnePytanie);
        } else {
            setShowWynik(true);
            if (userId != '') {
                const user = listaUserow.find((u) => u.id === userId);
                user.listaIdQuizow.push(parseInt(quizId));
                console.log(user);
            }
        }
    };
    const handleDodajPodejscie = () => {
        if (quiz) {
            // Check if the user already attempted this quiz
            const userAttemptedQuiz = quiz.listaPodejsc.some(attempt => attempt.uzytkownik === userId);
            
            if (!userAttemptedQuiz) {
                const newAttempt = new PodejscieClass({
                    id: quiz.listaPodejsc.length + 1, // Ensure unique ID
                    uzytkownik: userId,
                    poprawne_odpowiedzi: wynik,
                    wszystkie_odpowiedzi: quiz.listaPytan.length,
                });
    
                quiz.listaPodejsc.push(newAttempt);
                console.log(quiz); // Check the updated quiz object
            }
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "200px" }}>
            {quiz ? (
                <>
                    <h2>Rozwiązanie Quizu {quiz.id}</h2>
                    {quiz.listaPytan.length > 0 ? (
                        <div className="app">
                            {showWynik ? (
                                <section className="showScore-section">
                                    Twoje punkty: {wynik} / {quiz.listaPytan.length}
                                </section>
                            ) : (
                                <>
                                    <section className="question-section">
                                        <h1 className="header-styled-h1">
                                            Pytanie: {aktualnePytanie + 1}/{quiz.listaPytan.length}
                                        </h1>
                                        <p className="text-styled">{quiz.listaPytan[aktualnePytanie].tresc}</p>
                                    </section>

                                    <section className="answer-section">
                                        {quiz.listaPytan[aktualnePytanie].listaOdpowiedzi.map((odpowiedz, index) => (
                                            <button key={index} className="btn" onClick={() => handleClick(index + 1)}>
                                                {odpowiedz.tresc}
                                            </button>
                                        ))}
                                    </section>
                                </>
                            )}
                        </div>
                    ) : (
                        <h3 style={{ color: "red" }}>Quiz nie ma pytan</h3>
                    )
                    }

                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RozwiazQuiz;
