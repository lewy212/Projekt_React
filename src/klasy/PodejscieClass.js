import PropTypes from "prop-types";
import UserClass from "./UserClass";

class PodejscieClass {
    constructor(id, uzytkownik, poprawne_odpowiedzi, suma_odpowiedzi) {
        this.id = id;
        this.uzytkownik = uzytkownik;
        this.poprawne_odpowiedzi = poprawne_odpowiedzi;
        this.suma_odpowiedzi = suma_odpowiedzi;
    }
}

PodejscieClass.propTypes = {
    id: PropTypes.number.isRequired,
    uzytkownik: PropTypes.instanceOf(UserClass).isRequired,
    poprawne_odpowiedzi: PropTypes.number.isRequired,
    suma_odpowiedzi: PropTypes.number.isRequired,
};

export default PodejscieClass;