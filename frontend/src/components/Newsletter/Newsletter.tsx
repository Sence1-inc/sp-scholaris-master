import React, { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import './Newsletter.css';
import { AxiosResponse } from 'axios';
import axiosInstance from '../../axiosConfig'

interface SubscriberData {
  email: string;
  user_type: string;
}

interface ErrorResponse {
  error: string;
  details: string[];
}

interface SuccessResponse {
  email: string;
  user_type: string;
  message: string;
}

interface NewsletterProps {
  title_content: React.ReactNode | string;
  subtitle_content: React.ReactNode | string;
  description_content: React.ReactNode | string;
  user_type: string;
}

const Newsletter: React.FC<NewsletterProps> = ({title_content, subtitle_content, description_content, user_type}) => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubscribe:  (e: React.MouseEvent<HTMLButtonElement>) => void  = async (e) => {
    e.preventDefault()

    try {
      const newSubscriberData: SubscriberData = {
        email: email,
        user_type: user_type,
      };

      const response: AxiosResponse<SuccessResponse | ErrorResponse> = await axiosInstance.post(
        `api/v1/subscribers`,
        newSubscriberData
      );

      if (response.status === 201) {
        const successData = response.data as SuccessResponse;
        setSuccessMessage(successData.message);
        setErrorMessage('');
      } else {
        const errorData = response.data as ErrorResponse;
        setErrorMessage(`Error: ${errorData.error}. ${errorData.details.join(' ')}`);
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error creating new subscriber. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void  = (e) => {
    setEmail(e.target.value)
  }

  return (
    <section className="newsletter">
      <div className='container-1040'>
        <h2 className='newsletter-subheader'>{title_content}</h2>
      <div className="section-header">
        <h3>{subtitle_content}</h3>
        <p>{description_content}</p>
      </div>
      <div className="newsletter-input__container">
        <Input value={email} placeholder={'Enter your email'} handleChange={handleEmailChange} />
        {errorMessage && <p style={{ color: 'red', margin: 0 }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green', margin: 0 }}>{successMessage}</p>}
        <Button handleClick={handleSubscribe}>SUBSCRIBE</Button>
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