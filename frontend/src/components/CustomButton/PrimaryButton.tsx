import { LoadingButton } from '@mui/lab'
import React from 'react'

/**
 * Props for the {@link PrimaryButton} component.
 *
 * @property {function} handleClick - The function to call when the button is clicked.
 * @property {string} label - The label to display on the button.
 * @property {boolean} loading - Indicates if the button is in a loading state.
 * @property {any} styles - The styles to apply to the button.
 * @property {boolean} disabled - Indicates if the button is disabled.
 * @property {string} id - The id of the button.
 */
interface PrimaryButtonProps {
  handleClick: any
  label: string
  loading: boolean
  styles?: any
  disabled?: boolean
  id?: string
}

/**
 * A primary button component that displays a label and handles click events.
 *
 * @param {PrimaryButtonProps} props - The properties for the PrimaryButton component.
 * @returns {JSX.Element} The rendered PrimaryButton component.
 */
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  handleClick,
  label,
  loading,
  styles,
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
      onClick={handleClick}
      variant="contained"
      sx={{
        fontSize: '24px',
        borderRadius: '16px',
        padding: '20px',
        backgroundColor: 'primary.main',
        '&:hover': { backgroundColor: 'secondary.main' },
        color: '#fff',
        height: '100%',
        ...styles,
      }}
    >
      {label}
    </LoadingButton>
  )
}

export default PrimaryButton
