import { Box, makeStyles, Theme } from '@material-ui/core';

interface DailyWeatherCardProps {
  date: string;
  img: string;
  minTemp: number;
  maxTemp: number;
  tempType: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light
  },
  date: {
    fontFamily: 'Raleway',
    textAlign: 'center'
  },
  temp: {
    margin: '15px 0 0',
    textAlign: 'center',
    fontFamily: 'Raleway',
  },
  imgContainer: {
    background: theme.palette.type === 'light' ? theme.palette.primary.dark : 'inherit'
  },
  img: {
    maxHeight: '80px',
    margin: '10px 0'
  }
}));

const DailyWeatherCard = ({ date, img, minTemp, maxTemp, tempType }: DailyWeatherCardProps) => {
  const classes = useStyles();

  return (
    <Box py={1} borderRadius={3} className={classes.container} boxShadow="2">
      <Box className={classes.date}>
        {date}
      </Box>
      <Box display="flex" justifyContent="center" className={classes.imgContainer}>
        <img src={img} alt="weather" className={classes.img}></img>
      </Box>
      <Box display="flex">
        <Box width="50%" mb={1} className={classes.temp}>{minTemp}°{tempType}</Box>
        <Box width="50%" mb={1} className={classes.temp}>{maxTemp}°{tempType}</Box>
      </Box>
    </Box>
  );
};

export default DailyWeatherCard;