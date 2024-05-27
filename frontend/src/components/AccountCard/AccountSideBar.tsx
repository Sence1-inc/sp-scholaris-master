import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Button, Card, List, ListItem, Typography } from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileImage from '../../public/images/profile.png'
import profileTheme from '../../styles/profileTheme'

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

  useEffect(() => {
    setActiveButton(activeContent)
  }, [activeContent])

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
      </Box>
    </Card>
  )
}

export default AccountSideBar
