import React from 'react';

const WyswietlDaneQuizu = ({quiz}) => {
    return (
        <div>
            <h3>{quiz.nazwa}</h3>
            <p>Kategoria: {quiz.kategoria}</p>
            <p>Data dodania: {quiz.dataDodaniaQuizu.toLocaleDateString()}</p>
            <p>Data wygaśnięcia: {quiz.dataWygasnieciaQuizu.toLocaleDateString()}</p>
        </div>
    );
};

export default WyswietlDaneQuizu;
