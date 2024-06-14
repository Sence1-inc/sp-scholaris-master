import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Button, Card, List, ListItem, Typography } from '@mui/material'
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

const sideItem: SideBarObject[] = [
  { id: 'view-profile', title: 'View Scholarship Profile', Icon: <HomeIcon /> },
  { id: 'account-profile', title: 'Account Profile', Icon: <PersonIcon /> },
  { id: 'account-security', title: 'Account Security', Icon: <SecurityIcon /> },
  { id: 'account-settings', title: 'Settings', Icon: <SettingsIcon /> },
  // { id: 'account-close', title: 'Close Account', Icon: <LockPersonIcon /> },
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
          role: { id: null, role_name: '' },
          scholarship_provider: {
            id: 0,
            provider_name: '',
            user_id: 0,
            provider_link: '',
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
          label="Logout"
          loading={false}
          handleClick={handleDeleteCookie}
          styles={{ width: '80%', margin: '20px 34px' }}
        />
      </Box>
    </Card>
  )
}

export default AccountSideBar
