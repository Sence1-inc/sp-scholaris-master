import React from 'react';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import Newsletter from '../../components/Newsletter/Newsletter';
import { FEATURES, PROVIDER_WELCOME_SUBHEADER } from '../../data/ProviderContent';
import { PROVIDER_TYPE } from '../../constants/constants';
import FeatureGuides from '../../components/Feature/FeatureGuides';


const HomePage: React.FC = () => {
  return (
    <>
      <WelcomeSection subheader={PROVIDER_WELCOME_SUBHEADER} />
      <Newsletter user_type={PROVIDER_TYPE} title_content={<>
            Hear the latest from{' '}
            <span className='newsletter-subheader__orange'>Scholaris</span>
          </>} subtitle_content={'Sign up for our newsletter'} 
          description_content={'Get the latest news about exciting new features'} />
      <FeatureGuides features={FEATURES} contentType='providerFeatures'/>
    </>
  );
}

export default HomePage;
