import React from 'react';
import './Navbar.css'

function Navbar() {
  return (
    <nav id="navbar">
        <div className="navbar__logo">
            <img src="" alt="" />
            <h1>Scholaris</h1>
        </div>
        <div className="navbar__menu-main">
            <ul>
                <li>Newsletter</li>
                <li>Survey</li>
            </ul>
        </div>
    </nav>
  );
}

export default Navbar;
