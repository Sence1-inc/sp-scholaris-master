import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WelcomeSection from '../../components/Section/WelcomeSection';
import FeatureGuides from '../../components/Feature/FeatureGuides';
import features from '../../data/ProviderContent';
import Newsletter from '../../components/Section/Newsletter/Newsletter';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <Header />
      <WelcomeSection />
      <FeatureGuides features={features} contentType='providerFeatures'/>
      <Newsletter title_content={'Stay Updated from our Newsletters'} subtitle_content={'Join Now, Stay Informed'} description_content={'Unlock Exclusive Updates for a Brighter Tomorrow.'} />
      <Footer />
    </>
  );
}

export default HomePage;
