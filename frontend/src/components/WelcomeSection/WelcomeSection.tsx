import React from "react";
import { useLocation } from "react-router-dom";
import PrimaryButton from "../Button/PrimaryButton";

import "./WelcomeSection.css";

interface WelcomeSectionProps {
  subheader?: string;
  third_level_header?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  subheader,
  third_level_header,
}) => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <section className="section__welcome">
        <div className="container">
          <h2 className="mb-2">
            Welcome to <span className="color-secondary">Scholaris</span>
          </h2>
          <div dangerouslySetInnerHTML={{ __html: subheader as string }}></div>
          <div
            dangerouslySetInnerHTML={{ __html: third_level_header as string }}
          ></div>
          <div className="section__buttons">
            <PrimaryButton
              url={
                location.pathname === "/student"
                  ? "/student#search"
                  : "/provider#features"
              }
              label={
                location.pathname === "/student"
                  ? "Seach Scholarships"
                  : "Get Started"
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default WelcomeSection;
