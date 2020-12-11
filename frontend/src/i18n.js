import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../public/locales';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    resources,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
