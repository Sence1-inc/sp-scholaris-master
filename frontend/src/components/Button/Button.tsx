import React from 'react'
import { Link } from 'react-router-dom'

import './Button.css'

interface ButtonProps {
  children: React.ReactNode
  url?: string
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({ children, url, handleClick }) => {
  const buttonContent = (
    <button className="button__primary" onClick={handleClick}>
      <p>{children}</p>
    </button>
  )

  return url ? (
    <Link to={url} className="button">
      {buttonContent}
    </Link>
  ) : (
    <div className="button">{buttonContent}</div>
  )
}

export default Button
