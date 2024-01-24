import React from 'react'
import {Link} from "react-router-dom";

const Navbar = () => {
    return(
        <div className="topnav">
            <div className="topnavElements">
                <Link to="/" className="navElement">Home</Link>
                <Link to="/quizy" className="navElement">Quizy</Link>
            </div>
        </div>
    )
}
export default Navbar;