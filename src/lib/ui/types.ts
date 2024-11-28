import {light, lightPalette} from './palette';

type LiteralToCommon<T extends PropertyKey> = T extends number
  ? number
  : T extends string
    ? string
    : T extends symbol
      ? symbol
      : never;

export type Mutable<T> = {
  -readonly [K in keyof T]: T[K] extends PropertyKey
    ? LiteralToCommon<T[K]>
    : Mutable<T[K]>;
};

export type ThemeName = 'light' | 'dim' | 'dark';
export type ReadOnlyTheme = typeof light;
export type Theme = Mutable<ReadOnlyTheme>;
export type ReadOnlyPalette = typeof lightPalette;
export type Palette = Mutable<ReadOnlyPalette>;
