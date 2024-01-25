import React, { useState, useEffect } from 'react';
import QuizClass from './klasy/QuizClass';
import PytanieClass from './klasy/PytanieClass';
import OdpowiedziClass from './klasy/OdpowiedziClass';
import { Link, useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
function DodajQuiz({ dodajQuizDoListy, idOstatniegoQuizu, listaQuizow }) {
    const { quizId } = useParams();
    const [nazwa, setNazwa] = useState('');
    const [kategoria, setKategoria] = useState('');
    const [pytania, setPytania] = useState([]);

    const [pytanieTekst, setPytanieTekst] = useState('');
    const [odpowiedzi, setOdpowiedzi] = useState([]);
    const [odpowiedzTekst, setOdpowiedzTekst] = useState('');
    const [odpowiedzPrawidlowa, setOdpowiedzPrawidlowa] = useState(false);
    const [numerPoprawnejOdpowiedzi, setNumerPoprawnejOdpowiedzi] = useState(null);

    const [bladWalidacjiPytania, setBladWalidacjiPytania] = useState('');
    const [bladWalidacjiOdpowiedzi, setBladWalidacjiOdpowiedzi] = useState('');
    const [bladWalidacjiQuizu, setBladWalidacjiQuizu] = useState('');
    const [quizDodany, setQuizDodany] = useState(false);
    const [quizIdState, setQuizIdState] = useState(null);
    

    useEffect(() => {
        console.log(listaQuizow);
        if (quizId && listaQuizow) {
            const quizDoEdycji = listaQuizow.find((quiz) => quiz.id === parseInt(quizId));
            if (quizDoEdycji) {
                setQuizIdState(quizDoEdycji.id);
                setNazwa(quizDoEdycji.nazwa);
                setKategoria(quizDoEdycji.kategoria);
                setPytania(quizDoEdycji.listaPytan);
            }
        }
    }, [quizId, listaQuizow]);
    function czyNieZawieraZnakowSpecjalnych(tekst) {
        const regex = /^[a-zA-Z0-9 ]+$/; // Znaki alfanumeryczne
        return regex.test(tekst);
    }

    function zaczynaSieWielkaLitera(tekst) {
        return tekst.charAt(0) === tekst.charAt(0).toUpperCase();
    }

    const handleDodajOdpowiedz = () => {
        if (!odpowiedzTekst || odpowiedzTekst.length < 2 || !czyNieZawieraZnakowSpecjalnych(odpowiedzTekst)) {
            setBladWalidacjiOdpowiedzi('Uzupełnij odpowiedz (min:2, brak znakow specjalnych)');
            return;
        }

        const nowaOdpowiedz = new OdpowiedziClass(odpowiedzi.length, odpowiedzTekst, odpowiedzPrawidlowa);
        setOdpowiedzi([...odpowiedzi, nowaOdpowiedz]);
        setOdpowiedzTekst('');
        setBladWalidacjiOdpowiedzi('');
        setOdpowiedzPrawidlowa(false);
    };

    const handleDodajPytanie = () => {
        if (
            !pytanieTekst ||
            odpowiedzi.length < 2 ||
            numerPoprawnejOdpowiedzi === null ||
            odpowiedzi.length > 30 ||
            !zaczynaSieWielkaLitera(pytanieTekst)
        ) {
            setBladWalidacjiPytania('Uzupełnij pytanie (min:5, max:30, zaznaczona odpowiedz, zaczyna sie wielka litera, min 2 odpowiedzi)');
            return;
        }

        const nowePytanie = new PytanieClass(pytania.length, pytanieTekst, odpowiedzi, numerPoprawnejOdpowiedzi);
        setPytania([...pytania, nowePytanie]);
        setPytanieTekst('');
        setOdpowiedzi([]);
        setBladWalidacjiPytania('');
        setNumerPoprawnejOdpowiedzi(null);
    };

    {/* start edycji, alert? */}

    const handleEdytujPytanieTekst = (e, index) => {
        const updatedPytania = [...pytania];
        updatedPytania[index].tresc = e.target.value;
        setPytania(updatedPytania);
    };
    
    const handleEdytujPoprawnaOdpowiedz = (pytanieIndex, odpIndex) => {
        const updatedPytania = [...pytania];
        updatedPytania[pytanieIndex].poprawnaOdpowiedz = odpIndex;
        setPytania(updatedPytania);
    };
    
    const handleEdytujOdpowiedzTekst = (e, pytanieIndex, odpIndex) => {
        const updatedPytania = [...pytania];
        updatedPytania[pytanieIndex].odpowiedzi[odpIndex].tresc = e.target.value;
        setPytania(updatedPytania);
    };
    
    const handleZapiszEdycjePytania = (index) => {
        const updatedPytania = [...pytania];
        setPytania(updatedPytania);
        alert(`Pytanie ${index + 1} zostało zaktualizowane.`);
    };
    
    const handleUsunOdpowiedz = (pytanieIndex, odpIndex) => {
        const updatedPytania = [...pytania];
        updatedPytania[pytanieIndex].odpowiedzi.splice(odpIndex, 1);
        setPytania(updatedPytania);
    };
    
    const handleZapiszEdycjeOdpowiedzi = (pytanieIndex, odpIndex) => {
        alert(`Zapisano zmiany odpowiedzi w pytaniu ${pytanieIndex + 1}.`);
    };

    const handleDodajNowaOdpowiedz = (pytanieIndex) => {
        const nowaOdpowiedz = new OdpowiedziClass(0, "", false);
        const updatedPytania = [...pytania];
        if (!updatedPytania[pytanieIndex].odpowiedzi) {
            updatedPytania[pytanieIndex].odpowiedzi = [];
        }
        updatedPytania[pytanieIndex].odpowiedzi.push(nowaOdpowiedz);
        setPytania(updatedPytania);
    };
    
    


    const handleDodajQuiz = () => {

        if (!nazwa || nazwa.length < 5 || nazwa.length > 20) {
            setBladWalidacjiQuizu('Uzupełnij Quiz (min:5, max:20, data wygasniecia conajmniej dzien pozniej)');
            return;
        }

        if (quizIdState) {

            // Edycja istniejącego quizu
            const quizDoEdycji = listaQuizow.find((quiz) => quiz.id === quizIdState);
            if (quizDoEdycji) {
                quizDoEdycji.nazwa = nazwa;
                quizDoEdycji.kategoria = kategoria;
                quizDoEdycji.listaPytan = pytania;
                setQuizDodany(true);

                // logika edycji, np. zaktualizowanie stanu aplikacji, wysłanie żądania na serwer itp.
            }
        } else {
            const noweId = idOstatniegoQuizu() + 1;
            setQuizIdState(noweId);
            const dataDodania = new Date();
            const dataWygasniecia = new Date();
            dataWygasniecia.setDate(dataDodania.getDate() + 7);
            const nowyQuiz = new QuizClass(noweId, nazwa, kategoria, dataDodania, dataWygasniecia, pytania);
            dodajQuizDoListy(nowyQuiz);
            setBladWalidacjiQuizu('');
            setQuizDodany(true);
        }
    };
    if (quizDodany) {
        return <Redirect to="/quizy" />;
    }
    return (
        <div id="quizContainer">
            {quizDodany ? (
                <div className="quizDodany">
                    <h2>Quiz został dodany!</h2>
                    <p>ID quizu: {quizIdState}</p>
                    <p>Nazwa quizu: {nazwa}</p>
                    <Link to={`/rozwiaz-quiz/${quizIdState}`}>
                        <button>Rozwiąż Quiz</button>
                    </Link>
                </div>
            ) : (
                <>
                    <h2>{quizIdState ? 'Edytuj quiz' : 'Dodaj nowy quiz'}</h2>
                    <label>
                        {bladWalidacjiQuizu && <p style={{ color: 'red' }}>{bladWalidacjiQuizu}</p>}
                        Nazwa quizu:
                        <input type="text" value={nazwa} onChange={(e) => setNazwa(e.target.value)} placeholder="Nazwa quizu" />
                    </label>
                    <label>
                        Kategoria:
                        <select value={kategoria} onChange={(e) => setKategoria(e.target.value)}>
                            <option value="Przyroda i Środowisko">Przyroda i Środowisko</option>
                            <option value="Historia i Kultura">Historia i Kultura</option>
                            <option value="Geografia i Miejsca">Geografia i Miejsca</option>
                            <option value="Gastronomia">Gastronomia</option>
                            <option value="Sport i Rozrywka">Sport i Rozrywka</option>
                            <option value="Sławni Ludzie">Sławni Ludzie</option>
                        </select>
                    </label>

                    <h3 style={{ marginbottom: "25px" }}>Dodaj pytanie</h3>
                    {bladWalidacjiPytania && <p style={{ color: 'red' }}>{bladWalidacjiPytania}</p>}
                    <label>
                        Treść pytania:
                        <input type="text" value={pytanieTekst} onChange={(e) => setPytanieTekst(e.target.value)} placeholder="Treść pytania" />
                    </label>
                    <ul className="answer-section">
                        {odpowiedzi.map((odp, index) => (
                            <li key={index} className="answer-item">
                                <input type="radio" name="poprawnaOdpowiedz" onChange={() => setNumerPoprawnejOdpowiedzi(index)} />
                                <span>{odp.tresc}</span>
                            </li>
                        ))}
                    </ul>
                    {bladWalidacjiOdpowiedzi && <p style={{ color: 'red' }}>{bladWalidacjiOdpowiedzi}</p>}
                    <label>
                        Tekst odpowiedzi
                        <input type="text" value={odpowiedzTekst} onChange={(e) => setOdpowiedzTekst(e.target.value)} placeholder="Tekst odpowiedzi" />
                    </label>
                    <button onClick={handleDodajOdpowiedz}>Dodaj odpowiedź</button>
                    <button onClick={handleDodajPytanie}>Dodaj pytanie</button>
                    <button onClick={handleDodajQuiz}>{quizIdState ? 'Edytuj quiz' : 'Dodaj quiz'}</button>

{/*Warunek quizId, co oznacza ze jestes w trybie edycji - wow */}
{quizId && (
    <div>
        <h3>Dodane pytania:</h3>
        <ul>
            {pytania.map((pytanie, pytanieIndex) => (
                <li key={pytanieIndex}>
                    <hr style={{ height: "5px", border: "none", backgroundColor: "black", marginTop: "75px", marginBottom: "75px" }} />
                    <label>
                        Treść pytania:
                        <input type="text" value={pytanie.tresc} onChange={(e) => handleEdytujPytanieTekst(e, pytanieIndex)} />
                    </label>
                    <ul>

                        {/*

                        {pytanie.odpowiedzi && pytanie.odpowiedzi.map((odp, odpIndex) => (
                            <li key={odpIndex}>
                                <input type="radio" name={`poprawnaOdpowiedz${pytanieIndex}`} checked={pytanie.poprawnaOdpowiedz === odpIndex} onChange={() => handleEdytujPoprawnaOdpowiedz(pytanieIndex, odpIndex)} />
                                <label>
                                    Odpowiedź:
                                    <input type="text" value={odp.tresc} onChange={(e) => handleEdytujOdpowiedzTekst(e, pytanieIndex, odpIndex)} />
                                </label>
                                <button className="deleteButton" onClick={() => handleUsunOdpowiedz(pytanieIndex, odpIndex)}>Usuń odpowiedź</button>
                            </li>
                        ))}

                        */}

                        {/*<button onClick={() => handleDodajNowaOdpowiedz(pytanieIndex)}>Dodaj nową odpowiedź</button>*/}
                    </ul>
                    <button onClick={() => handleZapiszEdycjePytania(pytanieIndex)}>Zapisz zmiany pytania</button>
                </li>
            ))}
        </ul>
    </div>
)}




                </>
            )}
        </div>
    );
}

export default DodajQuiz;
