import PropTypes from "prop-types";


class OdpowiedziClass{
    constructor(id,tresc, jestPrawidlowa) {
        this.id=id;
        this.tresc=tresc;
        this.jestPrawidlowa = jestPrawidlowa;
    }
}

OdpowiedziClass.propTypes = {
    id: PropTypes.number.isRequired,
    tresc: PropTypes.string.isRequired,
    jestPrawidlowa: PropTypes.bool.isRequired,
};
export default OdpowiedziClass;