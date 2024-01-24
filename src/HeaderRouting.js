import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Navbar from "./Navbar";
import PrzykladowyQuiz from "./PrzykladowyQuiz";
import DodajQuiz from "./DodajQuiz";
import RozwiazywanieQuiz from "./RozwiazywanieQuiz";

const HeaderRouting = () => {
    return (
        <Router>
            <Navbar />
            <Route exact path="/" component={PrzykladowyQuiz} />
            <Route exact path="/nic" component={DodajQuiz} />
            <Route path="/quizy/:quizId" component={RozwiazywanieQuiz} />
        </Router>
    );
}

export default HeaderRouting;
