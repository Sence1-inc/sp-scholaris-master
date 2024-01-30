import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import FeatureGuides from '../../components/Feature/FeatureGuides';
import { FEATURES } from '../../data/ProviderContent';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import Newsletter from '../../components/Newsletter/Newsletter';
import { STUDENT_TYPE } from '../../constants/constants';
import { STUDENT_WELCOME_SUBHEADER, STUDENT_WELCOME_THIRD_LEVEL_HEADING } from '../../data/StudentContent';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <WelcomeSection subheader={STUDENT_WELCOME_SUBHEADER} third_level_header={STUDENT_WELCOME_THIRD_LEVEL_HEADING} />
      <FeatureGuides features={FEATURES} />
      <Newsletter user_type={STUDENT_TYPE} title_content={'Stay Updated from our Newsletters'} subtitle_content={'Join Now, Stay Informed'} description_content={'Unlock Exclusive Updates for a Brighter Tomorrow.'} />
      <Footer />
    </>
  );
}

export default HomePage;
