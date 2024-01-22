import React from 'react';
import Header from '../../components/Header/Header';
import './TermsAndConditionsPage.css'

const TermsAndConditionsPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className='content_tc-body'>
        <h2>Terms and Conditions</h2>
        <h4>Last Updated: Jan 9, 2024</h4>

        <p>Throughout this Terms and Conditions, terms such as "Scholaris," "Company," "we," "our," or "us" pertain to Sence1 Inc. and any corporate affiliates associated with us.</p>

        <p>Welcome to Scholaris, a platform designed to connect students with scholarship opportunities and allow scholarship granting organizations to manage and promote their scholarships. Before using our services, please carefully read and understand the following Terms and Conditions. By accessing or using Scholaris, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please do not use our services.</p>

        <p>Acceptance of Terms: By accessing or using Scholaris, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
        <p>Use of Services: Scholaris provides a platform for students to search for scholarships and for scholarship providers to manage their scholarship listings. Users must use the platform in accordance with applicable laws and regulations.</p>
        <p>User Accounts: Users may need to create an account to access certain features of the app. Users are responsible for maintaining the confidentiality of their account information and are liable for all activities conducted through their accounts.</p>
        <p>User Accounts: Users may need to create an account to access certain features of the app. Users are responsible for maintaining the confidentiality of their account information and are liable for all activities conducted through their accounts.</p>
        <p>User Responsibilities: Users agree to provide accurate and up-to-date information when creating an account or using the app. Users are responsible for the content they submit and must not engage in any illegal, harmful, or deceptive activities on the platform.</p>
        <p>Scholarship Listings: Scholarship providers are responsible for the accuracy and legitimacy of the information provided when creating scholarship listings on Scholaris. Misleading or fraudulent information may result in the removal of the listing and termination of the provider's account.</p>
        <p>Privacy Policy: Users' personal information is collected and processed in accordance with our Privacy Policy. By using Scholaris, you consent to the collection, use, and disclosure of your personal information as described in the Privacy Policy.</p>
        <p>Termination: Scholaris reserves the right to terminate or suspend user accounts and access to the platform at its discretion, without prior notice, for any violation of these Terms and Conditions.</p>
        <p>Changes to Terms: Scholaris may update or modify these Terms and Conditions at any time. Users will be notified of significant changes. Continued use of the platform after such modifications constitutes acceptance of the updated terms.</p>
        <p>Disclaimer of Warranty: Scholaris provides the platform on an "as is" basis. We make no warranties, expressed or implied, regarding the accuracy, reliability, or availability of the platform.</p>
        <p>Limitation of Liability: Scholaris and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with the use of Scholaris.</p>
        <p>Governing Law: These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of the Philippines. Any disputes arising out of or relating to these terms will be subject to the exclusive jurisdiction of the courts of the Republic of the Philippines.</p>

        <p>If you have questions or concerns or would want to lodge a complaint, you may reach our Data Protection Officer through the following details:</p>
        <div className='content_container-contact'>
          <p className='content_contact-info'>Company Address: 10th Floor IBP Tower, Jade Drive, San Antonio, Pasig, 1605 Metro Manila</p>
          <p className='content_contact-info'>Contact Number: +63 2 8883 7103 ext. 63247</p>
          <p className='content_contact-info'>Email Address: inquire@sence1.com</p>
        </div>

        <p>Thank you for using Scholaris!</p>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
