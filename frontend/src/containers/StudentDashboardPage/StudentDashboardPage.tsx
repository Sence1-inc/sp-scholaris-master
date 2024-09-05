import { Box, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import PrimaryButton from '../../components/CustomButton/PrimaryButton'
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar'
import StudentDashbaordAcademicBackgroundCard from '../../components/StudentDashboardCard/StudentDashbaordAcademicBackgroundCard'
import StudentDashboardGuardianInfoCard from '../../components/StudentDashboardCard/StudentDashboardGuardianInfoCard'
import StudentDashboardPersonalInfoCard from '../../components/StudentDashboardCard/StudentDashboardPersonalInfoCard'
import { initializeIsAuthenticated } from '../../redux/reducers/IsAuthenticatedReducer'
import { initializeUser } from '../../redux/reducers/UserReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { StudentProfile } from '../../redux/types'

const StudentDashboardPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.persistedReducer.user)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)

  dayjs.extend(utc)
  dayjs.extend(timezone)

  const formattedDate = (date: string): Dayjs => {
    const timeZone = 'Asia/Manila'
    const dayjsDate = dayjs(date).tz(timeZone)
    return dayjsDate
  }

  const [profileData, setProfileData] = useState<StudentProfile>({
    about: '',
    full_name: '',
    birthdate: formattedDate(user.birthdate),
    email: '',
    age: 0,
    nationality: '',
    gender: '',
    state: '',
    secondary_school_name: '',
    secondary_school_year: '',
    secondary_school_address: '',
    secondary_school_phone_number: '',
    secondary_school_awards: '',
    secondary_school_organizations: '',
    elementary_school_name: '',
    elementary_school_year: '',
    elementary_school_address: '',
    elementary_school_phone_number: '',
    elementary_school_awards: '',
    elementary_school_organizations: '',
    guardian_full_name: '',
    guardian_contact_number: '',
    guardian_relationship: '',
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        ...user.student_profile,
        full_name: `${user.first_name} ${user.last_name}`,
        birthdate: formattedDate(user.birthdate),
        email: user.email_address,
      })
    }
  }, [user])

  const handleDeleteCookie = async () => {
    const data = {
      email: user.email_address,
    }

    const response = await axiosInstance.post('/api/v1/logout', data, {
      withCredentials: true,
    })

    if (response.data.deleted) {
      dispatch(
        initializeUser({
          birthdate: '',
          email_address: '',
          first_name: '',
          id: 0,
          is_active: 0,
          last_name: '',
          role_id: 0,
          session_token: '',
          role: { id: 0, role_name: '' },
          scholarship_provider: {
            id: 0,
            provider_name: '',
            user_id: 0,
            provider_link: '',
          },
          student_profile: {
            about: '',
            full_name: '',
            birthdate: dayjs(new Date()),
            email: '',
            age: 0,
            nationality: '',
            gender: '',
            state: '',
            secondary_school_name: '',
            secondary_school_year: '',
            secondary_school_address: '',
            secondary_school_phone_number: '',
            secondary_school_awards: '',
            secondary_school_organizations: '',
            elementary_school_name: '',
            elementary_school_year: '',
            elementary_school_address: '',
            elementary_school_phone_number: '',
            elementary_school_awards: '',
            elementary_school_organizations: '',
            guardian_full_name: '',
            guardian_contact_number: '',
            guardian_relationship: '',
          },
        })
      )
      dispatch(initializeIsAuthenticated(false))
      navigate('/sign-in')
    }
  }

  const handleSave = async () => {
    try {
      const { data } = await axiosInstance.post(
        '/api/v1/student_profiles',
        { ...profileData, user_id: user.id },
        { withCredentials: true }
      )

      setSuccessMessage(data.message)
      setErrorMessage('')
      dispatch(initializeUser({ ...user, student_profile: data.profile }))
    } catch (error: any) {
      setErrorMessage(error.response.data.message)
      setSuccessMessage('')
    }
  }

  return (
    <Box
      sx={{
        padding: {
          xs: '100px 20px',
          md: '100px 74px',
        },
      }}
    >
      <CustomSnackbar
        errorMessage={errorMessage}
        successMessage={successMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
      <Typography variant="h6">Student Profile</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <StudentDashboardPersonalInfoCard
          profileData={profileData}
          setProfileData={setProfileData}
          handleSave={handleSave}
        />
        <StudentDashbaordAcademicBackgroundCard
          profileData={profileData}
          setProfileData={setProfileData}
          handleSave={handleSave}
        />
        <StudentDashboardGuardianInfoCard
          profileData={profileData}
          setProfileData={setProfileData}
          handleSave={handleSave}
        />
      </Box>
      <PrimaryButton
        id="logout-from-sidebar"
        label="Logout"
        loading={false}
        handleClick={handleDeleteCookie}
        styles={{
          padding: '10px 0',
          width: '80%',
          position: 'relative',
          right: '-50%',
          transform: 'translate(-50%)',
          margin: '20px 0',
        }}
      />
    </Box>
  )
}

export default StudentDashboardPage
