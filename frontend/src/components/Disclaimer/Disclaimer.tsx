import { Typography, Box } from '@mui/material'
import React, { Component } from 'react'
import profiletheme from '../../styles/profileTheme';

export class Disclaimer extends Component {
  render() {
    return (
      <Box component="section" sx={profiletheme.section.sectionMain}>
        <Box sx={profiletheme.section.sectionContainer}>
          <Typography sx={profiletheme.section.sectionHeading}>
            DISCLAIMER
          </Typography>
          <Typography sx={profiletheme.section.sectionDescriptionSmall}>
            We are not associated with DepEd, CHED, or any educational
            institutions, and we do not manage the scholarship listings on this
            website. Furthermore, we have no affiliation with any schools or
            organizations offering scholarship assistance. Our role is solely to
            provide a platform; we are not involved in the content posted and
            cannot be held responsible for it.
          </Typography>
        </Box>
      </Box>
    )
  }
}

export default Disclaimer
