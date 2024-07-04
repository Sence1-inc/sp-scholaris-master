import theme from './theme'

const profiletheme = {
  heading: {
    mainHeading: {
      marginBottom: 4,
      fontSize: 48,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      color: theme.palette.primary.main,
      textAlign: 'left',
    },
    titleHeading1: {
      marginBottom: 1,
      fontSize: 36,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      color: theme.palette.primary.main,
      textAlign: 'center',
    },
    titleHeading2: {
      fontFamily: 'Roboto',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#002147',
    },
  },
  text: {
    textLight: {
      marginBottom: 1,
      fontSize: 18,
      fontWeight: 'light',
      fontFamily: 'Roboto',
      color: theme.palette.primary.main,
      textAlign: 'center',
    },
    textRegular: {
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: 'regular',
      color: '#767676',
    },
    textRegularSide: {
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      color: '#002147',
      textAlign: 'center',
    },
  },
  container: {
    rootContainer: {
      width: '100%',
      my: 10,
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 3,
    },
    cardContainer: {
      width: '70%',
      height: 'auto',
      backgroundColor: '#afc3d9',
      borderRadius: 8,
    },
    cardSideContainer: {
      width: '30%',
      backgroundColor: '#e2e1e1',
      borderRadius: 8,
    },
  },
  box: {
    boxStyle: {
      py: 3,
      px: 4,
      backgroundColor: '#95a8bd',
    },
    boxBodyStyle: {
      width: '100%',
      p: 4,
      display: 'flex',
      flexDirection: 'column',
    },
    boxBodyStyle2: {
      marginTop: 2,
      display: 'flex',
      flexDirection: 'row',
      gap: 2,
    },
    boxContentStyle: {
      width: '100%',
      marginBottom: 4,
    },
    boxSideContentstyle: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 1,
      backgroundColor: '#d2d2d2',
      px: 4,
      py: 2,
    },
  },
  form: {
    formStyle: {
      marginBottom: 2,
    },
    formLabel: {
      fontFamily: 'Roboto',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 1,
      color: '#002147',
    },
    formInput: {
      backgroundColor: '#ffffff',
      borderRadius: 4,
      border: '1px solid #656565',
      boxShadow: 'inset -1px -1px 4px #656565',
      '& .MuiOutlinedInput-root': {
        '& .MuiInputBase-input': {
          height: 40,
          fontSize: 20,
        },
        '& fieldset.MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      },
    },
  },
  button: {
    buttonMain: {
      py: 2,
      px: 4,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 2,
      borderRadius: 0,
      fontSize: 16,
      fontWeight: 'meidum',
      color: '#002147',
      textAlign: 'left',
    },
    buttonActive: {
      backgroundColor: '#f36b3b',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#d75e33',
      },
    },
  },
}

export default profiletheme
