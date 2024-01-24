import React from "react";
import QuizClass from "./klasy/QuizClass";

const WyswietlQuizy = ({ listaQuizow }) => {
    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "200px" }}>Lista Quizów</h2>
            <div className="quiz-list">
                {listaQuizow.map((quiz) => (
                    <div key={quiz.id} className="quiz-card">
                        <h3>{quiz.nazwa}</h3>
                        <p>Kategoria: {quiz.kategoria}</p>
                        <p>Data dodania: {quiz.dataDodaniaQuizu.toLocaleDateString()}</p>
                        <p>Data wygaśnięcia: {quiz.dataWygasnieciaQuizu.toLocaleDateString()}</p>
                        {/* Tutaj możesz dodać kod do wyświetlenia pytań, itp. */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WyswietlQuizy;
