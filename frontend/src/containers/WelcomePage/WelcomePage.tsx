import { Box, Typography } from '@mui/material'
import React from 'react'
import WelcomeButton from '../../components/Button/WelcomeButton'
import WelcomePageSearch from '../../components/Search/WelcomePageSearch'
import SchoolIcon from '../../public/images/school-solid.svg'
import UserIcon from '../../public/images/users-solid.svg'
import './WelcomePage.css'

const WelcomePage: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column' },
          width: '100vw',
          padding: {xs: '60px 20px', md: '80px 20px'},
          gap: { xs: '80px' },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%' }
          }}
        >
          <WelcomePageSearch />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column' },
          width: '100vw',
          // padding: { xs: '40px 20px', md: '60px' },
          gap: { xs: '80px' },
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%' },
            display: 'flex',
            flexDirection: 'column',
            rowGap: {xs: '20px', md: '35px'},
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: { md: '10px' },
            padding: { xs: '60px 20px', md: '80px' },
          }}
        >
          {/* <img
            src={WelcomeImage}
            alt=""
            style={{ maxWidth: '100%', height: 'auto', padding: 0, margin: 0 }}
          /> */}
          <Typography
            variant="h3"
            textAlign="center"
            sx={{ textShadow: '1px 4px 4px #FFFFFF', fontSize: '3.5rem' }}
          >
            Discover <span className="color-secondary">Scholaris</span>!
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              maxWidth: '706px',
              fontWeight: '500',
              textShadow: '1px 4px 4px #FFFFFF',
            }}
          >
            Everyone deserves an education. Scholaris will help you to overcome
            the challenges and difficulties in searching for scholarships.
            <br />
            <br />
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
        <Box
          component="img"
          sx={{
            position: 'absolute',
            top: '0',
            objectFit: 'cover',
            width: '100vw',
            zIndex: '-1',
            height: '100%',
          }}
          src="/images/graduation_picture.jpg"
          alt="graduation"
        ></Box>
      </Box>
      <div id="welcome" className="content__welcome-selection">
        <div className="container">
          <div>
            <Typography variant="h3" sx={{ mb: 2 }} textAlign="center">
              <span className="color-secondary">Scholaris</span> - Match
              potential <br /> with scholarship opportunities
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{maxWidth: '650px', margin: '0 auto'}}>
              Scholaris connects students and scholarship-granting 
              organizations to discover scholarship opportunities, 
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
