import PropTypes from "prop-types";


class UserClass{
    constructor(id,nick,haslo,listaIdQuizow) {
        this.id=id;
        this.nick=nick;
        this.haslo=haslo;
        this.listaIdQuizow = listaIdQuizow;
    }
}

UserClass.propTypes = {
    id: PropTypes.number.isRequired,
    nick: PropTypes.string.isRequired,
    haslo: PropTypes.string.isRequired,
    listaIdQuizow: PropTypes.arrayOf(PropTypes.number),
};

export default UserClass;