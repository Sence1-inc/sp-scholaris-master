/* eslint--disable no-var */

interface AppProps {
    features: Feature[];
}

interface Feature {
    title: string;
    desc: string;
    image: string;
    isEven?: boolean; /* to swicth images and text */
}

