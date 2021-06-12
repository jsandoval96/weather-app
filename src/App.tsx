import { useState, useEffect, useContext, useCallback } from 'react';
import { Grid, Box, IconButton, Hidden, Switch, Backdrop, CircularProgress } from '@material-ui/core';
import { LocationOnOutlined, ExploreOutlined, KeyboardArrowDown, Brightness5Outlined, Brightness2Outlined } from '@material-ui/icons';
import useApi from './hooks/useApi';
import useGeolocation from './hooks/useGeolocation';
import useStyles from './App.style';
import { CurrentWeatherData, DailyWeatherData } from './interfaces';

import SearchField from './components/SearchField/SearchField';
import DailyWeatherCard from './components/DailyWeatherCard/DailyWeatherCard';
import weatherBackground from './assets/Cloud-background.png';
import MiniCard from './components/MiniCard/MiniCard';
import CustomSlider from './components/CustomSlider';
import { IThemeContext, themeContext } from './context/theme';

const App = () => {
  const classes = useStyles();
  const { getUserCoordinates } = useGeolocation();
  const { darkMode, setDarkMode } = useContext(themeContext) as IThemeContext;
  const { http } = useApi('https://api.openweathermap.org');
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>();
  const [weeklyWeather, setWeeklyWeather] = useState<DailyWeatherData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sliderMarks = [{ value: 0, label: '0%' }, { value: 50, label: '50%' }, { value: 100, label: '100%' }];
  const weatherImg = `https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@4x.png`;

  const getWeeklyWeatherData = useCallback(async (cityName: string): Promise<void> => {
    const location = await http(`/geo/1.0/direct?appid=57027ee63402f4fa5a44200cf9f826fb&q=${cityName}&limit=1`, 'GET');
    const { lat: latitude, lon: longitude } = location[0];
    const data = await http(`/data/2.5/onecall?appid=57027ee63402f4fa5a44200cf9f826fb&lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&units=metric&lang=es`, 'GET');
    setCurrentWeather(data.current);
    data.daily.shift();
    data.daily.pop();
    setWeeklyWeather(data.daily);
    setCurrentLocation(cityName);
  }, [http]);

  const getCurrentLocation = useCallback(async (): Promise<void> => {
    const coords = await getUserCoordinates();
    if (coords) {
      const country = await http(`/geo/1.0/reverse?appid=57027ee63402f4fa5a44200cf9f826fb&lat=${coords.latitude}&lon=${coords.longitude}&limit=1`, 'GET');
      country[0] && await getWeeklyWeatherData(country[0].name);
    } else {
      alert('Debe permitir el uso de ubicación');
    }
  }, [getUserCoordinates, http, getWeeklyWeatherData]);

  useEffect(() => {
    const fetchData = async () => {
      const coords = await getUserCoordinates();
      if (coords) {
        await getCurrentLocation();
      } else {
        await getWeeklyWeatherData('Santiago');
      }
      setIsLoading(false);
    };

    fetchData();
  }, [getCurrentLocation, getUserCoordinates, getWeeklyWeatherData]);

  const formatDate = (date: number, type: 'short' | 'long'): string => {
    const dat = new Date(date * 1000);

    return type === 'long'
      ? dat.toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : dat.toLocaleDateString('es-CL', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const convertMsToKmh = (val: number): number => Math.round(val * 3.6);

  const windDgToDirection = (val: number): string => {
    const value = Math.floor((val / 22.5) + 0.5);
    var arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

    return arr[(value % 16)];
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={5} lg={3} className={classes.firstContent}>
        <div className={classes.sticky}>
          <Box px={6} py={3} display="flex">
            <SearchField defaultValue="" onSubmit={getWeeklyWeatherData} onSubmitLocation={getCurrentLocation} />
          </Box>
          <Box display="flex" position="relative" justifyContent="center">
            <img src={weatherBackground} alt="Weather" className={classes.weatherImg}></img>
            {!isLoading && <img src={weatherImg} alt={currentWeather?.weather[0].description} className={classes.weatherIcon}></img>}
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <h2 className={classes.weatherCurrentTemp}>{Math.round(Number(currentWeather?.temp || 0))}</h2>
            <span className={classes.tempText}>°C</span>
          </Box>
          <Box>
            <h4 className={classes.weatherTypeText}>{currentWeather?.weather[0].description}</h4>
            <h5 className={classes.weatherTime}>{formatDate(currentWeather?.dt || 0, 'long')}</h5>
            <div className={classes.locationText}><LocationOnOutlined fontSize="large"/> {currentLocation}</div>
          </Box>
          <Hidden smUp>
            <Box display="flex" justifyContent="center" paddingTop={4}>
              <IconButton href="#secondContent">
                <KeyboardArrowDown />
              </IconButton>
            </Box>
          </Hidden>
        </div>
      </Grid>
      <Grid item xs={12} sm={7} lg={9} className={classes.secondContent} id="secondContent">
        <Grid container justify="flex-end" alignItems="center" className={classes.settings}>
          <Hidden xsDown>
            <Brightness2Outlined />
            <Switch value={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <Brightness5Outlined />
          </Hidden>
        </Grid>
        <Grid container>
          {weeklyWeather.map((item: DailyWeatherData) => {
            return (
              <Grid item xs={6} md={4} lg={2} key={item.dt} className={classes.cardWeatherContainer}>
                <DailyWeatherCard 
                  date={formatDate(item.dt, 'short')}
                  img={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  minTemp={Math.round(item.temp.min)}
                  maxTemp={Math.round(item.temp.max)}
                  tempType="C"
                />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <h2 className={classes.hightlightsText}>Datos de Hoy</h2>
          </Grid>
          <Grid item xs={12} md={6} className={classes.cardWeatherContainer}>
            <MiniCard title="Humedad" value={currentWeather?.humidity} type='%'>
              <CustomSlider 
                value={currentWeather?.humidity || 0}
                marks={sliderMarks} 
                disabled
              />
            </MiniCard>
          </Grid>
          <Grid item xs={12} md={6} className={classes.cardWeatherContainer}>
            <MiniCard title="Estado del viento" value={convertMsToKmh(currentWeather?.wind_speed || 0)} type={'km/h'}>
              <div className={classes.windDirectionTxt}><ExploreOutlined fontSize="large" />{windDgToDirection(currentWeather?.wind_deg || 0)}</div>
            </MiniCard>
          </Grid>
          <Grid item xs={12} md={6} className={classes.cardWeatherContainer}>
            <MiniCard title="Visibilidad" value={currentWeather?.visibility} type={'mts'} />
          </Grid>
          <Grid item xs={12} md={6} className={classes.cardWeatherContainer}>
            <MiniCard title="Presión del aire" value={currentWeather?.pressure} type={'hPa'} />
          </Grid>
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default App;