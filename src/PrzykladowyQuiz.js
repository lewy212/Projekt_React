import React from "react";
import "./App.css";
import { questions } from "./questions";


export default function PrzykladowyQuiz() {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [showScore, setShowScore] = React.useState(false);

    const handleClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
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
                            Question {currentQuestion + 1}/{questions.length}
                        </h1>
                        <p className="text-styled">{questions[currentQuestion].questionText}</p>
                    </section>

                    <section className="answer-section">
                        {questions[currentQuestion].answerOptions.map((item) => (
                            <button className="btn" onClick={() => handleClick(item.isCorrect)}>
                                {item.answerText}
                            </button>
                        ))}
                    </section>
                </>
            )}
        </div>
    );
}
