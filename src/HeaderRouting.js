import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import PrzykladowyQuiz from "./PrzykladowyQuiz";
import WyswietlQuizy from "./WyswietlQuizy";
import RozwiazQuiz from "./RozwiazQuiz";

const HeaderRouting = ({ listaQuizow }) => {
    return (
        <Router>
            <Navbar />
            <Route exact path="/" component={PrzykladowyQuiz} />
            <Route exact path="/quizy" render={() => <WyswietlQuizy listaQuizow={listaQuizow} />} />
            <Route exact path="/rozwiaz-quiz/:id" render={(props) => <RozwiazQuiz listaQuizow={listaQuizow} {...props} />} />
        </Router>
    );
}

export default HeaderRouting;
