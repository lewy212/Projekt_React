import PropTypes from 'prop-types';
import OdpowiedziClass from "./OdpowiedziClass";

class PytanieClass{
    constructor(id,tresc,listaOdpowiedzi, numerPoprawnejOdpowiedzi) {
        this.id=id;
        this.tresc=tresc;
        this.listaOdpowiedzi = listaOdpowiedzi;
        this.numerPoprawnejOdpowiedzi = numerPoprawnejOdpowiedzi
    }
}

PytanieClass.propTypes = {
    id: PropTypes.number.isRequired,
    tresc: PropTypes.string.isRequired,
    listaOdpowiedzi: PropTypes.arrayOf(PropTypes.instanceOf(OdpowiedziClass)).isRequired,
    numerPoprawnejOdpowiedzi: PropTypes.number.isRequired,
};
export default PytanieClass;