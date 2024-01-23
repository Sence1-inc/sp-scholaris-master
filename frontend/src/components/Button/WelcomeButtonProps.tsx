import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeButton.css';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string,
  icon?: string,
  desc?: string,
  url?: string,
}

function WelcomeButtonProps(props: Props) {
  const { label, icon, desc, url  } = props

  return (
    <Link to={`${url}`} className='button__welcome'>
      <button className='button__welcome-primary'>
        { icon && <img src={`${icon}`} alt='' /> }
        <p>{label}</p>
        { desc && <span>{desc}</span>}
      </button>
    </Link>
  )
}

export default WelcomeButtonProps;