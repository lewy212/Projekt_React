import React, { useState, useEffect } from "react";
import {questions} from "./questions";

const RozwiazQuiz = ({ match, listaQuizow }) => {
    const quizId = match.params.id;

    const [quiz, setQuiz] = React.useState(null);
    const [aktualnePytanie, setAktualnePytanie] = React.useState(0);
    const [wynik, setWynik] = React.useState(0);
    const [showWynik, setShowWynik] = React.useState(false);


    useEffect(() => {

        const aktualnyQuiz = listaQuizow.find((quiz) => quiz.id === parseInt(quizId));
        setQuiz(aktualnyQuiz);
    }, [quizId, listaQuizow]);

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
        }
    };


    return (
        <div style={{ textAlign: "center", marginTop: "200px" }}>
            {quiz ? (
                <>
                    <h2>Rozwiązanie Quizu {quiz.id}</h2>
                    {quiz.listaPytan.length>0 ?(
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
                                        {quiz.listaPytan[aktualnePytanie].listaOdpowiedzi.map((odpowiedz,index) => (
                                            <button className="btn" onClick={() => handleClick(index+1)}>
                                                {odpowiedz.tresc}
                                            </button>
                                        ))}
                                    </section>
                                </>
                            )}
                        </div>
                        ) : (
                            <h3 style={{ color:"red"}}>Quiz nie ma pytan</h3>
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
