import React from 'react';
import { Card, Box, Typography } from '@mui/material';

const theme = {
  cardContainer: {
    width: '70%',
    height: 'auto',
    backgroundColor: '#afc3d9',
    borderRadius: 8
  },
  boxStyle: {
    py: 3, 
    px: 4,
    backgroundColor: '#95a8bd'
  },
  headingStyle: {
    mb: 1,
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#002147',
    textAlign: 'center'
  },
  paragraphStyle: {
    mb: 1,
    fontSize: 18,
    fontWeight: 'light',
    fontFamily: 'Roboto',
    color: '#002147',
    textAlign: 'center'
  },
  boxBodyStyle: {
    width: '100%',
    p: 4,
    display: 'flex',
    flexDirection: 'column'
  }
}

interface AccountCardProps {
  heading?: string,
  subHeading?: string,
  children?: React.ReactNode
}

const AccountCard: React.FC<AccountCardProps> = ({ heading, subHeading, children }) => {
  return (
    <Card sx={theme.cardContainer}>
      <Box sx={theme.boxStyle}>
        <Typography sx={theme.headingStyle}>{ heading }</Typography>
        <Typography sx={theme.paragraphStyle}>{ subHeading }</Typography>
      </Box>
      <Box sx={theme.boxBodyStyle}>
        { children }
      </Box>
      </Card>
  )
}

export default AccountCard;