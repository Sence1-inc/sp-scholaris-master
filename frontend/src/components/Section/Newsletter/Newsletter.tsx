import React from 'react';
import Button from '../../Button/Button';
import SearchInput from '../../SearchInput/SearchInput';

import './Newsletter.css';

interface NewsletterProps {}

const Newsletter: React.FC<NewsletterProps> = () => {
  return (
    <div className="section newsletter">
        <p className='newsletter-subheader'>Stay Updated from our Newsletters</p>
      <div className="section-header">
        <h3>Join Now, Stay Informed</h3>
        <p>Unlock Exclusive Updates for a Brighter Tomorrow</p>
      </div>
      <div className="newsletter-input__container">
        <SearchInput placeholder={'Enter your email'}/>
        <Button>Subscribe</Button>
        <p className='newsletter-text__small'>
            By subscribing to the newsletter, you have read this form and understand its content and voluntarily give your consent for the collection, use, processing, storage and retention of your personal data or information to Scholaris for the purpose(s) described in the Privacy Data document.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;