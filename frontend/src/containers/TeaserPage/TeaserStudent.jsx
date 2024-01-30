import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { STUDENT_WELCOME_SUBHEADER, STUDENT_WELCOME_THIRD_LEVEL_HEADING } from '../../data/StudentContent';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import Newsletter from '../../components/Newsletter/Newsletter';
import Search from '../../components/Search/Search';


function HomePage() {
  return (
    <>
      <Header />
      <WelcomeSection subheader={STUDENT_WELCOME_SUBHEADER} third_level_header={STUDENT_WELCOME_THIRD_LEVEL_HEADING} />
      <Search/>
      <Newsletter user_type='student' title_content={<>
            Hear the latest from{' '}
            <span className='newsletter-subheader__orange'>Scholaris</span>
          </>} subtitle_content={'Sign up for our newsletter'} description_content={'Get the latest news about exciting new features'} />
      <Footer />
    </>
  );
}

export default HomePage;
