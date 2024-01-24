import React, { useState } from 'react';
import QuizClass from './klasy/QuizClass';
import PytanieClass from './klasy/PytanieClass';
import OdpowiedziClass from './klasy/OdpowiedziClass';
import {Link} from "react-router-dom";

function DodajQuiz({ dodajQuizDoListy,idOstatniegoQuizu }) {
    const [nazwa, setNazwa] = useState('');
    const [kategoria, setKategoria] = useState('');
    const [pytania, setPytania] = useState([]);

    const [pytanieTekst, setPytanieTekst] = useState('');
    const [odpowiedzi, setOdpowiedzi] = useState([]);
    const [odpowiedzTekst, setOdpowiedzTekst] = useState('');
    const [odpowiedzPrawidlowa, setOdpowiedzPrawidlowa] = useState(false);
    const [numerPoprawnejOdpowiedzi, setNumerPoprawnejOdpowiedzi] = useState(null);
    
    const [quizDodany, setQuizDodany] = useState(false);
    const [quizId, setQuizId] = useState(null);

    const handleDodajOdpowiedz = () => {
        const nowaOdpowiedz = new OdpowiedziClass(odpowiedzi.length, odpowiedzTekst, odpowiedzPrawidlowa);
        setOdpowiedzi([...odpowiedzi, nowaOdpowiedz]);
        setOdpowiedzTekst('');
        setOdpowiedzPrawidlowa(false);
    };

    const handleDodajPytanie = () => {
        const nowePytanie = new PytanieClass(
            pytania.length,
            pytanieTekst,
            odpowiedzi,
            numerPoprawnejOdpowiedzi
        );
        setPytania([...pytania, nowePytanie]);
        setPytanieTekst('');
        setOdpowiedzi([]);
        setNumerPoprawnejOdpowiedzi(null);
    };
    

    const handleDodajQuiz = () => {
        const noweId = idOstatniegoQuizu()+1;
        setQuizId(noweId);
        const dataDodania = new Date();
        const dataWygasniecia = new Date();
        dataWygasniecia.setDate(dataDodania.getDate() + 7)
        const nowyQuiz = new QuizClass(noweId, nazwa, kategoria,dataDodania,dataWygasniecia, pytania);
        dodajQuizDoListy(nowyQuiz);
        setQuizDodany(true);
    };




    return (
        <div id="quizContainer">
            {quizDodany ? (
                <div className="quizDodany">
                    <h2>Quiz został dodany!</h2>
                    <p>ID quizu: {quizId}</p>
                    <p>Nazwa quizu: {nazwa}</p>
                    <Link to={`/rozwiaz-quiz/${quizId}`}>
                        <button>Rozwiąż Quiz</button>
                    </Link>
                </div>
            ) : (
                <>
                    <h2>Dodaj nowy quiz</h2>
                    <label>
                        Nazwa quizu:
                        <input type="text" value={nazwa} onChange={(e) => setNazwa(e.target.value)} placeholder="Nazwa quizu"/>
                    </label>
                    <label>
                        Kategoria:
                        <input type="text" list="categoryList" value={kategoria} onChange={(e) => setKategoria(e.target.value)} placeholder="Kategoria" />
                        <datalist id="categoryList">
                            <option>Przyroda i Środowisko</option>
                            <option>Historia i Kultura</option>
                            <option>Geografia i Miejsca</option>
                            <option>Gastronomia</option>
                            <option>Sport i Rozrywka</option>
                            <option>Sławni Ludzie</option>
                        </datalist>
                    </label>
                    <h3>Dodaj pytanie</h3>
                    <label>
                        Treść pytania:
                        <input type="text" value={pytanieTekst} onChange={(e) => setPytanieTekst(e.target.value)} placeholder="Treść pytania" />
                    </label>
                    <ul className="answer-section">
                        {odpowiedzi.map((odp, index) => (
                            <li key={index} className="answer-item">
                                <input
                                    type="radio"
                                    name="poprawnaOdpowiedz"
                                    onChange={() => setNumerPoprawnejOdpowiedzi(index)}
                                />
                                <span>{odp.tresc}</span>
                            </li>
                        ))}
                    </ul>

                    <label>
                        Tekst odpowiedzi:
                        <input type="text" value={odpowiedzTekst} onChange={(e) => setOdpowiedzTekst(e.target.value)} placeholder="Tekst odpowiedzi" />
                    </label>
                    <button onClick={handleDodajOdpowiedz}>Dodaj odpowiedź</button>
                    <button onClick={handleDodajPytanie}>Dodaj pytanie</button>
                    <button onClick={handleDodajQuiz}>Dodaj quiz</button>

                    <h3>Dodane pytania:</h3>
                    <ul>
                        {pytania.map((pytanie, index) => (
                            <li key={index}>{pytanie.tresc}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );


}

export default DodajQuiz;
