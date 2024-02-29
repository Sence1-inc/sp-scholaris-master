import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../public/images/logo.png";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = window.location.pathname;

  return (
    <nav id="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src={Logo} alt="Scholaris Logo" />
        </Link>
      </div>
      <div className={`navbar__menu-main ${isOpen && "open"}`}>
        <ul>
          {pathname === "/student" ? (
            <>
              <li>
                <Link to={{ pathname: "/student", hash: "#newsletter" }}>
                  Newsletter
                </Link>
              </li>
              <li>
                <Link to="/student/survey">Survey</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/provider/survey">Survey</Link>
            </li>
          )}
          <li>
            <Link to="/scholarships">Search</Link>
          </li>
        </ul>
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
  );
};

export default Navbar;
