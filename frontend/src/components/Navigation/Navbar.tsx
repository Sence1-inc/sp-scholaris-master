import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../public/images/logo.png';
import './Navbar.css'

const Navbar: React.FC = () =>  {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  
  return (
    <nav id='navbar'>
        <div className='navbar__logo'>
            <Link to='/'><img src={Logo} alt='Scholaris Logo' /></Link>
        </div>
        <div className={`navbar__menu-main ${isOpen && 'open'}` }>
            <ul>
                <li><Link to='/scholarships'>Search</Link></li>
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
