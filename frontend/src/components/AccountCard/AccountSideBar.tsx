import React, { useState, useEffect, Dispatch } from 'react';
import { Typography, Box, Card, List, ListItem, Button } from '@mui/material'
import ProfileImage from '../../public/images/profile.png'
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useNavigate } from "react-router-dom";

interface AccountSideBarProps {
  activeContent: string | undefined,
  setActiveContent: Dispatch<string>,
  id: string | undefined,
  provider: {
    id?: number | undefined,
    provider_name?: string | undefined,
    user_id?: number | undefined
  } | null
}

const AccountSideBar: React.FC<AccountSideBarProps> = ({ activeContent, setActiveContent, id, provider }) => {
  const [activeButton, setActiveButton] = useState<string | undefined>('');
  const navigate = useNavigate();

  useEffect(() => {
    setActiveButton(activeContent);
  }, [activeContent])

  const onButtonClicked = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
  
    setActiveButton(target.id)
    setActiveContent(target.id)
    navigate(`/provider/account/${id}/${target.id}`);
  }

  return (
    <Card sx={
      {
        width: '30%',
        backgroundColor: '#e2e1e1',
        borderRadius: 8
      }
    }>
      <Box sx={
        {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          backgroundColor: '#d2d2d2',
          px: 4,
          py: 2
        }
      }>
        <img src={ProfileImage} alt="" />
        <Typography sx={
          {
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            color: '#002147',
            textAlign: 'center'
          }
        }>{provider?.provider_name}</Typography>
      </Box>
      <Box>
        <List sx={{ p: 0 }}>
          <ListItem sx={{ p: 0 }}>
            <Button id="view-profile" sx={{ ...theme.buttonContainer, ...(activeButton === 'view-profile' && theme.buttonActive) }} onClick={onButtonClicked}>
              <Box sx={{ height: '1.7em' }}><HomeIcon /></Box>
              View Scholarship Profile
            </Button>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <Button id="account-profile" sx={{ ...theme.buttonContainer, ...(activeButton === 'account-profile' && theme.buttonActive) }} onClick={onButtonClicked}>
              <Box sx={{ height: '1.7em' }}><PersonIcon /></Box>
              Account Profile
            </Button>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <Button id="account-security" sx={{ ...theme.buttonContainer, ...(activeButton === 'account-security' && theme.buttonActive) }} onClick={onButtonClicked}>
              <Box sx={{ height: '1.7em' }}><SecurityIcon /></Box>
              Account Security
            </Button>
          </ListItem>
          {/* <ListItem sx={{ p: 0 }}>
            <Button id="account-subscription" sx={{ ...theme.buttonContainer, ...(activeButton === 'account-subscription' && theme.buttonActive) }} onClick={onButtonClicked}>
              <Box sx={{ height: '1.7em' }}><CardMembershipIcon /></Box>
              Subscription
            </Button>
          </ListItem> */}
          <ListItem sx={{ p: 0 }}>
            <Button id="account-settings" sx={{ ...theme.buttonContainer, ...(activeButton === 'account-settings' && theme.buttonActive) }} onClick={onButtonClicked}>
              <Box sx={{ height: '1.7em' }}><SettingsIcon /></Box>
              Settings
            </Button>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <Button id="close-account" sx={{ ...theme.buttonContainer, ...(activeButton === 'close-account' && theme.buttonActive) }} onClick={onButtonClicked}>
              <Box sx={{ height: '1.7em' }}><LockPersonIcon /></Box>
              Close Account
            </Button>
          </ListItem>
        </List>
      </Box>
    </Card>
  )
}

export default AccountSideBar;

const theme = {
  buttonContainer: {
    py: 2, 
    px: 4, 
    width: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    gap: 2, 
    borderRadius: 0,
    fontSize: 16,
    fontWeight: 'meidum',
    color: '#002147',
    textAlign: 'left'
  },
  buttonActive: {
    backgroundColor: '#f36b3b',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#d75e33'
    }
  }
}
