import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Button, Card, List, ListItem, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { Dispatch, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import ProfileImage from '../../public/images/profile.png'
import { initializeIsAuthenticated } from '../../redux/reducers/IsAuthenticatedReducer'
import { initializeUser } from '../../redux/reducers/UserReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import profileTheme from '../../styles/profileTheme'
import PrimaryButton from '../CustomButton/PrimaryButton'

interface AccountSideBarProps {
  activeContent: string | undefined
  setActiveContent: Dispatch<string>
  id: string | undefined
  provider: {
    id?: number | undefined
    provider_name?: string | undefined
    user_id?: number | undefined
  } | null
}

type SideBarObject = {
  id: string
  title: string
  Icon: JSX.Element
}

export const sideItem: SideBarObject[] = [
  { id: 'view-profile', title: 'SGO Profile', Icon: <HomeIcon /> },
  { id: 'account-settings', title: 'Settings', Icon: <SettingsIcon /> },
]

const AccountSideBar: React.FC<AccountSideBarProps> = ({
  activeContent,
  setActiveContent,
  id,
  provider,
}) => {
  const [activeButton, setActiveButton] = useState<string | undefined>('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.persistedReducer.user)
  const { lastRoute } = useParams()

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

  useEffect(() => {
    setActiveButton(activeContent)
  }, [activeContent])

  useEffect(() => {
    setActiveButton(lastRoute)
  }, [lastRoute])

  const onButtonClicked = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement

    setActiveButton(target.id)
    setActiveContent(target.id)
    navigate(`/provider/account/${id}/${target.id}`)
  }

  return (
    <Card sx={profileTheme.container.cardSideContainer}>
      <Box sx={profileTheme.box.boxSideContentstyle}>
        <img src={ProfileImage} alt="" />
        <Typography sx={profileTheme.text.textRegularSide}>
          {provider?.provider_name}
        </Typography>
      </Box>
      <Box>
        <List sx={{ p: 0 }}>
          {sideItem.map(
            (
              item: { id: string; title: string; Icon: JSX.Element },
              index: number
            ) => (
              <ListItem sx={{ p: 0 }} key={item.id}>
                <Button
                  id={item.id}
                  sx={{
                    ...profileTheme.button.buttonMain,
                    ...(activeButton === `${item.id}` &&
                      profileTheme.button.buttonActive),
                  }}
                  onClick={onButtonClicked}
                >
                  <Box sx={{ height: '1.7em' }}>{item.Icon}</Box>
                  {item.title}
                </Button>
              </ListItem>
            )
          )}
        </List>
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
    </Card>
  )
}

export default AccountSideBar
