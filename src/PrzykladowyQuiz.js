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
            <section className="main-section">
                <h1 className="header-styled-h1">Witamy na stronie głównej Quizu o Podlasiu</h1>
                <p className="text-styled">W pozycji menu Quizy znajdziesz możliwość rozwiązwyania quizów dostępnych na naszej platformie.</p>
            </section>
        </div>
    );
}