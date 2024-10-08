import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import SnackbarComponent from '../components/CustomSnackbar/SnackbarComponent';
import { AlertColor } from '@mui/material';

interface SnackbarContextType {
  showMessage: (message: string, severity: AlertColor, duration?: number, handleWarningProceed?: () => void) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  showMessage: () => { throw new Error('SnackbarProvider not found') },
});

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [duration, setDuration] = useState(3000);
  const [handleWarningProceed, setHandleWarningProceed] = useState<(() => void) | undefined>(undefined);


  // Memoized showMessage to avoid unnecessary re-creation on each render
  const showMessage = useCallback((message: string, severity: AlertColor, duration: number = 3000, handleWarningProceed?: () => void ) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(severity === 'warning' ? 8000 : duration);
    setHandleWarningProceed(() => handleWarningProceed || undefined);
    setIsOpen(true);
  }, []);

  // Close the snackbar
  const closeMessage = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Effect for handling auto-close
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => setIsOpen(false), duration);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or re-render
    }
  }, [isOpen, duration]);

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <SnackbarComponent
        isOpen={isOpen}
        message={message}
        severity={severity}
        handleClose={closeMessage}
        handleWarningProceed={handleWarningProceed}
      />
    </SnackbarContext.Provider>
  );
};

// Custom hook to use the Snackbar context
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};