import { Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'
import CTAButton from '../CustomButton/CTAButton'

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
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(
    (state) => state.persistedReducer.isAuthenticated
  )

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
          <CTAButton
            handleClick={() =>
              location.pathname === '/student'
                ? navigate('/scholarships')
                : navigate('/sign-up')
            }
            label={
              location.pathname === '/student'
                ? 'Search Scholarships'
                : 'Get Started'
            }
            loading={false}
            styles={{
              fontSize: '1.25rem',
              fontWeight: 700,
              width: 'auto',
              margin: '0 20px',
            }}
          />
          {location.pathname === '/provider' && !isAuthenticated && (
            <CTAButton
              handleClick={() => navigate('/sign-in')}
              label="Have an account?"
              loading={false}
              styles={{
                fontSize: '1.25rem',
                fontWeight: 700,
                width: 'auto',
                margin: '0 20px',
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
