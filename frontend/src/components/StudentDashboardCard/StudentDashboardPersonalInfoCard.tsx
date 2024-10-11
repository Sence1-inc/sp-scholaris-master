import { Person } from '@mui/icons-material'
import { Avatar, Box, useMediaQuery } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useAppSelector } from '../../redux/store'
import { StudentProfile } from '../../redux/types'
import theme from '../../styles/theme'
import CustomSmallTextField from '../CustomSmallTextField/CustomSmallTextField'
import StudentDashboardCard from './StudentDashboardCard'

interface StudentDashboardPersonalInfoCardProps {
  profileData: StudentProfile
  setProfileData: React.Dispatch<React.SetStateAction<StudentProfile>>
  handleSave: () => void
}

const StudentDashboardPersonalInfoCard: React.FC<
  StudentDashboardPersonalInfoCardProps
> = ({ profileData, setProfileData, handleSave }) => {
  const isSm = useMediaQuery(() => theme.breakpoints.down('sm'))
  const user = useAppSelector((state) => state.persistedReducer.user)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value,
    })
  }

  const handleDateChange = (value: Dayjs, field: string) => {
    setProfileData({ ...profileData, [field]: dayjs.utc(value) })
  }

  return (
    <StudentDashboardCard
      icon={<Person fontSize="small" sx={{ color: 'common.white' }} />}
      title="Personal Information"
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
            <CustomSmallTextField
              value={profileData.about}
              handleOnInputChange={(e) => handleInputChange(e, 'about')}
              label="About:"
              multiline={true}
              minRows={6}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              flexWrap: 'wrap',
            }}
          >
            <CustomSmallTextField
              isDisabled={true}
              value={`${user.first_name} ${user.last_name}`}
              handleOnInputChange={(e) => handleInputChange(e, 'fullname')}
              label="Full Name:"
              fullWidth={isSm}
            />
            <CustomSmallTextField
              value={profileData.birthdate}
              handleDateChange={(value) => handleDateChange(value, 'birthdate')}
              label="Birthdate:"
              fullWidth={isSm}
              type="date"
            />
            <CustomSmallTextField
              isDisabled={true}
              value={user.email_address}
              handleOnInputChange={(e) => handleInputChange(e, 'email')}
              label="Email:"
              fullWidth={isSm}
              type="email"
            />
            <CustomSmallTextField
              value={profileData.age}
              handleOnInputChange={(e) => handleInputChange(e, 'age')}
              label="Age:"
              fullWidth={isSm}
              isDisabled={true}
            />
            <CustomSmallTextField
              value={profileData.nationality}
              handleOnInputChange={(e) => handleInputChange(e, 'nationality')}
              label="Nationality:"
              fullWidth={isSm}
            />
            <CustomSmallTextField
              value={profileData.gender}
              handleSelect={(e) =>
                setProfileData({ ...profileData, gender: e.target.value })
              }
              label="Gender:"
              fullWidth={isSm}
              isSelect={true}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
            <CustomSmallTextField
              value={profileData.state}
              handleOnInputChange={(e) => handleInputChange(e, 'state')}
              label="State:"
              fullWidth={isSm}
            />
          </Box>
        </Box>
      </Box>
    </StudentDashboardCard>
  )
}

export default StudentDashboardPersonalInfoCard
