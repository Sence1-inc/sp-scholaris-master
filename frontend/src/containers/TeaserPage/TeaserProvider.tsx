import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import Newsletter from '../../components/Newsletter/Newsletter';
import Search from '../../components/Search/Search';
import { PROVIDER_WELCOME_SUBHEADER } from '../../data/ProviderContent';


const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <WelcomeSection subheader={PROVIDER_WELCOME_SUBHEADER} />
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
