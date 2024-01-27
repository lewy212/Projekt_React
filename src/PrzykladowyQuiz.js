import React from "react";
import "./App.css";
import { questions } from "./questions";
import QuizClass from './klasy/QuizClass';
import PodejscieClass from './klasy/PodejscieClass';

export default function PrzykladowyQuiz() {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [showScore, setShowScore] = React.useState(false);
    const [quiz, setQuiz] = React.useState(new QuizClass()); // Zakładam, że QuizClass ma pole listaPodejsc

    const handleClick = (isCorrect) => {
        const newAttempt = new PodejscieClass({
            id: new Date().getTime(),
            poprawne_odpowiedzi: isCorrect ? 1 : 0,
            suma_odpowiedzi: 1,
        });

        // Dodanie nowego podejścia do listy w obiekcie quiz
        setQuiz((prevQuiz) => {
            const updatedQuiz = { ...prevQuiz, listaPodejsc: [...prevQuiz.listaPodejsc, newAttempt] };
            return updatedQuiz;
        });

        // Aktualizacja wyniku
        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className="app">
            {showScore ? (
                <section className="showScore-section">
                    Twoje punkty: {score} / {questions.length}
                </section>
            ) : (
                <>
                    <section className="question-section">
                        <h1 className="header-styled-h1">
                            Pytanie: {currentQuestion + 1}/{questions.length}
                        </h1>
                        <p className="text-styled">{questions[currentQuestion].questionText}</p>
                    </section>

                    <section className="answer-section">
                        {questions[currentQuestion].answerOptions.map((item, index) => (
                            <button key={index} className="btn" onClick={() => handleClick(item.isCorrect)}>
                                {item.answerText}
                            </button>
                        ))}
                    </section>
                </>
            )}
        </div>
    );
}