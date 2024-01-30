import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import StronaHome from "./StronaHome";

import Ranking from "./Ranking";
import DodajQuiz from "./DodajQuiz";
import RozwiazywanieQuiz from "./RozwiazywanieQuiz";
import WyswietlQuizy from "./WyswietlQuizy";
import RozwiazQuiz from "./RozwiazQuiz";
import Logowanie from "./Logowanie";
import HistoriaQuizow from "./HistoriaQuizow";
import {useAuth} from "./AuthContext";
import Rejestracja from "./Rejestracja";
import WyswietlProfil from "./WyswietlProfil";
import Faq from "./Faq";


const HeaderRouting = ({ listaQuizow, dodajQuizDoListy,usunQuizZListy,listaUserow,dodajUseraDoListy }) => {
    const { loggedIn, logout } = useAuth();
    const getIdOstatniegoQuizu = () => {
        if (listaQuizow.length === 0) {
            return null;
        }
        return listaQuizow[listaQuizow.length - 1].id ;
    };
    const getIdOstatniegoUsera = ()=> {
        if (listaUserow.length === 0){
            return null;
        }
        return listaUserow[listaUserow.length-1].id;
    }
    return (
        <Router>
            <Navbar />
            <Route exact path="/home" component={StronaHome} />
            <Route exact path="/ranking" render={() => <Ranking quizzes={listaQuizow} />} />
            <Route exact path="/faq" component={Faq}/>
            <Route exact path="/nic" render={(props) => <DodajQuiz dodajQuizDoListy={dodajQuizDoListy} idOstatniegoQuizu={getIdOstatniegoQuizu} {...props} />}/>
            {/*filip*/}
            <Route path="/quizy/:quizId" component={RozwiazywanieQuiz} />
            <Route exact path="/logowanie"  render={() =><Logowanie listaUserow={listaUserow} />} />
            <Route exact path="/historiaQuizow" render={()=> <HistoriaQuizow listaQuizow={listaQuizow} listaUserow={listaUserow} /> } />
            <Route exact path="/quizy" render={() => <WyswietlQuizy listaQuizow={listaQuizow} usunQuizZListy={usunQuizZListy} />} />
            {loggedIn ? (
            <Route exact path="/edytuj-quiz/:quizId" render={(props) => <DodajQuiz  dodajQuizDoListy={dodajQuizDoListy} idOstatniegoQuizu={getIdOstatniegoQuizu} listaQuizow={listaQuizow} {...props} />}/>
                ):null}
            <Route exact path="/rozwiaz-quiz/:id" render={(props) => <RozwiazQuiz listaQuizow={listaQuizow} listaUserow={listaUserow} {...props} />} />
            <Route exact path="/zarejestruj"  render={() =><Rejestracja dodajUseraDoListy={dodajUseraDoListy} listaUserow={listaUserow} idOstatniegoUsera={getIdOstatniegoUsera()} />} />
            {loggedIn ? (
            <Route exact path="/profil" render={() => <WyswietlProfil listaUserow={listaUserow} />} />
                ):null}
        </Router>
    );
}

export default HeaderRouting;
