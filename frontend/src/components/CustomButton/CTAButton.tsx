import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React from 'react'
import profileTheme from '../../styles/profileTheme';

/**
 * Props for the {@link CTAButton} component.
 *
 * @property {string} icon - The icon to display on the button.
 * @property {function} handleClick - The function to call when the button is clicked.
 * @property {string} label - The label to display on the button.
 * @property {boolean} loading - Indicates if the button is in a loading state.
 * @property {any} styles - The styles to apply to the button.
 * @property {boolean} disabled - Indicates if the button is disabled.
 * @property {string} id - The id of the button.
 */
interface CTAButtonProps {
  icon?: string
  handleClick: any
  label: string
  loading: boolean
  styles?: any
  disabled?: boolean
  id?: string
}

/**
 * A customizable call-to-action button component.
 *
 * @param {CTAButtonProps} props - The properties for the CTAButton component.
 * @returns {JSX.Element} The rendered CTAButton component.
 */
const CTAButton: React.FC<CTAButtonProps> = ({
  handleClick,
  label,
  loading,
  styles,
  icon,
  disabled = false,
  id,
}) => {
  return (
    <LoadingButton
      id={id}
      disabled={disabled}
      fullWidth
      loading={loading}
      loadingPosition="center"
      disableRipple={true}
      onClick={handleClick}
      variant="contained"
      sx={{
        borderRadius: '16px',
        padding: '20px',
        backgroundColor: 'secondary.main',
        '&:hover': { backgroundColor: 'primary.main' },
        color: '#fff',
        height: '100%',
        ...styles,
      }}
    >
      {icon && <Box component="img" sx={profileTheme.button.buttonIcon} src={icon} alt='icon' />}
      {label}
    </LoadingButton>
  )
}

export default CTAButton
