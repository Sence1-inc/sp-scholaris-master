import { Typography, Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import profileTheme from '../../styles/profileTheme';
import {ReactComponent as MailIcon} from '../../public/images/mail.svg';
import {ReactComponent as FacebookIcon} from '../../public/images/facebook.svg';
import {ReactComponent as InstagramIcon} from '../../public/images/instagram.svg';
import {ReactComponent as LinkedinIcon} from '../../public/images/linkedin.svg';
import {ReactComponent as YoutubeIcon} from '../../public/images/youtube.svg';


const NavbarTopComponent: React.FC = () => {
  return (
    <Box sx={profileTheme.navigation.topNav}>
      <Box sx={profileTheme.navigation.topNavContainer}>
        <Box sx={profileTheme.navigation.topNavLeft}>
          <Typography
            component={Link}
            to="mailto:scholaris-info@sence1.com"
            sx={profileTheme.navigation.topNavLink}
            target="_blank"
          >
          <MailIcon style={profileTheme.navigation.topNavIcon} />
          scholaris-info@sence1.com
          </Typography>
        </Box>
        <Box sx={profileTheme.navigation.topNavRight}>
          <Typography
              component={Link}
              to="https://www.facebook.com/scholarisfbpage/"
              sx={profileTheme.navigation.topNavLink}
              target="_blank"
            >
            <FacebookIcon style={profileTheme.navigation.topNavIcon} />
          </Typography>
          <Typography
              component={Link}
              to="https://www.facebook.com/scholarisfbpage/"
              sx={profileTheme.navigation.topNavLink}
              target="_blank"
            >
            <InstagramIcon style={profileTheme.navigation.topNavIcon} />
          </Typography>
          <Typography
              component={Link}
              to="https://www.linkedin.com/company/sence1-inc"
              sx={profileTheme.navigation.topNavLink}
              target="_blank"
            >
            <LinkedinIcon style={profileTheme.navigation.topNavIcon} />
          </Typography>
          <Typography
              component={Link}
              to="https://www.youtube.com/@Sence1Inc"
              sx={profileTheme.navigation.topNavLink}
              target="_blank"
            >
            <YoutubeIcon style={profileTheme.navigation.topNavIcon} />
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default NavbarTopComponent;