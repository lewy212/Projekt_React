import React from "react";
import QuizClass from "./klasy/QuizClass";
import RozwiazQuiz from "./RozwiazQuiz";
import { Link } from "react-router-dom";

const WyswietlQuizy = ({ listaQuizow, usunQuizZListy }) => {
    const [rozwiazanieQuizu, setRozwiazanieQuizu] = React.useState(null);

    const handleRozwiazQuiz = (quizId) => {
        setRozwiazanieQuizu(quizId);
    };

    const handleCloseRozwiazQuiz = () => {
        setRozwiazanieQuizu(null);
    };

    const handleUsunQuiz = (id) => {
        usunQuizZListy(id);
    };

    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "200px" }}>Lista Quizów</h2>
            <div className="quiz-list">
                {listaQuizow.map((quiz) => {
                    // Sprawdź, czy quiz ma datę wygaśnięcia
                    if (!quiz.dataWygasniecia) {
                        // Jeśli nie, przypisz datę wygaśnięcia na 7 dni od daty dodania
                        const dataWygasniecia = new Date(quiz.dataDodaniaQuizu);
                        dataWygasniecia.setDate(dataWygasniecia.getDate() + 7);
                        quiz.dataWygasniecia = dataWygasniecia;
                    }

                    return (
                        <div key={quiz.id} id={`quiz-card-${quiz.id}`} className="quiz-card">
                            <h3>{quiz.nazwa}</h3>
                            <p>Kategoria: {quiz.kategoria}</p>
                            <p>Data dodania: {quiz.dataDodaniaQuizu ? quiz.dataDodaniaQuizu.toLocaleDateString() : 'Brak daty'}</p>
                            <p>Data wygaśnięcia: {quiz.dataWygasniecia ? quiz.dataWygasniecia.toLocaleString() : 'Brak daty'}</p>
                            <Link to={`/rozwiaz-quiz/${quiz.id}`}>
                                <button>Rozwiąż Quiz</button>
                            </Link>
                            <button onClick={() => handleUsunQuiz(quiz.id)} className="deleteButton">
                                Usun <br></br>Quiz
                            </button>
                            <br></br>
                            <Link to={`/edytuj-quiz/${quiz.id}`}>
                                <button className="editButton">
                                    Edytuj<br></br> Quiz
                                </button>
                            </Link>
                        </div>
                    );
                })}
            </div>
            {rozwiazanieQuizu && <RozwiazQuiz quizId={rozwiazanieQuizu} onClose={handleCloseRozwiazQuiz} />}
        </div>
    );
};

export default WyswietlQuizy;