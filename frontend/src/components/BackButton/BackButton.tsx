import React from 'react';
import { Link } from 'react-router-dom';
import './BackButton.css'

interface ButtonProps {
  text: string;
  url?: string;
}

const Button: React.FC<ButtonProps> = ({ text, url }) => {
  return (
    <Link to={`${url}`} id='back-button'>{text}</Link>
  );
};

export default Button;