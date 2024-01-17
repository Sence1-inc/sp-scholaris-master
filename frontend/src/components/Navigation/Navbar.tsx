import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <nav id='navbar'>
        <div className='navbar__logo'>
            <img src='' alt='' />
            <h1><Link to='/'>Scholaris</Link></h1>
        </div>
        <div className='navbar__menu-main'>
            <ul>
                <li><Link to='/newsletter'>Newsletter</Link></li>
                <li><Link to='/survey'>Survey</Link></li>
            </ul>
        </div>
    </nav>
  );
}

export default Navbar;
