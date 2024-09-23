import { Box, Container, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PROVIDER_TYPE } from '../../constants/constants'
import Feature from './Feature'
import './Feature.css'

const FeatureGuides = ({ features, contentType, usertype }: FeaturesProps) => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const { hash } = useLocation()
  const featuresRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (featuresRef.current && hash === '#features' && !hasScrolled) {
      featuresRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'start',
      })

      setHasScrolled(true)
    }

    return () => {
      setHasScrolled(false)
    }
    // eslint-disable-next-line
  }, [featuresRef, hash])
  return (
    <Box
      id="features"
      ref={featuresRef}
      className={`featureGuides ` + contentType}
    >
      <Container className="container-1040">
        <Typography variant="h2">Feature Guides</Typography>
        {usertype === PROVIDER_TYPE ? (
          <Typography>
            We are planning to implement some functions that will be more
            convenient for students to use. Please subscribe to our newsletter
            to receive the latest updates.
          </Typography>
        ) : (
          ''
        )}
        {features.map((feature: FeatureProps, index: number) => {
          return (
            <Feature
              key={index}
              title={feature.title}
              desc={feature.desc}
              image={feature.image}
              isEven={index % 2 ? true : false}
            />
          )
        })}
      </Container>
    </Box>
  )
}

export default FeatureGuides
