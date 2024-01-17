import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeButton.css';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string,
    icon?: string,
    desc?: string,
    url?: string,
}

function WelcomeButton(props: Props) {
    const { label, icon, desc, url  } = props

    return (
        <Link to={`${url}`} id='button'>
            <button className='button__primary'>
                <img src={`${icon}`} alt='' />
                <p>{label}</p>
                { desc && <span>{desc}</span>}
            </button>
        </Link>

    )
}

export default WelcomeButton;