import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Footer.css'

interface LocationTypes {
  pathname: string
}

const Footer: React.FC = () => {
  const location = useLocation() as LocationTypes

  return (
    <footer id="footer">
      <div className="container">
        <div>
          <div className="NavFooter">
            <ul>
              <li>
                <Link to="/scholarships">Listings</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms and Condition</Link>
              </li>
              <li>
                <Link to="/privacy-consent">Privacy Policy</Link>
              </li>
              {location.pathname !== '/' && (
                <li>
                  <Link to="/">Welcome Page</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div>
          <p>
            Scholaris Copyright | Managed by Sence1 | All Rights Reserved 2024
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
