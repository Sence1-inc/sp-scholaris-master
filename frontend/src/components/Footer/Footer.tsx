import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer id='footer'>
            <div className='footer__container'>
                <div>
                    <div className='NavFooter'>
                        <ul>
                            <li><Link to='/newsletter'>Newsletter</Link></li>
                            <li><Link to='/newsletter'>Listing</Link></li>
                            <li><Link to='/terms-and-condition'>Terms and Condition</Link></li>
                            <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
                            <li><Link to='/'>Welcome Page</Link></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p>Scholaris Copyright | All Rights Reserved 2024</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;