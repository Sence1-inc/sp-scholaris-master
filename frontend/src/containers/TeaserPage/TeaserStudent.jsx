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
      <Newsletter/>
      <Footer />
    </>
  );
}

export default HomePage;
