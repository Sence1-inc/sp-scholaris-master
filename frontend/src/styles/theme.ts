import { createTheme, Theme } from '@mui/material/styles'

const theme: Theme = createTheme({
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      main: '#002147',
    },
    secondary: {
      main: '#f36b3b',
      dark: '#e86231',
    },
    background: {
      paper: '#ffffff', // #a8dadc
      default: '#ffffff',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "'Roboto', 'sans-serif'",
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: "'Outfit', 'sans-serif'",
      fontSize: '4.8rem',
      fontWeight: 800,
      color: '#002147',
    },
    h2: {
      fontFamily: "'Outfit', 'sans-serif'",
      fontSize: '4rem',
      fontWeight: 800,
      color: '#002147',
      '@media (max-width:768px)': {
        fontSize: '2.875rem',
      },
    },
    h3: {
      fontFamily: "'Outfit', 'sans-serif'",
      fontSize: '3rem',
      fontWeight: 700,
      color: '#002147',
      '@media (max-width:768px)': {
        fontSize: '1.875rem',
      },
    },
    h4: {
      fontFamily: "'Outfit', 'sans-serif'",
      fontSize: '2.0rem',
      fontWeight: 700,
      color: '#002147',
      '@media (max-width:768px)': {
        fontSize: '1.8rem',
      },
    },
    h5: {
      fontFamily: "'Outfit', 'sans-serif'",
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#002147',
      '@media (max-width:768px)': {
        fontSize: '1.6rem',
      },
    },
    h6: {
      fontFamily: "'Outfit', 'sans-serif'",
      fontSize: '1.4rem',
      fontWeight: 700,
      color: '#002147',
      '@media (max-width:768px)': {
        fontSize: '1.2rem',
      },
    },
    body1: {
      fontFamily: "'Roboto', 'sans-serif'",
      fontSize: '1.25rem',
      fontWeight: 300,
      '@media (max-width:768px)': {
        fontSize: '1rem',
      },
    },
    body2: {
      fontFamily: "'Roboto', 'sans-serif'",
      fontSize: '1rem',
      fontWeight: 700,
      '@media (max-width:768px)': {
        fontSize: '0.875rem',
      },
    },
    subtitle1: {
      fontFamily: "'Roboto', 'sans-serif'",
      fontSize: '0.875rem',
      fontWeight: 300,
      '@media (max-width:768px)': {
        fontSize: '0.750rem',
      },
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          padding: '20px',
          width: '100%',
          '& fieldset': { border: 'none' },
          border: '1px solid var(--primary-color)',
          boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
          backgroundColor: 'white',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          padding: '20px',
          width: '100%',
          '& fieldset': { border: 'none' },
          border: '1px solid var(--primary-color)',
          boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
          backgroundColor: 'white',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-input': {
            padding: '0',
          },
        },
      },
    },
  },
})

export default theme
