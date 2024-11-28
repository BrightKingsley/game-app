import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import {reloadAsync} from 'expo-updates';
import {I18n} from 'i18n-js';
import {I18nManager} from 'react-native';

import en from './en.json';
import he from './he.json';

const i18n = new I18n();

i18n.translations = {
  en,
  he,
};

// Fallback to English if a translation isn't available in the selected language
i18n.defaultLocale = 'en';

// Set initial language
export const setLanguage = async (language: string) => {
  i18n.locale = language;
  const isRTL = language === 'he'; // Assuming Hebrew is the only RTL language

  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);

  // You need to reload your app for changes to take effect
  reloadAsync();
};

const getIsRTL = () => {
  const locales = Localization.getLocales();
  if (locales && locales.length > 0) {
    const textDirection = locales[0].textDirection;
    return textDirection === 'rtl';
  }
  return false;
};

export const IS_RTL = getIsRTL();

I18nManager.allowRTL(IS_RTL);
I18nManager.forceRTL(IS_RTL);

// export const IS_RTL = I18nManager.isRTL;
export default i18n;
