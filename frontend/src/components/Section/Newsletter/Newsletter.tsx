import React from 'react';
import Button from '../../Button/Button';
import SearchInput from '../../SearchInput/SearchInput';
import { Link } from 'react-router-dom';

import './Newsletter.css';

interface NewsletterProps {
  title_content:string,
  subtitle_content:string,
  description_content:string,
}

const Newsletter: React.FC<NewsletterProps> = ({title_content, subtitle_content, description_content}) => {
  return (
    <section className="newsletter">
      <div className='container-1040'>
        <h2 className='newsletter-subheader'>{title_content}</h2>
      <div className="section-header">
        <h3>{subtitle_content}</h3>
        <p>{description_content}</p>
      </div>
      <div className="newsletter-input__container">
        <SearchInput placeholder={'Enter your email'}/>
        <Button>SUBSCRIBE</Button>
        <p className='newsletter-text__small'>
        By subscribing to the newsletter, I have read this form and understand its content and voluntarily give my consent for the collection, use, processing, storage and retention of my personal data or information to Sence1 for the purpose(s) described in the 
        <Link to={'/privacy-consent'}> Privacy Policy</Link> document
        </p>

      </div>
      </div>
    </section>
  );
};

export default Newsletter;