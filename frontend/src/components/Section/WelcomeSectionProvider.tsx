import React from 'react';
import PrimaryButton from '../Button/PrimaryButton';

import './WelcomeSection.css';

function WelcomeSection() {
    return (
    <>
      <section className='section__welcome'>
        <div className='container'>
            <h2 className='mb-2'>Welcome to <span className='color-secondary'>Scholaris</span></h2>
            <h3>Scholaris offers a platform that enhances the visibility of scholarship listings to aspiring scholars. We bring together Scholarship Granting Organizations and scholars in a synergistic way.</h3>
            <div className='section__buttons'>
                <PrimaryButton label='Get Started' />
            </div>
        </div>
      </section>
    </>
  );
}

export default WelcomeSection;
