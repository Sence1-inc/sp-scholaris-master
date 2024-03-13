import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../public/images/logo.png'
import { ctaButtonStyle } from '../../styles/globalStyles'
import './Navbar.css'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const location = useLocation()
  const pathname = location.pathname

  const renderOption = () => {
    if (pathname === '/student') {
      return (
        <ul>
          <li>
            <Link to={{ pathname: '/student', hash: '#newsletter' }}>
              Newsletter
            </Link>
          </li>
          <li>
            <Link to="/student/survey">Survey</Link>
          </li>
          <li>
            <Button sx={ctaButtonStyle} component={Link} to="/scholarships">
              Scholarship Search
            </Button>
          </li>
        </ul>
      )
    }

    if (pathname === '/provider') {
      return (
        <ul>
          <li>
            <Link
              to={{
                pathname: '/provider',
                hash: '#newsletter',
              }}
            >
              Newsletter
            </Link>
          </li>
          <li>
            <Link to="/provider/survey">Survey</Link>
          </li>
          <li>
            <Button sx={ctaButtonStyle} component={Link} to="/scholarships">
              Scholarship Search
            </Button>
          </li>
        </ul>
      )
    }

    return (
      <ul>
        <li>
          <Button sx={ctaButtonStyle} component={Link} to="/scholarships">
            Scholarship Search
          </Button>
        </li>
      </ul>
    )
  }

  return (
    <nav id="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src={Logo} alt="Scholaris Logo" />
        </Link>
      </div>
      <div className={`navbar__menu-main ${isOpen && 'open'}`}>
        {renderOption()}
      </div>
      <div
        className="navbar__menu-hamburger"
        onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
      >
        <div className="burger burger_1"></div>
        <div className="burger burger_1"></div>
        <div className="burger burger_1"></div>
      </div>
    </nav>
  )
}

export default Navbar
