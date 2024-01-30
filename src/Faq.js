import React from "react";
import "./App.css";

const Faq = () => {
    return (
        <div className="app">
            <section className="main-section">
                <h1>FAQ - Najczęściej Zadawane Pytania</h1>
                <div className="faq-item">
                    <h2>Jak mogę rozpocząć rozwiązywanie quizu?</h2>
                    <p>Aby rozpocząć rozwiązywanie quizu, przejdź do sekcji "Quizy" i kliknij na wybrany quiz.</p>
                </div>

                <div className="faq-item">
                    <h2>Czy muszę być zalogowany, aby rozwiązywać quizy?</h2>
                    <p>Nie, większość quizów jest dostępna dla wszystkich użytkowników.</p>
                </div>

                <div className="faq-item">
                    <h2>Jak mogę utworzyć własny quiz?</h2>
                    <p>Aby utworzyć własny quiz, zaloguj się i przejdź do sekcji "Dodaj Quiz".</p>
                </div>

            </section>
        </div>
    );
};

export default Faq;
