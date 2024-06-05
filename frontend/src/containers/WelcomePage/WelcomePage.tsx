import { Box, Typography } from '@mui/material'
import React from 'react'
import WelcomeButton from '../../components/Button/WelcomeButton'
import WelcomePageSearch from '../../components/Search/WelcomePageSearch'
import SchoolIcon from '../../public/images/school-solid.svg'
import UserIcon from '../../public/images/users-solid.svg'
import WelcomeImage from '../../public/images/welcome-icon.png'
import './WelcomePage.css'

const WelcomePage: React.FC = () => {
  return (
    <>
      <Box sx={{ display: 'flex', width: '100vw', padding: '60px' }}>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: '10px',
          }}
        >
          <img src={WelcomeImage} alt="" />
          <Typography variant="h3">
            Discover <span className="color-secondary">Scholaris</span>!
          </Typography>
          <Typography variant="body1" textAlign="center">
            Scholaris is an application designed to publicize and promote
            existing scholarship opportunities, making scholarships easily
            accessible to many scholarship searchers.
            <br />
            <br />
            It is a centralized hub where students can easily browse and stay
            updated with the latest offerings from different
            Scholarship-Granting Organizations or SGOs.
          </Typography>
        </Box>
        <Box sx={{ width: '50%', paddingLeft: '10px' }}>
          <WelcomePageSearch />
        </Box>
      </Box>
      <div id="welcome" className="content__welcome-selection">
        <div className="container">
          <div>
            <Typography variant="h3" sx={{ mb: 2 }} textAlign="center">
              <span className="color-secondary">Scholaris</span> - Match
              potential <br /> with scholarship opportunities
            </Typography>
            <Typography variant="body1" textAlign="center">
              Scholaris connects students and scholarship-granting <br />{' '}
              organizations to discover scholarship opportunities, <br />{' '}
              ensuring no student is left behind.
            </Typography>
            <div className="content__welcome-buttons">
              <WelcomeButton
                label="Student"
                icon={UserIcon}
                desc="Aspiring Student"
                url="/student"
              />
              <WelcomeButton
                label="SGO"
                icon={SchoolIcon}
                desc="Scholarship-Granting Organization"
                url="/provider"
              />
            </div>
            <div className="content__welcome-annotations">
              <Typography variant="subtitle1" textAlign="center">
                Please select from the button options above to get started with
                Scholaris.
              </Typography>
              <br />
              <Typography variant="subtitle1" textAlign="center">
                Choose Student if you are looking for scholarships, and choose
                SGO if you want to list your organization’s scholarship and want
                to further look for a candidate
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomePage
