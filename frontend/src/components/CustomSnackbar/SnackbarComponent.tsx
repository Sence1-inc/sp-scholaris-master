import {
  Alert,
  AlertColor,
  Box,
  Button,
  Snackbar,
  Typography,
} from '@mui/material'
import React from 'react'

/**
 * Props for the {@link SnackbarComponent} component.
 *
 * @property {boolean} isOpen - Indicates if the snackbar is open.
 * @property {string} message - The message to display in the snackbar.
 * @property {AlertColor} severity - The severity of the snackbar.
 * @property {number} duration - The duration of the snackbar.
 * @property {function} handleWarningProceed - The function to call when the warning proceed button is clicked.
 * @property {function} handleClose - The function to call when the snackbar is closed.
 */
interface SnackbarComponentProps {
  isOpen: boolean
  message: string
  severity: AlertColor
  duration?: number
  handleWarningProceed?: () => void | undefined
  handleClose: () => void
}

/**
 * A customizable snackbar component.
 *
 * @param {SnackbarComponentProps} props - The properties for the SnackbarComponent component.
 * @returns {JSX.Element} The rendered SnackbarComponent component.
 */
const styles = {
  warningBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  warningBoxButtons: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '7px 0 0 0',
  },
  warningAlign: {
    alignSelf: 'center',
  },
  snackbar: {
    maxWidth: '600px',
    '& .MuiSnackbarContent-root': {
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
  },
  alert: {
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    color: '#ffffff',
  },
}

/**
 * A customizable snackbar component.
 *
 * @param {SnackbarComponentProps} props - The properties for the SnackbarComponent component.
 * @returns {JSX.Element} The rendered SnackbarComponent component.
 */
const SnackbarComponent: React.FC<SnackbarComponentProps> = ({
  isOpen,
  message,
  severity,
  duration,
  handleWarningProceed,
  handleClose,
}) => {
  /**
   * A function that returns a warning message.
   *
   * @param {AlertColor} severity - The severity of the snackbar.
   * @returns {JSX.Element} The rendered warning message.
   */
  const warningMessage = (severity: AlertColor) => {
    if (severity === 'warning') {
      return (
        <Box sx={styles.warningBox}>
          <Typography>{message}</Typography>
          <Box sx={styles.warningBoxButtons}>
            <Button
              color="error"
              variant="outlined"
              onClick={() => handleClose()}
              sx={styles.warningAlign}
            >
              Cancel
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                handleWarningProceed && handleWarningProceed()
                handleClose()
              }}
              sx={styles.warningAlign}
            >
              Proceed
            </Button>
          </Box>
        </Box>
      )
    }
  }

  /**
   * A function that renders the snackbar component.
   *
   * @returns {JSX.Element} The rendered snackbar component.
   */
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
      autoHideDuration={duration}
      onClose={handleClose}
      sx={styles.snackbar}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        role="alert"
        sx={[
          styles.alert,
          {
            backgroundColor:
              severity === 'success'
                ? '#4caf50'
                : severity === 'error'
                  ? '#f44336'
                  : severity === 'warning'
                    ? '#ff9800'
                    : severity === 'info'
                      ? '##4dabf5'
                      : '#2196f3',
          },
        ]}
      >
        {severity === 'warning' ? warningMessage(severity) : message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComponent
