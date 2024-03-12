import { Box, Container, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Feature from './Feature'
import './Feature.css'

const FeatureGuides = ({ features, contentType }: FeaturesProps) => {
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
