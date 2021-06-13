import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  sticky: {
    height: '100vh',
    position: 'sticky',
    top: 0
  },
  firstContent: {
    background: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
    borderRight: theme.palette.type !== 'dark' ? '1px solid #eeeeee' : 'none',
    [theme.breakpoints.down('xs')]: {
      height: '100vh',
    },
  },
  secondContent: {
    background: theme.palette.type === 'dark' ? theme.palette.secondary.dark : theme.palette.primary.light,
  },
  weatherImgContainer: {
    background: theme.palette.primary.dark
  },
  weatherImgBackground: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    position: 'absolute',
    padding: '20px 0',
    width: '100%',
    height: '100%',
    opacity: '.1'
  },
  weatherImg: {
    margin: '20px 0'
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
    fontSize: '1.5rem',
    textTransform: 'capitalize'
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