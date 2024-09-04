import { Box, Typography } from '@mui/material'
import React from 'react'
import StudentDashbaordAcademicBackgroundCard from '../../components/StudentDashboardCard/StudentDashbaordAcademicBackgroundCard'
import StudentDashboardGuardianInfoCard from '../../components/StudentDashboardCard/StudentDashboardGuardianInfoCard'
import StudentDashboardPersonalInfoCard from '../../components/StudentDashboardCard/StudentDashboardPersonalInfoCard'

const StudentDashboardPage = () => {
  return (
    <Box
      sx={{
        padding: {
          xs: '100px 20px',
          md: '100px 74px',
        },
      }}
    >
      <Typography variant="h6">Student Profile</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <StudentDashboardPersonalInfoCard />
        <StudentDashbaordAcademicBackgroundCard />
        <StudentDashboardGuardianInfoCard />
      </Box>
    </Box>
  )
}

export default StudentDashboardPage
