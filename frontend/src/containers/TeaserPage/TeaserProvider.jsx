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
      <Newsletter title_content={'Stay Updated from our Newsletters'} subtitle_content={'Join Now, Stay Informed'} description_content={'Unlock Exclusive Updates for a Brighter Tomorrow.'} consent_content={'By subscribing to the newsletter, I have read this form and understand its content and voluntarily give my consent for the collection, use, processing, storage and retention of my personal data or information to Sence1 for the purpose(s) described in the Privacy Data document'}/>
      <Footer />
    </>
  );
}

export default HomePage;
