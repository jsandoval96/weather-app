export const formatDate = (date: number, type: 'short' | 'long', lang: 'es' | 'en'): string => {
  const dat = new Date(date * 1000);
  const language = lang === 'es' ? 'es-CL' : 'en-Us';

  return type === 'long'
    ? dat.toLocaleDateString(language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : dat.toLocaleDateString(language, { weekday: 'short', month: 'short', day: 'numeric' });
};

export const convertMsToKmh = (val: number): number => Math.round(val * 3.6);

export const windDgToDirection = (val: number): string => {
  const value = Math.floor((val / 22.5) + 0.5);
  var arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

  return arr[(value % 16)];
};

export const getWeatherImg = (type: string, code: number): string => {
  const imgs: any = {
    'Clouds': () => code >= 801 && code <= 802 ? require('../assets/LightCloud.png').default : require('../assets/HeavyCloud.png').default,
    'Clear': () => require('../assets/Clear.png').default,
    'Thunderstorm': () => require('../assets/Thunderstorm.png').default,
    'Rain': () => code >= 500 && code <= 501 ? require('../assets/LightRain.png').default : code >= 502 && code <= 511 ? require('../assets/HeavyRain.png').default : require('../assets/Shower.png').default,
    'Snow': () => code >= 600 && code <= 602 ? require('../assets/Snow.png').default : require('../assets/Sleet.png').default
  };
  
  return imgs[type]();
};