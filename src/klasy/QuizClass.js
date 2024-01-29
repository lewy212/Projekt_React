import PropTypes from "prop-types";
import PytanieClass from "./PytanieClass";
import PodejscieClass from "./PodejscieClass";

class QuizClass{
    constructor(id,nazwa,kategoria,dataDodaniaQuizu,dataWygasnieciaQuizu, listaPytan, listaPodejsc = []) {
        this.id=id;
        this.nazwa=nazwa;
        this.kategoria=kategoria;
        this.dataDodaniaQuizu=dataDodaniaQuizu;
        this.dataWygasnieciaQuizu = dataWygasnieciaQuizu;
        this.listaPytan = listaPytan;
        this.listaPodejsc = listaPodejsc;
    }
}

QuizClass.propTypes = {
    id: PropTypes.number.isRequired,
    nazwa: PropTypes.string.isRequired,
    kategoria: PropTypes.string.isRequired,
    dataDodaniaQuizu: PropTypes.instanceOf(Date).isRequired,
    dataWygasnieciaQuizu: PropTypes.instanceOf(Date).isRequired,
    listaPytan: PropTypes.arrayOf(PropTypes.instanceOf(PytanieClass)),
    listaPodejsc: PropTypes.arrayOf(PropTypes.instanceOf(PodejscieClass)),
};

export default QuizClass;