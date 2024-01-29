import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QuizClass from './klasy/QuizClass';
const Ranking = ({ quizzes }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [expandedQuizzes, setExpandedQuizzes] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleClick = (quiz) => {
    console.log('Selected Quiz:', quiz);
    setSelectedQuiz(quiz);
  };

  const handleToggleExpand = (quizId) => {
    setExpandedQuizzes((prevExpanded) => {
      if (prevExpanded.includes(quizId)) {
        return prevExpanded.filter((id) => id !== quizId);
      } else {
        return [...prevExpanded, quizId];
      }
    });
  };

  const isQuizExpanded = (quizId) => Array.isArray(expandedQuizzes) && expandedQuizzes.includes(quizId);
  
  const calculatePercentage = (score, total) => {
    if (total === 0) {
      return 0;
    }
    return (score / total) * 100;
  };

  const calculateTotalCorrectAnswers = (podejscia) => {
    if (!podejscia || !podejscia.length) {
      return 0;
    }
    const totalCorrectAnswers = podejscia.reduce((sum, podejscie) => sum + podejscie.poprawne_odpowiedzi, 0);
    const totalAnswers = podejscia.reduce((sum, podejscie) => sum + podejscie.wszystkie_odpowiedzi, 0);

    return calculatePercentage(totalCorrectAnswers, totalAnswers);
  };

  const handleSort = () => {
    // Zmiana kierunku sortowania
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  // Sortowanie quizów według procentu poprawnych odpowiedzi
  const sortedQuizzes = quizzes.slice().sort((quizA, quizB) => {
    const scoreA = calculateTotalCorrectAnswers(quizA.listaPodejsc || []);
    const scoreB = calculateTotalCorrectAnswers(quizB.listaPodejsc || []);

    if (sortDirection === 'desc') {
      return scoreA - scoreB;
    } else {
      return scoreB - scoreA;
    }
  });

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '150px' }}>Ranking Quizów</h2>
      <h2 style={{ textAlign: 'center' }}>(Quizy posortowane w zależności od poprawności odpowiedzi)</h2>
      <h2 style={{ textAlign: 'center' }}>
        <button onClick={handleSort}>
          Sortuj {sortDirection === 'asc' ? 'rosnąco' : 'malejąco'}
        </button>
      </h2>
      <div className="quiz-list">

        <div>
          {sortedQuizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">

              <h3>{quiz.nazwa}</h3>
              <p>Kategoria: {quiz.kategoria}</p>
              <p>Wynik procentowy: {calculateTotalCorrectAnswers(quiz.listaPodejsc || 0).toFixed(2)}%</p>
              <p>Liczba podejść: {quiz.listaPodejsc.length}</p>
              <div>
                <button onClick={() => handleToggleExpand(quiz.id)}>
                  {isQuizExpanded(quiz.id) ? 'Zwiń' : 'Rozwiń'} Podejścia
                </button>
              </div>
              {isQuizExpanded(quiz.id) && quiz.listaPodejsc && (
                <ul>
                  {quiz.listaPodejsc.map((podejscie) => (
                    <li key={podejscie.id}>
                      Użytkownik: {podejscie.uzytkownik.nick}, Odpowiedzi: {podejscie.poprawne_odpowiedzi}\{podejscie.wszystkie_odpowiedzi}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      {selectedQuiz && selectedQuiz.listaPodejsc && (
        <div>
          <h3>Podejścia do quizu: {selectedQuiz.nazwa}</h3>
          <ul>
            {selectedQuiz.listaPodejsc.map((podejscie) => (
              <li key={podejscie.id}>
                Użytkownik: {podejscie.uzytkownik?.nick || 'Brak'}, Poprawne odpowiedzi: {podejscie.poprawne_odpowiedzi || 0} / {podejscie.wszystkie_odpowiedzi || 0}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Ranking.propTypes = {
  quizzes: PropTypes.arrayOf(PropTypes.instanceOf(QuizClass)).isRequired,
};

export default Ranking;