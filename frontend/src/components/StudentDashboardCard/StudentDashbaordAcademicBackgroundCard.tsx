import { Note } from '@mui/icons-material'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { StudentProfile } from '../../redux/types'
import theme from '../../styles/theme'
import CustomSmallTextField from '../CustomSmallTextField/CustomSmallTextField'
import StudentDashboardCard from './StudentDashboardCard'

interface StudentDashbaordAcademicBackgroundCardProps {
  profileData: StudentProfile
  setProfileData: React.Dispatch<React.SetStateAction<StudentProfile>>
  handleSave: () => void
}

const StudentDashbaordAcademicBackgroundCard: React.FC<
  StudentDashbaordAcademicBackgroundCardProps
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
      icon={<Note fontSize="small" sx={{ color: 'common.white' }} />}
      title="Academic Background"
      handleSave={handleSave}
    >
      <Typography variant="body2">Secondary Education</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
        }}
      >
        <CustomSmallTextField
          value={profileData.secondary_school_name}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'secondary_school_name')
          }
          label="School:"
          fullWidth={isSm}
        />
        <CustomSmallTextField
          value={profileData.secondary_school_year}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'secondary_school_year')
          }
          label="Year:"
          fullWidth={isSm}
        />
        <CustomSmallTextField
          value={profileData.secondary_school_address}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'secondary_school_address')
          }
          label="Address:"
          fullWidth={isSm}
        />
        <CustomSmallTextField
          value={profileData.secondary_school_phone_number}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'secondary_school_phone_number')
          }
          label="School Phone:"
          fullWidth={isSm}
        />
        <CustomSmallTextField
          value={profileData.secondary_school_awards}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'secondary_school_awards')
          }
          label="Awards:"
          fullWidth={true}
          multiline={true}
          minRows={6}
        />
        <CustomSmallTextField
          value={profileData.secondary_school_organizations}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'secondary_school_organizations')
          }
          label="Organizations:"
          fullWidth={true}
          multiline={true}
          minRows={6}
        />
      </Box>
      <Typography variant="body2">Elementary Education</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
        }}
      >
        <CustomSmallTextField
          value={profileData.elementary_school_name}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'elementary_school_name')
          }
          label="School:"
          fullWidth={isSm}
        />
        <CustomSmallTextField
          value={profileData.elementary_school_year}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'elementary_school_year')
          }
          label="Year:"
          fullWidth={isSm}
        />
        <CustomSmallTextField
          value={profileData.elementary_school_address}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'elementary_school_address')
          }
          label="Address:"
          fullWidth={isSm}
        />
        <CustomSmallTextField
          value={profileData.elementary_school_phone_number}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'elementary_school_phone_number')
          }
          label="School Phone:"
          fullWidth={isSm}
        />
        <CustomSmallTextField
          value={profileData.elementary_school_awards}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'elementary_school_awards')
          }
          label="Awards:"
          fullWidth={true}
          multiline={true}
          minRows={6}
        />
        <CustomSmallTextField
          value={profileData.elementary_school_organizations}
          handleOnInputChange={(e) =>
            handleInputChange(e, 'elementary_school_organizations')
          }
          label="Organizations:"
          fullWidth={true}
          multiline={true}
          minRows={6}
        />
      </Box>
    </StudentDashboardCard>
  )
}

export default StudentDashbaordAcademicBackgroundCard
