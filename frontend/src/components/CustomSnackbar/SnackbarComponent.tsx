import React from 'react';
import { Alert, Snackbar, Box, Typography, Button } from '@mui/material';
import { AlertColor } from '@mui/material';

interface SnackbarComponentProps {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
  duration?: number;
  handleWarningProceed?: () => void | undefined;
  handleClose: () => void;
}

const styles = {
  warningBox: { 
    display: 'flex', 
    flexDirection: 'column' 
  },
  warningBoxButtons: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '7px 0 0 0'
  },
  warningAlign: {
    alignSelf: 'center',
  },
  snackbar: {
    maxWidth: '600px',
    '& .MuiSnackbarContent-root': {
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    }
  },
  alert: {
    width: '100%',
    padding: '16px', 
    fontSize: '16px',
    color: '#ffffff',
  }
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({
  isOpen,
  message,
  severity,
  duration,
  handleWarningProceed,
  handleClose,
}) => {

  const warningMessage = (severity: AlertColor) => {
    if(severity === 'warning') {
      return (
        <Box sx={styles.warningBox}>
          <Typography>{message}</Typography>
          <Box
            sx={styles.warningBoxButtons}
          >
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
              onClick={handleWarningProceed}
              sx={styles.warningAlign}
            >
              Proceed
            </Button>
          </Box>
        </Box>
      )
    }
  }

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
        sx={[styles.alert, {
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
        }]}
      >
        {severity === 'warning' ? warningMessage(severity) : message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;