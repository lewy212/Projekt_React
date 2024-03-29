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
            <h1 style={{ textAlign: "center", marginTop: "200px" }}>Lista Quizów</h1>
            <div className="search-container">
            <label htmlFor="searchQuiz">Wyszukaj quiz:</label>
                <input
                    id="searchQuiz"
                    type="text"
                    placeholder="Wyszukaj quiz..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
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
                            <h2>{quiz.nazwa}</h2>
                            <p>Kategoria: {quiz.kategoria}</p>
                            <p>Data dodania: {quiz.dataDodaniaQuizu ? quiz.dataDodaniaQuizu.toLocaleDateString() : 'Brak daty'}</p>
                            <p>Data wygaśnięcia: {quiz.dataWygasniecia ? quiz.dataWygasniecia.toLocaleString() : 'Brak daty'}</p>
                            <div>
                                <Link to={`/rozwiaz-quiz/${quiz.id}`}>
                                    <button>Rozwiąż Quiz</button>
                                </Link>
                                {loggedIn && (
                                    <>
                                        <button onClick={() => handleUsunQuiz(quiz.id)} className="deleteButton">
                                            Usun <br></br>Quiz
                                        </button>
                                        <br></br>
                                        <Link to={`/edytuj-quiz/${quiz.id}`}>
                                            <button className="editButton">Edytuj<br></br> Quiz</button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}

            </div>
            {rozwiazanieQuizu && <RozwiazQuiz quizId={rozwiazanieQuizu} onClose={handleCloseRozwiazQuiz} />}
        </div>
    );
};

export default WyswietlQuizy;