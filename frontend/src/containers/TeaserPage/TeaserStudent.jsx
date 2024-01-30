import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WelcomeSection from '../../components/Section/WelcomeSection';
import Search from '../../components/Section/Search/Search';
import Newsletter from '../../components/Section/Newsletter/Newsletter';
import { STUDENT_WELCOME_SUBHEADER, STUDENT_WELCOME_THIRD_LEVEL_HEADING } from '../../data/StudentContent';


function HomePage() {
  return (
    <>
      <Header />
      <WelcomeSection subheader={STUDENT_WELCOME_SUBHEADER} third_level_header={STUDENT_WELCOME_THIRD_LEVEL_HEADING} />
      <Search/>
      <Newsletter title_content={<>
            Hear the latest from{' '}
            <span className='newsletter-subheader__orange'>Scholaris</span>
          </>} subtitle_content={'Sign up for our newsletter'} description_content={'Get the latest news about exciting new features'} />
      <Footer />
    </>
  );
}

export default HomePage;
