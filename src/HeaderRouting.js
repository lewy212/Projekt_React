// HeaderRouting.js

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import PrzykladowyQuiz from "./PrzykladowyQuiz";
import WyswietlQuizy from "./WyswietlQuizy";

const HeaderRouting = ({ listaQuizow }) => {
    return (
        <Router>
            <Navbar />
            <Route exact path="/" component={PrzykladowyQuiz} />
            {/* Przekazujemy listę quizów jako props do WyswietlQuizy */}
            <Route exact path="/quizy" render={() => <WyswietlQuizy listaQuizow={listaQuizow} />} />
        </Router>
    );
}

export default HeaderRouting;
