import {reloadAsync} from 'expo-updates';
import * as I18n from 'i18n-js';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import {I18nManager} from 'react-native';

import i18n from '.';

type LocalizationContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (scope: I18n.Scope, options?: I18n.TranslateOptions) => string;
};

const LocalizationContext = createContext<LocalizationContextType>({
  locale: 'en',
  setLocale: () => {},
  t: scope => i18n.t(scope),
});

export const LocalizationProvider = ({children}: PropsWithChildren) => {
  const [locale, setLocaleState] = useState(i18n.locale);

  const setLocale = async (lang: string) => {
    const isRTL = lang === 'he';
    I18nManager.forceRTL(isRTL);
    i18n.locale = lang;
    await reloadAsync();
    setLocaleState(lang);
  };

  useEffect(() => {
    const isRTL = i18n.locale === 'he';
    I18nManager.forceRTL(isRTL);
  }, [locale]);

  return (
    <LocalizationContext.Provider value={{locale, setLocale, t: i18n.t}}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);
