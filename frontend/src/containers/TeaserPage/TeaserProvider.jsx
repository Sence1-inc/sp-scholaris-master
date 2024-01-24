import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WelcomeSection from '../../components/Section/WelcomeSection';
import FeatureGuides from '../../components/Feature/FeatureGuides';
import { FEATURES, PROVIDER_WELCOME_SUBHEADER } from '../../data/ProviderContent';
import Newsletter from '../../components/Section/Newsletter/Newsletter';
import { PROVIDER_TYPE } from '../../constants/constants';

function HomePage() {
  return (
    <>
      <Header />
      <WelcomeSection subheader={PROVIDER_WELCOME_SUBHEADER} />
      <FeatureGuides features={FEATURES} />
      <Newsletter user_type={PROVIDER_TYPE} title_content={'Stay Updated from our Newsletters'} subtitle_content={'Join Now, Stay Informed'} description_content={'Unlock Exclusive Updates for a Brighter Tomorrow.'} />
      <Footer />
    </>
  );
}

export default HomePage;
