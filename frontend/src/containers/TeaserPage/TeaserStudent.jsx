import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WelcomeSection from '../../components/Section/WelcomeSection';
import Newsletter from '../../components/Section/Newsletter/Newsletter';

function HomePage() {
  return (
    <>
      <Header />
      <WelcomeSection />
      <Newsletter title_content={<>
            Hear the latest from{' '}
            <span className='newsletter-subheader__orange'>Scholaris</span>
          </>} subtitle_content={'Sign up for our newsletter'} description_content={'Get the latest news about exciting new features'} />
      <Footer />
    </>
  );
}

export default HomePage;
