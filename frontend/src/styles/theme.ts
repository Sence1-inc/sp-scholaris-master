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
      paper: '#a8dadc',
      default: '#ffffff',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "'Outfit', 'sans-serif'",
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: "'Roboto', 'sans-serif'",
      fontSize: '4.8rem',
      fontWeight: 700,
      lineHeight: 1.167,
      color: '#002147',
    },
    h2: {
      fontFamily: "'Roboto', 'sans-serif'",
      fontSize: '3.6rem',
      fontWeight: 700,
      lineHeight: 1.3,
      color: '#002147',
      '@media (max-width:768px)': {
        fontSize: '2.2rem',
      },
    },
    h3: {
      fontFamily: "'Roboto', 'sans-serif'",
      fontSize: '2.4rem',
      fontWeight: 700,
      lineHeight: 1.5,
      color: '#002147',
      '@media (max-width:768px)': {
        fontSize: '2.0rem',
      },
    },
    h4: {
      fontFamily: "'Roboto', 'sans-serif'",
      fontSize: '2.0rem',
      fontWeight: 700,
      lineHeight: 1.5,
      color: '#002147',
      '@media (max-width:768px)': {
        fontSize: '1.8rem',
      },
    },
    h5: {
      fontFamily: "'Roboto', 'sans-serif'",
      fontSize: '1.8rem',
      fontWeight: 700,
      lineHeight: 1.5,
      color: '#002147',
      '@media (max-width:768px)': {
        fontSize: '1.6rem',
      },
    },
    h6: {
      fontFamily: "'Roboto', 'sans-serif'",
      fontSize: '1.4rem',
      fontWeight: 700,
      lineHeight: 1.5,
      color: '#002147',
      '@media (max-width:768px)': {
        fontSize: '1.2rem',
      },
    },
    body1: {
      fontFamily: "'Outfit', 'sans-serif'",
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.3,
      '@media (max-width:768px)': {
        fontSize: '0.875rem',
      },
    },
    body2: {
      fontFamily: "'Outfit', 'sans-serif'",
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.5,
      '@media (max-width:768px)': {
        fontSize: '0.875rem',
      },
    },
    subtitle1: {
      fontFamily: "'Outfit', 'sans-serif'",
      fontSize: '0.875rem',
      fontWeight: 300,
      lineHeight: 1.5,
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
          padding: '22px',
          width: '100%',
          '& fieldset': { border: 'none' },
          border: '1px solid var(--primary-color)',
          boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
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
