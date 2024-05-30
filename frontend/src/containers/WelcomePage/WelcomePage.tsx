import { Typography } from '@mui/material'
import React from 'react'
import WelcomeButton from '../../components/Button/WelcomeButton'
import Search from '../../components/Search/Search'
import AngleDownIcon from '../../public/images/angles-down-solid.svg'
import SchoolIcon from '../../public/images/school-solid.svg'
import UserIcon from '../../public/images/users-solid.svg'
import WelcomeImage from '../../public/images/welcome-icon.png'
import './WelcomePage.css'

const WelcomePage: React.FC = () => {
  return (
    <>
      <div className="content__welcome-intro">
        <div className="container">
          <img src={WelcomeImage} alt="" />
          <Typography variant="h2">
            Discover <span className="color-secondary">Scholaris</span>!
          </Typography>
          <Search isSection={true} isResultsShown={false} />
          <Typography variant="body1" textAlign="center">
            Scholaris functions as a centralized hub where students can explore
            an extensive array of scholarships aligned with their academic
            accomplishments, talents, and individual circumstances.
            Scholarship-granting organizations can also showcase their
            offerings, contributing to a diverse pool of scholarships that are
            easily searchable.{' '}
          </Typography>
          <Typography variant="body1" textAlign="center">
            This approach of consolidating scholarships from various
            organizations enhances accessibility and guarantees that every
            deserving student is given an opportunity.{' '}
          </Typography>
          <a href="#welcome">
            <img src={AngleDownIcon} alt="" />
          </a>
        </div>
      </div>
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
