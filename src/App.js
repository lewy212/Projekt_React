import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrzykladowyQuiz from "./PrzykladowyQuiz";
import HeaderRouting from "./HeaderRouting";
import Navbar from "./Navbar";
import QuizClass from "./klasy/QuizClass";
import PytanieClass from "./klasy/PytanieClass";
import OdpowiedziClass from "./klasy/OdpowiedziClass";
import WyswietlQuizy from "./WyswietlQuizy";
import {AuthProvider} from "./AuthContext";
import UserClass from "./klasy/UserClass";

class App extends Component {
    constructor(props) {
        super(props);
        const dataDodania = new Date();
        const dataWygasniecia = new Date();
        dataWygasniecia.setDate(dataDodania.getDate() + 7)
        this.state = {
            listaQuizow: [new QuizClass(1,"Zwierzęta na podlasiu","Zwierzęta",dataDodania,dataWygasniecia,
                [new PytanieClass(1,"Ktore z tych zwierzat jest pod ochrona",[new OdpowiedziClass(1,"Wilk"),
                    new OdpowiedziClass(2,"Kogut"),new OdpowiedziClass(3,"Bizon"),new OdpowiedziClass(4,"Bocian biały")],4),
                new PytanieClass(2,"Najpopularniejsze zwierzę na podlasiu",[new OdpowiedziClass(5,"Lis"),new OdpowiedziClass(6,"Kogut"),
                new OdpowiedziClass(7,"Żyrafa"),new OdpowiedziClass(8,"Dziki")],4)]),
            new QuizClass(2,"Miasta na podlasiu","Miasta",dataDodania,dataWygasniecia,[])],
            listaUserow:[new UserClass(1,"user","user",[1,1]),new UserClass(2,"user2","user2",[])]
        };
    }

    dodajQuizDoListy = (quiz) => {
        this.setState(prevState => ({
            listaQuizow: [...prevState.listaQuizow, quiz],
        }));
    }

    usunQuizZListy = (id) => {
        this.setState(prevState => ({
            listaQuizow: prevState.listaQuizow.filter(quiz => quiz.id !== id),
        }));
    }
    render() {
        console.log(this.state.listaQuizow)
        return (
            <div>
                <AuthProvider>
                <HeaderRouting listaQuizow={this.state.listaQuizow} dodajQuizDoListy={this.dodajQuizDoListy} usunQuizZListy={this.usunQuizZListy} listaUserow={this.state.listaUserow}/>
                </AuthProvider>
                    {/*<WyswietlQuizy listaQuizow={this.state.listaQuizow} />*/}
            </div>
        )}
}
export default App;