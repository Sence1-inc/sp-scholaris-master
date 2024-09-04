import { Person } from '@mui/icons-material'
import { Avatar, Box, useMediaQuery } from '@mui/material'
import theme from '../../styles/theme'
import CustomSmallTextField from '../CustomSmallTextField/CustomSmallTextField'
import StudentDashboardCard from './StudentDashboardCard'

const StudentDashboardPersonalInfoCard = () => {
  const isSm = useMediaQuery(() => theme.breakpoints.down('sm'))

  const handleSave = () => {}
  const handleCancel = () => {}

  return (
    <StudentDashboardCard
      icon={<Person fontSize="small" sx={{ color: 'common.white' }} />}
      title="Personal Information"
      handleCancel={handleCancel}
      handleSave={handleSave}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ flex: 0.4, alignSelf: { xs: 'center', md: 'flex-start' } }}>
          <Avatar sx={{ height: '100px', width: '100px' }}>
            <Person fontSize="large" />
          </Avatar>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 2,
          }}
        >
          <Box sx={{}}>
            <CustomSmallTextField label="About:" multiline={true} minRows={6} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              flexWrap: 'wrap',
            }}
          >
            <CustomSmallTextField label="Full Name:" fullWidth={isSm} />
            <CustomSmallTextField
              label="Birthdate:"
              fullWidth={isSm}
              type="date"
            />
            <CustomSmallTextField
              label="Email:"
              fullWidth={isSm}
              type="email"
            />
            <CustomSmallTextField label="Age:" fullWidth={isSm} />
            <CustomSmallTextField label="Nationality:" fullWidth={isSm} />
            <CustomSmallTextField
              label="Gender:"
              fullWidth={isSm}
              isSelect={true}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
            <CustomSmallTextField label="State:" fullWidth={isSm} />
          </Box>
        </Box>
      </Box>
    </StudentDashboardCard>
  )
}

export default StudentDashboardPersonalInfoCard
