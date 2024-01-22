import React from 'react';
import Button from '../../Button/Button';
import SearchInput from '../../SearchInput/SearchInput';

import './Newsletter.css';

interface NewsletterProps {
  title_content:string,
  subtitle_content:string,
  description_content:string,
  consent_content?:string
}

const Newsletter: React.FC<NewsletterProps> = ({title_content, subtitle_content, description_content, consent_content}) => {
  return (
    <div className="section newsletter">
        <h2 className='newsletter-subheader'>{title_content}</h2>
      <div className="section-header">
        <h3>{subtitle_content}</h3>
        <p>{description_content}</p>
      </div>
      <div className="newsletter-input__container">
        <SearchInput placeholder={'Enter your email'}/>
        <Button>Subscribe</Button>
        {consent_content && <p className='newsletter-text__small'>
        {consent_content}
        </p>}

      </div>
    </div>
  );
};

export default Newsletter;