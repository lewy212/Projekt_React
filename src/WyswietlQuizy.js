import React from "react";
import QuizClass from "./klasy/QuizClass";
import RozwiazQuiz from "./RozwiazQuiz";
import { Link } from "react-router-dom";
const WyswietlQuizy = ({ listaQuizow }) => {
    const [rozwiazanieQuizu, setRozwiazanieQuizu] = React.useState(null);

    const handleRozwiazQuiz = (quizId) => {
        setRozwiazanieQuizu(quizId);
    };

    const handleCloseRozwiazQuiz = () => {
        setRozwiazanieQuizu(null);
    };
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
                        <Link to={`/rozwiaz-quiz/${quiz.id}`}>
                            <button>Rozwiąż Quiz</button>
                        </Link>
                    </div>
                ))}
            </div>
            {rozwiazanieQuizu && <RozwiazQuiz quizId={rozwiazanieQuizu} onClose={handleCloseRozwiazQuiz} />}
        </div>
    );
};

export default WyswietlQuizy;
