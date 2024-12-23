import { Box, Typography, List, ListItem } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import profiletheme from '../../styles/profileTheme';
import {ReactComponent as FacebookIcon} from '../../public/images/facebook.svg';
import {ReactComponent as InstagramIcon} from '../../public/images/instagram.svg';
import {ReactComponent as LinkedinIcon} from '../../public/images/linkedin.svg';
import {ReactComponent as YoutubeIcon} from '../../public/images/youtube.svg';

interface LocationTypes {
  pathname: string
}

const Footer: React.FC = () => {
  const location = useLocation() as LocationTypes

  return (
    <Box component="footer" id="footer" sx={profiletheme.footer}>
      <Box sx={profiletheme.footer.footerContainer}>
        <Box sx={profiletheme.footer.footerLeft}>
          <Box>
            <List sx={profiletheme.footer.footerList}>
              <ListItem sx={profiletheme.footer.footerListItem}>
                <Box component={Link} to="/scholarships" sx={profiletheme.footer.footerListItemLink}>Listings</Box>
              </ListItem>
              <ListItem sx={profiletheme.footer.footerListItem}>
                <Box component={Link} to="/terms-and-conditions" sx={profiletheme.footer.footerListItemLink}>Terms and Conditions</Box>
              </ListItem>
              <ListItem sx={profiletheme.footer.footerListItem}>
                <Box component={Link} to="/privacy-consent" sx={profiletheme.footer.footerListItemLink}>Privacy Policy</Box>
              </ListItem>
              {location.pathname !== '/' && (
                <ListItem sx={profiletheme.footer.footerListItem}>
                  <Box component={Link} sx={profiletheme.footer.footerListItemLink}>Welcome Page</Box>
                </ListItem>
              )}
            </List>
          </Box>
          <Box>
            <List sx={profiletheme.footer.footerList}>
              <ListItem sx={profiletheme.footer.footerListItem}>
                <Box component={Link} to="https://www.facebook.com/scholarisfbpage" target="_blank"><FacebookIcon style={profiletheme.footer.footerLink} /></Box>
              </ListItem>
              <ListItem sx={profiletheme.footer.footerListItem}>
                <Box component={Link} to="https://www.facebook.com/scholarisfbpage" target="_blank"><InstagramIcon style={profiletheme.footer.footerLink} /></Box>
              </ListItem>
              <ListItem sx={profiletheme.footer.footerListItem}>
                <Box component={Link} to="https://www.linkedin.com/company/sence1-inc" target="_blank"><LinkedinIcon style={profiletheme.footer.footerLink} /></Box>
              </ListItem>
              <ListItem sx={profiletheme.footer.footerListItem}>
                <Box component={Link} to="https://www.youtube.com/@Sence1Inc" target="_blank"><YoutubeIcon style={profiletheme.footer.footerLink} /></Box>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box>
          <Typography sx={profiletheme.footer.footerCopyright}>
            Scholaris Copyright | Managed by Sence1 | All Rights Reserved 2024
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
