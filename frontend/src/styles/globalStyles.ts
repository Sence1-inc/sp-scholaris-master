import { Button } from '@mui/material'
import { styled } from '@mui/system'

export const ctaButtonStyle = {
  borderRadius: '16px',
  padding: '20px',
  backgroundColor: 'secondary.main',
  '&:hover': { backgroundColor: 'primary.main' },
  color: 'common.white',
  height: '100%',
}

export const PrimaryButton = styled(Button)({
  borderRadius: '16px',
  padding: '20px',
  backgroundColor: '#002147',
  '&:hover': { backgroundColor: '#f36b3b' },
  color: '#fff',
  height: '100%',
})

export const CTAButton = styled(Button)({
  borderRadius: '16px',
  padding: '20px',
  backgroundColor: '#f36b3b',
  '&:hover': { backgroundColor: '#002147' },
  color: '#fff',
  height: '100%',
})
