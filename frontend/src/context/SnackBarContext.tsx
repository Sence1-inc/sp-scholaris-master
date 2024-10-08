import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import SnackbarComponent from '../components/CustomSnackbar/SnackbarComponent';
import { AlertColor } from '@mui/material';

// Define the context type with better type safety
interface SnackbarContextType {
  showMessage: (message: string, severity: AlertColor, duration?: number) => void;
}

// Provide a default empty function for type safety instead of initializing with null
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

  // Memoized showMessage to avoid unnecessary re-creation on each render
  const showMessage = useCallback((message: string, severity: AlertColor, duration: number = 3000) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
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