import './Feature.css'
import React from 'react'
import { Box, Typography } from '@mui/material'

const Feature: React.FC<FeatureProps> = ({ title, desc, image, isEven }) => {
  return (
    <Box
      sx={{
        width: { xs: '70vw', md: '100%' },
        margin: 'auto',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: `${isEven ? 'row-reverse' : 'row'}`,
        },
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body1">{desc}</Typography>
      </Box>
      <img className="featureGuides__feature-img" src={image} alt="provider" />
    </Box>
  )
}

export default Feature
