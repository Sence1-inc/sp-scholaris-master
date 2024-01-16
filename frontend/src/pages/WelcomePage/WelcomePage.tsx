import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WelcomeImage from '../../public/images/welcome-icon.png';
import './WelcomePage.css';

function WelcomePage() {
  return (
    <>
      <Header />
      <div className="content__welcome-intro">
        <div className="container">
          <img src={WelcomeImage} alt="" />
          <h2>Welcome to <span className="color-secondary">Scholaris</span>!</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet purus nulla. Suspendisse egestas erat eu lectus semper, quis sollicitudin diam blandit. Sed rhoncus, nisi ac sollicitudin ultricies, ante turpis fermentum elit, id euismod dolor augue mollis dui. Integer efficitur diam sed tellus feugiat, et posuere tortor vestibulum. </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet purus nulla. Suspendisse egestas erat eu lectus semper, quis sollicitudin diam blandit. Sed rhoncus, nisi ac sollicitudin ultricies, ante turpis fermentum elit, id euismod dolor augue mollis dui. Integer efficitur diam sed tellus feugiat, et posuere tortor vestibulum. </p>
        </div>
      </div>
      <div className="content__welcome-selection">
        <div className="container">
          <div>
            <h3 className="text-center mb-2">Dream, Achieve, Succeed: Your Journey<br />Begins with <span className="color-secondary">Scholaris</span>.</h3>
            <p className="text-center">Begin your journey now. Are you an aspiring student or <br />a scholarship-granting organization?</p>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default WelcomePage;
