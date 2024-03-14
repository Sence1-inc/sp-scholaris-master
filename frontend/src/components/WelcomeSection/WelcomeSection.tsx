import { Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import PrimaryButton from '../Button/PrimaryButton'

import './WelcomeSection.css'

interface WelcomeSectionProps {
  subheader?: string
  third_level_header?: string
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  subheader,
  third_level_header,
}) => {
  const location = useLocation()

  return (
    <section className="section__welcome">
      <div className="container">
        <Typography variant="h2" sx={{ mb: 2 }}>
          Welcome to <span className="color-secondary">Scholaris</span>
        </Typography>
        {subheader && <Typography variant="h3">{subheader}</Typography>}
        {third_level_header && (
          <Typography variant="h4">{third_level_header}</Typography>
        )}
        <div className="section__buttons">
          <PrimaryButton
            url={
              location.pathname === '/student'
                ? '/student#search'
                : '/provider#features'
            }
            label={
              location.pathname === '/student'
                ? 'Seach Scholarships'
                : 'Get Started'
            }
          />
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
