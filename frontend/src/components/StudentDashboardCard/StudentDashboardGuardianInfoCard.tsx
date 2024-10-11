import { ContactEmergency } from '@mui/icons-material'
import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import { StudentProfile } from '../../redux/types'
import theme from '../../styles/theme'
import CustomSmallTextField from '../CustomSmallTextField/CustomSmallTextField'
import StudentDashboardCard from './StudentDashboardCard'

interface StudentDashboardGuardianInfoCardProps {
  profileData: StudentProfile
  setProfileData: React.Dispatch<React.SetStateAction<StudentProfile>>
  handleSave: () => void
}

const StudentDashboardGuardianInfoCard: React.FC<
  StudentDashboardGuardianInfoCardProps
> = ({ profileData, setProfileData, handleSave }) => {
  const isSm = useMediaQuery(() => theme.breakpoints.down('sm'))

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setProfileData({ ...profileData, [field]: e.target.value })
  }

  return (
    <StudentDashboardCard
      icon={
        <ContactEmergency fontSize="small" sx={{ color: 'common.white' }} />
      }
      title="Guardian Contact Information"
      handleSave={handleSave}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
        }}
      >
        <CustomSmallTextField
          value={profileData.guardian_full_name}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'guardian_full_name')
          }
          label="Full Name:"
          fullWidth={isSm}
        />
        <CustomSmallTextField
          value={profileData.guardian_contact_number}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'guardian_contact_number')
          }
          label="Contact No.:"
          fullWidth={isSm}
        />
        <CustomSmallTextField
          value={profileData.guardian_relationship}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'guardian_relationship')
          }
          label="Relationship:"
          fullWidth={isSm}
        />
      </Box>
    </StudentDashboardCard>
  )
}

export default StudentDashboardGuardianInfoCard
