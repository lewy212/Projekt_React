import React from "react";
import "./App.css";

const Faq = () => {
    return (
        <div className="app">
            <section className="main-section">
                <h2>FAQ - Najczęściej Zadawane Pytania</h2>
                <div className="faq-item">
                    <h3>Jak mogę rozpocząć rozwiązywanie quizu?</h3>
                    <p>Aby rozpocząć rozwiązywanie quizu, przejdź do sekcji "Quizy" i kliknij na wybrany quiz.</p>
                </div>

                <div className="faq-item">
                    <h3>Czy muszę być zalogowany, aby rozwiązywać quizy?</h3>
                    <p>Nie, większość quizów jest dostępna dla wszystkich użytkowników.</p>
                </div>

                <div className="faq-item">
                    <h3>Jak mogę utworzyć własny quiz?</h3>
                    <p>Aby utworzyć własny quiz, zaloguj się i przejdź do sekcji "Dodaj Quiz". Kliknij na "Utwórz Quiz" i postępuj zgodnie z instrukcjami.</p>
                </div>

            </section>
        </div>
    );
};

export default Faq;
