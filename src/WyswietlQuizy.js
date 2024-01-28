import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import RozwiazQuiz from "./RozwiazQuiz";

const WyswietlQuizy = ({ listaQuizow, usunQuizZListy }) => {
    const [rozwiazanieQuizu, setRozwiazanieQuizu] = React.useState(null);
    const { loggedIn } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");

    const checkAndRemoveExpiredQuizzes = () => {
        const currentDate = new Date();
        const updatedQuizList = listaQuizow.filter((quiz) => quiz.dataWygasnieciaQuizu < currentDate);

        updatedQuizList.forEach((quiz) => {
            usunQuizZListy(quiz.id);
        });
    };

    useEffect(() => {
        // Sprawdź i usuń wygasłe quizy przy montowaniu komponentu
        checkAndRemoveExpiredQuizzes();
    }, [listaQuizow, usunQuizZListy]);

    const handleRozwiazQuiz = (quizId) => {
        setRozwiazanieQuizu(quizId);
    };

    const handleCloseRozwiazQuiz = () => {
        setRozwiazanieQuizu(null);
    };

    const handleUsunQuiz = (id) => {
        usunQuizZListy(id);
    };

    // Filtruj listę quizów na podstawie wprowadzonego tekstu
    const filteredQuizList = listaQuizow.filter((quiz) =>
        quiz.nazwa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "200px" }}>Lista Quizów</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Wyszukaj quiz..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="quiz-list">
                {filteredQuizList.map((quiz) => (
                    <div key={quiz.id} className="quiz-card">
                        <h3>{quiz.nazwa}</h3>
                        <p>Kategoria: {quiz.kategoria}</p>
                        <p>Data dodania: {quiz.dataDodaniaQuizu.toLocaleDateString()}</p>
                        <p>Data wygaśnięcia: {quiz.dataWygasnieciaQuizu.toLocaleDateString()}</p>
                        <div>
                            <Link to={`/rozwiaz-quiz/${quiz.id}`}>
                                <button>Rozwiąż Quiz</button>
                            </Link>
                            {loggedIn && (
                                <>
                                    <button onClick={() => handleUsunQuiz(quiz.id)} className="deleteButton">
                                        Usuń <br />Quiz
                                    </button>
                                    <br />
                                    <Link to={`/edytuj-quiz/${quiz.id}`}>
                                        <button className="editButton">Edytuj<br /> Quiz</button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {rozwiazanieQuizu && <RozwiazQuiz quizId={rozwiazanieQuizu} onClose={handleCloseRozwiazQuiz} />}
        </div>
    );
};

export default WyswietlQuizy;
