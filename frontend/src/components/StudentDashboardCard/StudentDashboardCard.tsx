import { Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import PrimaryButton from '../CustomButton/PrimaryButton'

interface StudentDashboardCardProps {
  children: React.ReactNode
  title: string
  icon: React.ReactNode
  handleSave: () => void
  handleCancel: () => void
}

const StudentDashboardCard: React.FC<StudentDashboardCardProps> = ({
  children,
  title,
  icon,
  handleSave,
  handleCancel,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: '16px',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          backgroundColor: 'secondary.main',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          padding: '10px 20px 10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          {icon}
          <Typography variant="body2" sx={{ color: 'common.white' }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button
            onClick={handleCancel}
            variant="text"
            sx={{ color: 'common.white' }}
          >
            Cancel
          </Button>
          <PrimaryButton
            handleClick={handleSave}
            label="Save"
            loading={false}
            styles={{ padding: '4px', fontSize: 'body2' }}
          />
        </Box>
      </Toolbar>
      <Box sx={{ padding: '10px 20px 10px 20px' }}>{children}</Box>
    </Box>
  )
}

export default StudentDashboardCard
