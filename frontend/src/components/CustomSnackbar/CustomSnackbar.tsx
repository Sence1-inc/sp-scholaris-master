import { Alert, Box, Button, Snackbar, Typography } from '@mui/material'
import React from 'react'

interface CustomSnackbarProps {
  isSnackbarOpen: boolean
  handleSetIsSnackbarOpen: (value: boolean) => void
  handleWarningProceed?: () => void
  successMessage?: string
  errorMessage?: string
  warningMessage?: string
  infoMessage?: string
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  isSnackbarOpen,
  successMessage,
  errorMessage,
  warningMessage,
  infoMessage,
  handleSetIsSnackbarOpen,
  handleWarningProceed,
}) => {
  const renderBody = () => {
    if (successMessage) {
      return <Typography>{successMessage}</Typography>
    } else if (errorMessage) {
      return <Typography>{errorMessage}</Typography>
    } else if (warningMessage) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>{warningMessage}</Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              color="primary"
              onClick={() => handleSetIsSnackbarOpen(false)}
              sx={{ alignSelf: 'center' }}
            >
              Cancel
            </Button>
            <Button
              color="inherit"
              onClick={handleWarningProceed}
              sx={{ alignSelf: 'center' }}
            >
              Proceed
            </Button>
          </Box>
        </Box>
      )
    } else if (infoMessage) {
      return <Typography>{infoMessage}</Typography>
    } else {
      return ''
    }
  }

  const renderSeverity = () => {
    if (successMessage) {
      return 'success'
    } else if (errorMessage) {
      return 'error'
    } else if (warningMessage) {
      return 'warning'
    } else {
      return 'info'
    }
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isSnackbarOpen}
      onClose={() => handleSetIsSnackbarOpen(false)}
      autoHideDuration={warningMessage ? 8000 : 5000}
      key="topcenter"
    >
      <Alert
        onClose={() => handleSetIsSnackbarOpen(false)}
        severity={renderSeverity()}
        variant={successMessage ? 'filled' : 'standard'}
        sx={{ width: '100%' }}
      >
        {renderBody()}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackbar
