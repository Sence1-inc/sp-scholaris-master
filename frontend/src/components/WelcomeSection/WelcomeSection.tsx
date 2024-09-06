import { Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'
import CTAButton from '../CustomButton/CTAButton'

import './WelcomeSection.css'

interface WelcomeSectionProps {
  subheader?: string
  third_level_header?: string
  usertype?: string
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  subheader,
  third_level_header,
  usertype,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(
    (state) => state.persistedReducer.isAuthenticated
  )

  return (
    <section
      className={
        usertype === 'provider'
          ? 'section__welcome section__welcome__provider'
          : 'section__welcome section__welcome__student'
      }
    >
      <div className="container">
        <Typography variant="h2">
          {usertype === 'provider' ? (
            <span className="h-subtext-gradient">
              Bridging Students and Education through{' '}
            </span>
          ) : (
            <span className="h-subtext-gradient">Welcome to </span>
          )}
          <span className="color-secondary h-subtext">Scholaris</span>
        </Typography>
        {subheader && <Typography variant="h3">{subheader}</Typography>}
        {third_level_header && (
          <Typography variant="h4">{third_level_header}</Typography>
        )}
        <div
          className={
            location.pathname === '/student'
              ? 'section__buttons section__buttons__student'
              : 'section__buttons'
          }
        >
          <CTAButton
            id="search-scholarship"
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
              fontSize: { xs: '0.9rem', sm: '1.1rem' },
              fontWeight: 700,
              width: '80%',
              padding: { xs: '10px 10px', md: '12px 20px' },
            }}
          />
          {!isAuthenticated && (
            <CTAButton
              id="have-an-account"
              handleClick={() => navigate('/sign-in')}
              label="Have an account?"
              loading={false}
              styles={{
                fontSize: { xs: '0.9rem', sm: '1.1rem' },
                fontWeight: 700,
                width: '80%',
                padding: { xs: '10px 10px', md: '12px 20px' },
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
