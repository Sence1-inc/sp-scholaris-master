import React from 'react';
import WelcomeButton from '../../components/Button/WelcomeButton';
import AngleDownIcon from '../../public/images/angles-down-solid.svg';
import UserIcon from '../../public/images/users-solid.svg';
import SchoolIcon from '../../public/images/school-solid.svg';
import WelcomeImage from '../../public/images/welcome-icon.png';
import './WelcomePage.css';

const WelcomePage: React.FC = () => {
  return (
    <>
      <div className='content__welcome-intro'>
        <div className='container'>
          <img src={WelcomeImage} alt='' />
          <h2>Discover <span className='color-secondary'>Scholaris</span>!</h2>
          <p>Scholaris functions as a centralized hub where students can explore an extensive array of scholarships aligned with their academic accomplishments, talents, and individual circumstances. Scholarship-granting organizations can also showcase their offerings, contributing to a diverse pool of scholarships that are easily searchable. </p>
          <p>This approach of consolidating scholarships from various organizations enhances accessibility and guarantees that every deserving student is given an opportunity. </p>
          <a href='#welcome'><img src={AngleDownIcon} alt='' /></a>
        </div>
      </div>
      <div id='welcome' className='content__welcome-selection'>
        <div className='container'>
          <div>
            <h3 className='text-center mb-2'><span className='color-secondary'>Scholaris</span> - Match potential <br /> with scholarship opportunities</h3>
            <p className='text-center'>Scholaris connects students and scholarship-granting <br /> organizations to discover scholarship opportunities, <br /> ensuring no student is left behind.</p>
            <div className='content__welcome-buttons'>
              <WelcomeButton label='Student' icon={UserIcon} desc='Aspiring Student' url='/student'/>
              <WelcomeButton label='SGO' icon={SchoolIcon} desc='Scholarship-Granting Organization' url='/provider'/>
            </div>
            <div className='content__welcome-annotations'>
              <p className='text-center'>Please select from the button options above to get started with Scholaris.</p><br/>
              <p className='text-center'>Choose Student if you are looking for scholarships, and choose Organizations if you want to list your organization’s scholarship and want to further look for a candidate</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
