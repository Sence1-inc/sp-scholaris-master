import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { AlertColor } from '@mui/material';

interface SnackbarComponentProps {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
  duration?: number;
  handleClose: () => void;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({
  isOpen,
  message,
  severity,
  duration = 3000,
  handleClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
      autoHideDuration={duration}
      onClose={handleClose}
      sx={{
        maxWidth: '600px',
        '& .MuiSnackbarContent-root': {
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        role="alert"
        sx={{
          width: '100%',
          padding: '16px', // Adjust padding for more breathing room
          fontSize: '16px', // Adjust font size for better readability
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
          color: '#ffffff',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;