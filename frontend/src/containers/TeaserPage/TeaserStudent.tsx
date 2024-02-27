import React from "react";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import Newsletter from "../../components/Newsletter/Newsletter";
import FeatureGuides from "../../components/Feature/FeatureGuides";
import { STUDENT_TYPE } from "../../constants/constants";
import {
  FEATURES,
  STUDENT_WELCOME_SUBHEADER,
  STUDENT_WELCOME_THIRD_LEVEL_HEADING,
} from "../../data/StudentContent";
import Search from "../../components/Search/Search";

const HomePage: React.FC = () => {
  return (
    <>
      <WelcomeSection
        subheader={STUDENT_WELCOME_SUBHEADER}
        third_level_header={STUDENT_WELCOME_THIRD_LEVEL_HEADING}
      />
      <Newsletter
        user_type={STUDENT_TYPE}
        title_content={
          <>
            Hear the latest from{" "}
            <span className="newsletter-subheader__orange">Scholaris</span>
          </>
        }
        subtitle_content={"Sign up for our newsletter"}
        description_content={"Get the latest news about exciting new features"}
      />
      <FeatureGuides features={FEATURES} contentType="studentFeatures" />
      <Search isSection />
    </>
  );
};

export default HomePage;
