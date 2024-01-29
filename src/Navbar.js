import React from 'react'
import {Link} from "react-router-dom";

const Navbar = () => {
    return(
        <div className="topnav">
            <div className="navLogoBox">
            <Link to="/" className="navLogo">
                <img src="/logo.png" alt="żubr" style={{ height: "100px", margin: "25px"}} />
            </Link>
            </div>

            <div className="topnavElements">
                <Link to="/" className="navElement">Home</Link>
                <Link to="/quizy" className="navElement">Quizy</Link>
                <Link to="/nic" className="navElement">nic</Link>
            </div>
        </div>
    )
}
export default Navbar;