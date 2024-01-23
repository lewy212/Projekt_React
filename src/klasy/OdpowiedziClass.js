import PropTypes from "prop-types";


class OdpowiedziClass{
    constructor(id,tresc) {
        this.id=id;
        this.tresc=tresc;
    }
}

OdpowiedziClass.propTypes = {
    id: PropTypes.number.isRequired,
    tresc: PropTypes.string.isRequired,
};
export default OdpowiedziClass;