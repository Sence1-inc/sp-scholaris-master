/* eslint--disable no-var */

interface FeaturesProps {
  features: FeatureProps[]
  contentType?: string
  usertype?: string
}

interface FeatureProps {
  title: string
  desc: string
  image: string
  isEven?: boolean /* to swicth images and text */
}
