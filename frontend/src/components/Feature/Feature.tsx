import './Feature.css'
import React from 'react'
import { Box, Typography } from '@mui/material'

const Feature: React.FC<FeatureProps> = ({ title, desc, image, isEven }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: `${isEven ? 'row-reverse' : 'row'}`,
        },
        gap: '20px',
        alignItems: {xs: 'center', md: 'flex-start'},
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body1" sx={{ textAlign: 'justify'}}>{desc}</Typography>
      </Box>
      <img className="featureGuides__feature-img" src={image} alt="provider" />
    </Box>
  )
}

export default Feature
