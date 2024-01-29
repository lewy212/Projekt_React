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
            <section className="main-section">
                <h1 className="header-styled-h1">Witamy na stronie głównej Quizu o Podlasiu</h1>
                <p className="text-styled">W pozycji menu Quizy znajdziesz możliwość rozwiązwyania quizów dostępnych na naszej platformie.</p>
            </section>
        </div>
    );
}
