import PropTypes from "prop-types";
import UserClass from "./UserClass";

class PodejscieClass {
    constructor(id, uzytkownik, poprawne_odpowiedzi, wszystkie_odpowiedzi) {
        this.id = id;
        this.uzytkownik = uzytkownik;
        this.poprawne_odpowiedzi = poprawne_odpowiedzi;
        this.wszystkie_odpowiedzi = wszystkie_odpowiedzi;
    }
}

PodejscieClass.propTypes = {
    id: PropTypes.number.isRequired,
    uzytkownik: PropTypes.instanceOf(UserClass).isRequired,
    poprawne_odpowiedzi: PropTypes.number.isRequired,
    wszystkie_odpowiedzi: PropTypes.number.isRequired,
};

export default PodejscieClass;