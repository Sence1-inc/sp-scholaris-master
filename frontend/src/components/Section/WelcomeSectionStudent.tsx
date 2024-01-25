import React from 'react';
import PrimaryButton from '../Button/PrimaryButton';

import './WelcomeSection.css';

function WelcomeSection() {
    return (
    <>
      <section className='section__welcome'>
        <div className='container'>
            <h2 className='mb-2'>Welcome to <span className='color-secondary'>Scholaris</span></h2>
            <h3>Are you looking for the right scholarship? Scholaris is a platform where students can discover a wide range of scholarship opportunities. Our search engine can help you find scholarships that cater to your specific needs, whether you’re a high school or college student, an athlete, or a musician.</h3>
            <div className='section__buttons'>
                <PrimaryButton label='Search Scholarships' />
            </div>
        </div>
      </section>
    </>
  );
}

export default WelcomeSection;
