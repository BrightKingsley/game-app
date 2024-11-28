import i18n from './index';

export type Translations = typeof import('./en.json');

const t = <K extends keyof Translations>(key: K): string => {
  return i18n.t(key);
};

export default t;
