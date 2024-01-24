import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import PrzykladowyQuiz from "./PrzykladowyQuiz";

import DodajQuiz from "./DodajQuiz";
import RozwiazywanieQuiz from "./RozwiazywanieQuiz";
import WyswietlQuizy from "./WyswietlQuizy";
import RozwiazQuiz from "./RozwiazQuiz";


const HeaderRouting = ({ listaQuizow, dodajQuizDoListy }) => {
    const getIdOstatniegoQuizu = () => {
        if (listaQuizow.length === 0) {
            return null;
        }
        return listaQuizow[listaQuizow.length - 1].id ;
    };
    return (
        <Router>
            <Navbar />
            <Route exact path="/" component={PrzykladowyQuiz} />

            <Route exact path="/nic" render={(props) => <DodajQuiz dodajQuizDoListy={dodajQuizDoListy} idOstatniegoQuizu={getIdOstatniegoQuizu} {...props} />}/>
            {/*filip*/}
            <Route path="/quizy/:quizId" component={RozwiazywanieQuiz} />

            <Route exact path="/quizy" render={() => <WyswietlQuizy listaQuizow={listaQuizow} />} />
            <Route exact path="/rozwiaz-quiz/:id" render={(props) => <RozwiazQuiz listaQuizow={listaQuizow} {...props} />} />

        </Router>
    );
}

export default HeaderRouting;
