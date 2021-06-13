import { Backdrop, Box, CircularProgress, Grid, Hidden, IconButton, MenuItem, Switch, TextField } from '@material-ui/core';
import { Brightness2Outlined, Brightness5Outlined, ExploreOutlined, KeyboardArrowDown, LocationOnOutlined } from '@material-ui/icons';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './App.style';
import weatherBackground from './assets/Cloud-background.png';
import CustomSlider from './components/CustomSlider';
import DailyWeatherCard from './components/DailyWeatherCard/DailyWeatherCard';
import MiniCard from './components/MiniCard/MiniCard';
import SearchField from './components/SearchField/SearchField';
import { IThemeContext, themeContext } from './context/theme';
import useApi from './hooks/useApi';
import useGeolocation from './hooks/useGeolocation';
import { CurrentWeatherData, DailyWeatherData } from './interfaces';
import { convertMsToKmh, formatDate, getWeatherImg, windDgToDirection } from './utils';

const App = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { getUserCoordinates } = useGeolocation();
  const { darkMode, setDarkMode } = useContext(themeContext) as IThemeContext;
  const { http } = useApi('https://api.openweathermap.org');
  const [location, setLocation] = useState<string>('Santiago');
  const [unit, setUnit] = useState<'standart' | 'metric' | 'imperial'>('metric');
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>();
  const [weeklyWeather, setWeeklyWeather] = useState<DailyWeatherData[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const weatherImg = currentWeather && getWeatherImg(currentWeather.weather[0].main, currentWeather.weather[0].id);
  const weatherTemp = currentWeather && Math.round(Number(currentWeather.temp));
  const weatherDescription = currentWeather && currentWeather.weather[0].description;
  const weatherDate = currentWeather && formatDate(currentWeather.dt || 0, 'long', lang);
  const weatherWindSpeed = currentWeather && unit === 'metric' ? convertMsToKmh(currentWeather.wind_speed) : currentWeather?.wind_speed;
  const weatherWindDirection = currentWeather && windDgToDirection(currentWeather.wind_deg);
  const weatherAtmosphericTemp = currentWeather && unit !== 'metric' ? Math.round(currentWeather.dew_point) : currentWeather?.dew_point;
  const sliderMarks = [{ value: 0, label: '0%' }, { value: 50, label: '50%' }, { value: 100, label: '100%' }];
  const units = ['standart', 'metric', 'imperial'];
  const tempUnits = {
    'standart': 'K',
    'metric': 'C',
    'imperial': 'F'
  };
  const windUnits = {
    'standart': 'm/s',
    'metric': 'km/h',
    'imperial': 'm/h'
  };

  const getWeeklyWeatherData = useCallback(async (cityName: string, unitType: string, language: string): Promise<void> => {
    setIsLoading(true);
    try {
      const locationInfo = await http(`/geo/1.0/direct?appid=57027ee63402f4fa5a44200cf9f826fb&q=${cityName}&limit=1`, 'GET');
      const { lat: latitude, lon: longitude } = locationInfo[0];
      const data = await http(`/data/2.5/onecall?appid=57027ee63402f4fa5a44200cf9f826fb&lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&units=${unitType}&lang=${language}`, 'GET');
      setCurrentWeather(data.current);
      data.daily.shift();
      data.daily.pop();
      setWeeklyWeather(data.daily);
      setError(false);
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);
  }, [http]);

  useEffect(() => {
    const fetchData = async () => {
      await getWeeklyWeatherData(location, unit, lang);
    };
    i18n.changeLanguage(lang);
    fetchData();
  }, [location, unit, lang, i18n, getWeeklyWeatherData]);

  const getCurrentLocation = async (): Promise<void> => {
    const coords = await getUserCoordinates();
    if (coords) {
      const country = await http(`/geo/1.0/reverse?appid=57027ee63402f4fa5a44200cf9f826fb&lat=${coords.latitude}&lon=${coords.longitude}&limit=1`, 'GET');
      country[0] && setLocation(country[0].name);
    } else {
      alert('Debe permitir el uso de ubicación');
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={5} lg={3} className={classes.firstContent}>
        <div className={classes.sticky}>
          <Box px={6} py={3} display="flex">
            <SearchField defaultValue="" onSubmit={setLocation} onSubmitLocation={getCurrentLocation} error={error} errorMessage={t('errorSearch')} placeholder={t('city')}/>
          </Box>
          <Box display="flex" position="relative" justifyContent="center" className={classes.weatherImgContainer}>
            <img src={weatherBackground} alt="Weather" className={classes.weatherImgBackground}></img>
            {currentWeather && <img src={weatherImg} alt="weather" className={classes.weatherImg}></img>}
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <h2 className={classes.weatherCurrentTemp}>{weatherTemp}</h2>
            <span className={classes.tempText}>°{tempUnits[unit]}</span>
          </Box>
          <Box>
            <h4 className={classes.weatherTypeText}>{weatherDescription}</h4>
            <h5 className={classes.weatherTime}>{weatherDate}</h5>
            <div className={classes.locationText}><LocationOnOutlined fontSize="large"/> {location}</div>
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
            <TextField
              value={unit}
              onChange={(e: any) => setUnit(e.target.value)}
              label={t('unit')}
              size="small"
              variant="outlined"
              select
            >
              {units.map((item) => (<MenuItem value={item} key={item}>{item}</MenuItem>))}
            </TextField>
              <TextField
                value={lang}
                onChange={(e: any) => setLang(e.target.value)}
                variant="outlined"
                className={classes.select}
                size="small"
                select
              >
                <MenuItem value="es">Es</MenuItem>
                <MenuItem value="en">En</MenuItem>
              </TextField>
            <Brightness2Outlined />
            <Switch value={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <Brightness5Outlined />
          </Hidden>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <h2 className={classes.hightlightsText}>{t('weeklyWeather')}</h2>
          </Grid>
          {weeklyWeather.map((item: DailyWeatherData) => {
            return (
              <Grid item xs={6} md={4} lg={2} key={item.dt} className={classes.cardWeatherContainer}>
                <DailyWeatherCard 
                  date={formatDate(item.dt, 'short', lang)}
                  img={getWeatherImg(item.weather[0].main, item.weather[0].id)}
                  minTemp={Math.round(item.temp.min)}
                  maxTemp={Math.round(item.temp.max)}
                  tempType={tempUnits[unit]}
                />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <h2 className={classes.hightlightsText}>{t('todaysHightlights')}</h2>
          </Grid>
          <Grid item xs={12} md={6} className={classes.cardWeatherContainer}>
            <MiniCard title={t('humidity')} value={currentWeather?.humidity} type='%'>
              <CustomSlider 
                value={currentWeather?.humidity || 0}
                marks={sliderMarks} 
                disabled
              />
            </MiniCard>
          </Grid>
          <Grid item xs={12} md={6} className={classes.cardWeatherContainer}>
            <MiniCard title={t('windStatus')} value={weatherWindSpeed} type={windUnits[unit]}>
              <div className={classes.windDirectionTxt}><ExploreOutlined fontSize="large" />{weatherWindDirection}</div>
            </MiniCard>
          </Grid>
          <Grid item xs={12} md={6} className={classes.cardWeatherContainer}>
            <MiniCard title={t('visibility')} value={currentWeather?.visibility} type={'mts'} />
          </Grid>
          <Grid item xs={12} md={6} className={classes.cardWeatherContainer}>
            <MiniCard title={t('airPressure')} value={currentWeather?.pressure} type={'hPa'} />
          </Grid>
          <Grid item xs={12} md={6} className={classes.cardWeatherContainer}>
            <MiniCard title={t('atmosphericTemperature')} value={weatherAtmosphericTemp} type={'°'+tempUnits[unit]} />
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