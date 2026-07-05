import i18next from 'i18next';
import esTranslation from './public/locales/es/locales.json';

i18next.init({
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false, 
  },
  resources: {
    es: {
      translation: esTranslation
    }
  }
});

// Exportamos la función t directamente
export const t = i18next.t; 

export default i18next;