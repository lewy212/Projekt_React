import React from "react";
import "./App.css";
import QuizClass from './klasy/QuizClass';
import PodejscieClass from './klasy/PodejscieClass';

const StronaHome=()=> {
    return (
        <div className="app">
            <section className="main-section">
                <h1 className="header-styled-h1">Witamy na stronie głównej Quizu o Podlasiu</h1>
                <p className="text-styled">W pozycji menu Quizy znajdziesz możliwość rozwiązwyania quizów dostępnych na naszej platformie.</p>
            </section>
        </div>
    );
}
export default StronaHome;