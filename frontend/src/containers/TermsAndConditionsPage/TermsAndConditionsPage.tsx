import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './TermsAndConditionsPage.css'

interface TermsAndConditions {
  address: string;
  afterword: string;
  contact_number: string;
  date_updated: string;
  email_address: string;
  disclaimer: string;
  heading: string;
  introduction: string;
  main_items: {
    heading: string;
    content: string;
    specific_to: string;
  }[];
  thank_you_message: string;
}

const TermsAndConditionsPage: React.FC = () => {
  const [data, setData] = useState<TermsAndConditions>({
    address: "",
    afterword: "",
    contact_number: "",
    disclaimer: "",
    date_updated: "",
    email_address: "",
    heading: "",
    introduction: "",
    main_items: Array(11).fill({
      heading: "",
      content: "",
      specific_to: ""
    }),
    thank_you_message: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.jsonbin.io/v3/b/${process.env.REACT_APP_BIN_ID_TERMS_AND_CONDITIONS}/${process.env.REACT_APP_BIN_VERSION}`,
          {
            headers: {
              'X-Master-Key': process.env.REACT_APP_BIN_API_KEY,
              'X-Bin-Meta': false
            }
          }
        );
        setData(response.data.record);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='content_tc-body'>
        <h2 className='content_tc-header'>Terms and Conditions</h2>
        <h4 className='content_tc-subheader'>Last Updated: {data.date_updated}</h4>

        <p className='content_tc-body-text'>Disclaimer: {data.disclaimer}</p>

        <p className='content_tc-body-text'>{data.heading}</p>

        <p className='content_tc-body-text'>{data.introduction}</p>

        {data.main_items.map((item: { specific_to: string; heading: string; content: string }, index: number) => {
          if (item.specific_to === "" || item.specific_to === "scholaris") {
            return (
              <p key={index} className='content_tc-body-text'>{item.heading}: {item.content}</p>
            );
          }
          
          return null;
        })}

        <p className='content_tc-body-text'>{data.afterword}</p>
        <div className='content_container-contact'>
          <p className='content_contact-info'>Company Address: {data.address}</p>
          <p className='content_contact-info'>Contact Number: {data.contact_number}</p>
          <p className='content_contact-info'>Email Address: {data.email_address}</p>
        </div>

        <p className='content_tc-body-text'>{data.thank_you_message}</p>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
