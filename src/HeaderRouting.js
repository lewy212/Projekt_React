import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Navbar from "./Navbar";
import PrzykladowyQuiz from "./PrzykladowyQuiz";

const HeaderRouting = () => {
    return (
        <Router>
            <Navbar />
            <Route exact path="/" component={PrzykladowyQuiz} />
            <Route exact path="/nic" />
        </Router>
    );
}

export default HeaderRouting;
