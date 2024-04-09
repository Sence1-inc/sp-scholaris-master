import { Box, Button, ButtonGroup, Card, Typography } from '@mui/material'
import React from 'react'
import profileTheme from '../../styles/profileTheme'

interface AccountCardProps {
  heading?: string
  subHeading?: string
  children?: React.ReactNode
  handleEdit?: (edit: boolean) => void
  isEditting?: boolean
}

const AccountCard: React.FC<AccountCardProps> = ({
  heading,
  subHeading,
  handleEdit,
  isEditting,
  children,
}) => {
  const handleSave = () => {}

  return (
    <Card sx={profileTheme.container.cardContainer}>
      <Box sx={profileTheme.box.boxStyle}>
        <Typography sx={profileTheme.heading.titleHeading1}>
          {heading}
        </Typography>
        <Typography sx={profileTheme.text.textLight}>{subHeading}</Typography>
      </Box>
      <Box sx={profileTheme.box.boxBodyStyle}>{children}</Box>
      {handleEdit && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            p: 4,
          }}
        >
          {!isEditting ? (
            <Button
              sx={{ borderRadius: '32px' }}
              variant="contained"
              onClick={() => handleEdit(true)}
            >
              Edit
            </Button>
          ) : (
            <ButtonGroup>
              <Button
                sx={{ borderRadius: '32px' }}
                variant="contained"
                onClick={() => handleEdit(false)}
              >
                Cancel
              </Button>
              <Button
                sx={{ borderRadius: '32px' }}
                variant="contained"
                color="secondary"
                onClick={handleSave}
              >
                Save
              </Button>
            </ButtonGroup>
          )}
        </Box>
      )}
    </Card>
  )
}

export default AccountCard
