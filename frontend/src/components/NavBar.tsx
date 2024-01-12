import React from 'react';
import './NavBar.css'

function NavBar() {
  return (
    <nav id="navBar">
        <div className="navBar__logo">
            <img src="" alt="" />
            <h1>Scholaris</h1>
        </div>
        <div className="navBar__menu-main">
            <ul>
                <li>Newsletter</li>
                <li>Survey</li>
            </ul>
        </div>
    </nav>
  );
}

export default NavBar;
