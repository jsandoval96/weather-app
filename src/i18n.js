import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import en from './assets/locales/en/translation.json';
import es from './assets/locales/es/translation.json';

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'es',
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
