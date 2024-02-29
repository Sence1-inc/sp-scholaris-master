import "./Feature.css";
import Feature from "./Feature";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const FeatureGuides = ({ features, contentType }: FeaturesProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { hash } = useLocation();
  const featuresRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (featuresRef.current && hash === "#features" && !hasScrolled) {
      featuresRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "start",
      });

      setHasScrolled(true);
    }

    return () => {
      setHasScrolled(false);
    };
    // eslint-disable-next-line
  }, [featuresRef, hash]);
  return (
    <section
      id="features"
      ref={featuresRef}
      className={`featureGuides ` + contentType}
    >
      <div className="container-1040">
        <h2>Feature Guides</h2>
        {features.map((feature: FeatureProps, index: number) => {
          return (
            <Feature
              key={index}
              title={feature.title}
              desc={feature.desc}
              image={feature.image}
              isEven={index % 2 ? true : false}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FeatureGuides;
