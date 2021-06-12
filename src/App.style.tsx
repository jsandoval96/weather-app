import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  sticky: {
    height: '100vh',
    position: 'sticky',
    top: 0
  },
  firstContent: {
    background: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
    [theme.breakpoints.down('xs')]: {
      height: '100vh',
    },
  },
  secondContent: {
    background: theme.palette.type === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
  },
  weatherImg: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    width: '100%',
    opacity: '0.1'
  },
  weatherIcon: {
    position: 'absolute'
  },
  weatherCurrentTemp: {
    fontFamily: 'Raleway',
    fontSize: '5rem',
    marginBlockStart: '0.5rem',
    marginBlockEnd: '0.5rem'
  },
  tempText: {
    fontSize: '2rem',
    marginTop: '2rem',
  },
  weatherTypeText: {
    textTransform: 'capitalize',
    fontSize: '1.5rem',
    textAlign: 'center',
    margin: '4rem 0',
    [theme.breakpoints.down('xs')]: {
      marginBlockStart: '1rem',
      marginBlockEnd: '1rem'
    },
  },
  weatherTime: {
    fontFamily: 'Raleway',
    textAlign: 'center',
  },
  locationText: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1.5rem'
  },
  cardWeatherContainer: {
    padding: '1rem',
  },
  hightlightsText: {
    padding: '0 2rem'
  },
  settings: {
    padding: '1rem 2rem'
  },
  windDirectionTxt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  select: {
    margin: '0 20px'
  }
}));