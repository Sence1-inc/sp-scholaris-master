import { ContactEmergency } from '@mui/icons-material'
import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import theme from '../../styles/theme'
import CustomSmallTextField from '../CustomSmallTextField/CustomSmallTextField'
import StudentDashboardCard from './StudentDashboardCard'

const StudentDashboardGuardianInfoCard = () => {
  const isSm = useMediaQuery(() => theme.breakpoints.down('sm'))

  const handleSave = () => {}
  const handleCancel = () => {}
  return (
    <StudentDashboardCard
      icon={
        <ContactEmergency fontSize="small" sx={{ color: 'common.white' }} />
      }
      title="Guardian Contact Information"
      handleCancel={handleCancel}
      handleSave={handleSave}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
        }}
      >
        <CustomSmallTextField label="Full Name:" fullWidth={isSm} />
        <CustomSmallTextField label="Contact No.:" fullWidth={isSm} />
        <CustomSmallTextField label="Relationship:" fullWidth={isSm} />
      </Box>
    </StudentDashboardCard>
  )
}

export default StudentDashboardGuardianInfoCard
