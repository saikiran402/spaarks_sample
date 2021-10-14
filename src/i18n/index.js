import I18n from 'react-native-i18n';
import en from './locales/en';
import hi from './locales/hi';
import te from './locales/te';
import or from "./locales/or";
// import es from './locales/es'; 
// import jp from './locales/jp';  

I18n.fallbacks = true;

I18n.translations = {
  en,
  hi,
  te,
  or
//   es,
//   jp,
};

export default I18n; 