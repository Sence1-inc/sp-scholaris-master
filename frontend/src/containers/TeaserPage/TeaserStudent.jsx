import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WelcomeSection from '../../components/Section/WelcomeSection';
import Search from '../../components/Section/Search/Search';

function HomePage() {
  return (
    <>
      <Header />
      <WelcomeSection />
      <Search/>
      <Footer />
    </>
  );
}

export default HomePage;
