import EmailIcon from '@mui/icons-material/Email'
import { Box, Fab } from '@mui/material'
import React, { useState } from 'react'
import FeatureGuides from '../../components/Feature/FeatureGuides'
import FloatingElement from '../../components/FloatingElement/FloatingElement'
import Newsletter from '../../components/Newsletter/Newsletter'
import Search from '../../components/Search/Search'
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection'
import { STUDENT_TYPE } from '../../constants/constants'
import {
  FEATURES,
  STUDENT_WELCOME_SUBHEADER,
  STUDENT_WELCOME_THIRD_LEVEL_HEADING,
} from '../../data/StudentContent'

const HomePage: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <WelcomeSection
        subheader={STUDENT_WELCOME_SUBHEADER}
        third_level_header={STUDENT_WELCOME_THIRD_LEVEL_HEADING}
      />
      <FeatureGuides features={FEATURES} contentType="studentFeatures" />
      <Search isSection />
      <FloatingElement anchorEl={anchorEl} handleClose={handleClose}>
        <Newsletter
          user_type={STUDENT_TYPE}
          title_content={
            <>
              Hear the latest from{' '}
              <Box sx={{ color: 'var(--secondary-color)' }} component="span">
                Scholaris
              </Box>
            </>
          }
          subtitle_content={'Sign up for our newsletter'}
          description_content={
            'Get the latest news about exciting new features'
          }
        />
      </FloatingElement>
      <Fab
        onClick={handleClick}
        variant="extended"
        sx={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: 'var(--secondary-color)',
          color: 'white',
          padding: '20px',
          '&:hover': {
            backgroundColor: 'var(--primary-color)',
          },
        }}
      >
        <EmailIcon sx={{ mr: 1 }} />
        Subscribe to our Newsletter
      </Fab>
    </>
  )
}

export default HomePage
