import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import profileTheme from '../../styles/profileTheme'

interface AccountCardProps {
  heading?: string,
  subHeading?: string,
  children?: React.ReactNode
}

const AccountCard: React.FC<AccountCardProps> = ({ heading, subHeading, children }) => {
  return (
    <Card sx={profileTheme.container.cardContainer}>
      <Box sx={profileTheme.box.boxStyle}>
        <Typography sx={profileTheme.heading.titleHeading1}>{ heading }</Typography>
        <Typography sx={profileTheme.text.textLight}>{ subHeading }</Typography>
      </Box>
      <Box sx={profileTheme.box.boxBodyStyle}>
        { children }
      </Box>
      </Card>
  )
}

export default AccountCard;