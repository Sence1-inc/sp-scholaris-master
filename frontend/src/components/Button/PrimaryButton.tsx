import React from 'react'
import { Link } from 'react-router-dom'
import './PrimaryButton.css'

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  icon?: string
  url?: string
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  icon,
  url,
}: PrimaryButtonProps) => {
  return (
    <Link to={`${url}`} className="button">
      <button className="button__primary">
        {icon && <img src={`${icon}`} alt="" />}
        <p>{label}</p>
      </button>
    </Link>
  )
}

export default PrimaryButton
