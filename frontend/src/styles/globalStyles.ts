export const primaryButtonStyle = {
  borderRadius: '16px',
  padding: '20px',
  backgroundColor: 'primary.main',
  '&:hover': { backgroundColor: 'secondary.main' },
  color: 'common.white',
}

export const ctaButtonStyle = {
  borderRadius: '16px',
  padding: '20px',
  backgroundColor: 'secondary.main',
  '&:hover': { backgroundColor: 'primary.main' },
  color: 'common.white',
}

export const textField = {
  borderRadius: '16px',
  width: '100%',
  '& fieldset': { border: 'none' },
  border: '1px solid var(--primary-color)',
  boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
}
