/* eslint--disable no-var */

export interface FeaturesProps {
    features: FeatureProps[];
}

interface FeatureProps {
    title: string;
    desc: string;
    image: string;
    isEven?: boolean; /* to swicth images and text */
}

