import React, { useState, useEffect } from 'react';
import PrimaryButton from '../Button/PrimaryButton';
import WelcomeImageBG from '../../public/images/welcome-icon.png';

import './WelcomeSection.css';

function WelcomeSection() {
    return (
    <>
      <section className='section__welcome'>
        <div className='container'>
            <h2 className='mb-2'>Welcome to <span className='color-secondary'>Scholaris</span></h2>
            <h3>Empowering Dreams, Igniting Futures: Yout Path to Knowledge, Our Commitment to Support</h3>
            <div className='section__buttons'>
                <PrimaryButton label='Get Started' />
            </div>
        </div>
      </section>
    </>
  );
}

export default WelcomeSection;
