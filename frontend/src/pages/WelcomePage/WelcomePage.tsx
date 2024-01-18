import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WelcomeButton from '../../components/Button/WelcomeButton';
import AngleDownIcon from '../../public/images/angles-down-solid.svg';
import UserIcon from '../../public/images/users-solid.svg';
import SchoolIcon from '../../public/images/school-solid.svg';
import WelcomeImage from '../../public/images/welcome-icon.png';
import './WelcomePage.css';

function WelcomePage() {
  const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowWidthResize = () => {
      setWindowWidthSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowWidthResize);

    return () => {
      window.removeEventListener('resize', handleWindowWidthResize);
    };
  }, []);

  console.log(windowWidthSize)

  return (
    <>
      <Header />
      <div className='content__welcome-intro'>
        <div className='container'>
          <img src={WelcomeImage} alt='' />
          <h2>Welcome to <span className='color-secondary'>Scholaris</span>!</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet purus nulla. Suspendisse egestas erat eu lectus semper, quis sollicitudin diam blandit. Sed rhoncus, nisi ac sollicitudin ultricies, ante turpis fermentum elit, id euismod dolor augue mollis dui. Integer efficitur diam sed tellus feugiat, et posuere tortor vestibulum. </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet purus nulla. Suspendisse egestas erat eu lectus semper, quis sollicitudin diam blandit. Sed rhoncus, nisi ac sollicitudin ultricies, ante turpis fermentum elit, id euismod dolor augue mollis dui. Integer efficitur diam sed tellus feugiat, et posuere tortor vestibulum. </p>
          <a href='#welcome'><img src={AngleDownIcon} alt='' /></a>
        </div>
      </div>
      <div id='welcome' className='content__welcome-selection'>
        <div className='container'>
          <div>
            <h3 className='text-center mb-2'>Dream, Achieve, Succeed: Your Journey{windowWidthSize > 768 && <br />}Begins with <span className='color-secondary'>Scholaris</span>.</h3>
            <p className='text-center'>Begin your journey now. Are you an aspiring student or{windowWidthSize > 768 && <br />}a scholarship-granting organization?</p>
            <div className='content__welcome-buttons'>
              <WelcomeButton label='Student' icon={UserIcon} desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet purus nulla.' url='/user'/>
              <WelcomeButton label='Organization' icon={SchoolIcon} desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet purus nulla.' url='/organization'/>
            </div>
            <div className='content__welcome-annotations'>
              <p className='text-center'>Please select from the button options above to get started with Scholaris.</p><br/>
              <p className='text-center'>Choose Student if you are looking for scholarships, and choose Organizations if you want to list your organization’s scholarship and want to further look for a candidate</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WelcomePage;
