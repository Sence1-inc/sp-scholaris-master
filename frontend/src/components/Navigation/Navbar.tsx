import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav id='navbar'>
        <div className='navbar__logo'>
            <img src='' alt='' />
            <h1><Link to='/'>Scholaris</Link></h1>
        </div>
        <div className={`navbar__menu-main ${isOpen && 'open'}` }>
            <ul>
                <li><Link to='/newsletter'>Newsletter</Link></li>
                <li><Link to='/survey'>Survey</Link></li>
            </ul>
        </div>
        <div className="navbar__menu-hamburger" onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
          <div className="burger burger_1"></div>
          <div className="burger burger_1"></div>
          <div className="burger burger_1"></div>
        </div>
    </nav>
  );
}

export default Navbar;
