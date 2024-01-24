import PropTypes from "prop-types";
import PytanieClass from "./PytanieClass";

class QuizClass{
    constructor(id,nazwa,kategoria,listaPytan) {
        this.id=id;
        this.nazwa=nazwa;
        this.kategoria=kategoria;
        this.listaPytan = listaPytan;
    }
}


QuizClass.propTypes = {
    id: PropTypes.number.isRequired,
    nazwa: PropTypes.string.isRequired,
    kategoria: PropTypes.string.isRequired,
    listaPytan: PropTypes.arrayOf(PropTypes.instanceOf(PytanieClass)),
};

export default QuizClass;