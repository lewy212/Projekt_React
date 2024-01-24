import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Navbar from "./Navbar";
import PrzykladowyQuiz from "./PrzykladowyQuiz";
import DodajQuiz from "./DodajQuiz";
import RozwiazQuiz from "./RozwiazQuiz";

const HeaderRouting = () => {
    return (
        <Router>
            <Navbar />
            <Route exact path="/" component={PrzykladowyQuiz} />
            <Route exact path="/nic" component={DodajQuiz} />
            <Route path="/quiz/:quizId" component={RozwiazQuiz} />
        </Router>
    );
}

export default HeaderRouting;
