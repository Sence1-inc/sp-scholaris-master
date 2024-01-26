/* eslint--disable no-var */

interface FeaturesProps {
    features: FeatureProps[];
}

interface FeatureProps {
    title: string;
    desc: string;
    image: string;
    isEven?: boolean; /* to swicth images and text */
}

