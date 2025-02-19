import { AlertColor } from '@mui/material'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import SnackbarComponent from '../components/CustomSnackbar/SnackbarComponent'

/**
 * The type of the snackbar context, providing a method to show messages.
 */
interface SnackbarContextType {
  /**
   * Displays a message in the snackbar.
   *
   * @param {string} message - The message to display.
   * @param {AlertColor} severity - The severity level of the message (e.g., 'success', 'error', 'info', 'warning').
   * @param {number} [duration=3000] - The duration in milliseconds for which the message should be displayed. Defaults to 3000ms.
   * @param {() => void} [handleWarningProceed] - Optional callback function to execute when the user acknowledges a warning.
   */
  showMessage: (
    message: string,
    severity: AlertColor,
    duration?: number,
    handleWarningProceed?: () => void
  ) => void
}

/**
 * The context for managing snackbar messages.
 *
 * This context provides a way to show snackbar messages throughout the application.
 * It should be used within a SnackbarProvider to access the showMessage function.
 */
const SnackbarContext = createContext<SnackbarContextType>({
  showMessage: () => {
    throw new Error('SnackbarProvider not found')
  },
})

/**
 * The props for the SnackbarProvider component.
 *
 * @param {ReactNode} children - The child components that will have access to the snackbar context.
 */
interface SnackbarProviderProps {
  children: ReactNode
}

/**
 * The provider component for the snackbar context.
 *
 * This component wraps its children with the SnackbarContext provider,
 * allowing them to access the snackbar functionality.
 *
 * @param {SnackbarProviderProps} props - The properties for the SnackbarProvider component.
 * @returns {JSX.Element} The rendered SnackbarProvider component.
 */
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<AlertColor>('info')
  const [duration, setDuration] = useState(3000)
  const [handleWarningProceed, setHandleWarningProceed] = useState<
    (() => void) | undefined
  >(undefined)

  /**
   * The function to show a message.
   */
  const showMessage = useCallback(
    (
      message: string,
      severity: AlertColor,
      duration: number = 3000,
      handleWarningProceed?: () => void
    ) => {
      setMessage(message)
      setSeverity(severity)
      setDuration(severity === 'warning' ? 8000 : duration)
      setHandleWarningProceed(() => handleWarningProceed || undefined)
      setIsOpen(true)
    },
    []
  )

  /**
   * The function to close a message.
   */
  const closeMessage = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => setIsOpen(false), duration)

      return () => clearTimeout(timer)
    }
  }, [isOpen, duration])

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
  )
}

/**
 * A custom hook to use the snackbar context.
 *
 * This hook provides access to the snackbar context, allowing components
 * to display messages using the showMessage function.
 *
 * @returns {SnackbarContextType} The snackbar context, including the showMessage function.
 * @throws {Error} If used outside of a SnackbarProvider.
 */
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}
