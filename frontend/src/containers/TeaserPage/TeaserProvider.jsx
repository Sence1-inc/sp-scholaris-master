import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WelcomeSection from '../../components/Section/WelcomeSection';
import FeatureGuides from '../../components/Feature/FeatureGuides';
import features from './ProviderContent';

function HomePage() {
  return (
    <>
      <Header />
      <WelcomeSection />
      <FeatureGuides features={features} />
      <Footer />
    </>
  );
}

export default HomePage;
