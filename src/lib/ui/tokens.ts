import {BLUE_HUE, generateScale, GREEN_HUE, RED_HUE} from './color-generation';

export const scale = generateScale(6, 100);
export const dimScale = generateScale(12, 100);

export const space = {
  _2xs: 2,
  xs: 4,
  sm: 8,
  md: 10,
  lg: 14,
  xl: 18,
  _2xl: 20,
  _3xl: 24,
  _4xl: 28,
  _5xl: 32,
  _6xl: 38,
};

export const fontSize = {
  _2xs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  _2xl: 22,
  _3xl: 26,
  _4xl: 32,
  _5xl: 40,
};

export const lineHeight = {
  none: 1,
  normal: 0.5,
  relaxed: 1.625,
} as const;

export const borderRadius = {
  _2xs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const fontWeight = {
  normal: '400',
  semibold: '500',
  bold: '600',
} as const;

export const color = {
  trueBlack: '#000000',

  temp_dark: 'rgb(18, 18, 18)',
  gray_0: `hsl(${BLUE_HUE}, 20%, ${scale[14]}%)`,
  gray_25: `hsl(${BLUE_HUE}, 20%, ${scale[10]}%)`,
  gray_50: `hsl(${BLUE_HUE}, 20%, ${scale[12]}%)`,
  gray_100: `hsl(${BLUE_HUE}, 20%, ${scale[11]}%)`,
  gray_200: `hsl(${BLUE_HUE}, 20%, ${scale[10]}%)`,
  gray_300: `hsl(${BLUE_HUE}, 20%, ${scale[9]}%)`,
  gray_400: `hsl(${BLUE_HUE}, 20%, ${scale[8]}%)`,
  gray_500: `hsl(${BLUE_HUE}, 80%, ${scale[80]}%)`,
  gray_600: `hsl(${BLUE_HUE}, 24%, ${scale[6]}%)`,
  gray_700: `hsl(${BLUE_HUE}, 28%, ${scale[5]}%)`,
  gray_800: `hsl(${BLUE_HUE}, 28%, ${scale[4]}%)`,
  gray_900: `hsl(${BLUE_HUE}, 28%, ${scale[3]}%)`,
  gray_950: `hsl(${BLUE_HUE}, 28%, ${scale[2]}%)`,
  gray_975: `hsl(${BLUE_HUE}, 28%, ${scale[1]})`,
  gray_1000: `hsl(${BLUE_HUE}, 28%, ${scale[0]}%)`,

  blue_25: `hsl(${BLUE_HUE}, 82%, 97%)`,
  blue_50: `hsl(${BLUE_HUE}, 82%, 95%)`,
  blue_100: `hsl(${BLUE_HUE}, 82%, 90%)`,
  blue_200: `hsl(${BLUE_HUE}, 82%, 80%)`,
  blue_300: `hsl(${BLUE_HUE}, 82%, 70%)`,
  blue_400: `hsl(${BLUE_HUE}, 82%, 60%)`,
  blue_500: `hsl(${BLUE_HUE}, 82%, 50%)`,
  blue_600: `hsl(${BLUE_HUE}, 82%, 42%)`,
  blue_700: `hsl(${BLUE_HUE}, 82%, 34%)`,
  blue_800: `hsl(${BLUE_HUE}, 82%, 26%)`,
  blue_900: `hsl(${BLUE_HUE}, 82%, 18%)`,
  blue_950: `hsl(${BLUE_HUE}, 82%, 10%)`,
  blue_975: `hsl(${BLUE_HUE}, 82%, 7%)`,

  green_25: `hsl(${GREEN_HUE}, 60%, 70%)`,
  green_50: `hsl(${GREEN_HUE}, 82%, 95%)`,
  green_100: `hsl(${GREEN_HUE}, 82%, 90%)`,
  green_200: `hsl(${GREEN_HUE}, 82%, 80%)`,
  green_300: `hsl(${GREEN_HUE}, 82%, 70%)`,
  green_400: `hsl(${GREEN_HUE}, 82%, 60%)`,
  green_500: `hsl(${GREEN_HUE}, 82%, 50%)`,
  green_600: `hsl(${GREEN_HUE}, 82%, 42%)`,
  green_700: `hsl(${GREEN_HUE}, 82%, 34%)`,
  green_800: `hsl(${GREEN_HUE}, 82%, 26%)`,
  green_900: `hsl(${GREEN_HUE}, 82%, 18%)`,
  green_950: `hsl(${GREEN_HUE}, 82%, 10%)`,
  green_975: `hsl(${GREEN_HUE}, 82%, 7%)`,

  red_25: `hsl(${RED_HUE}, 82%, 97%)`,
  red_50: `hsl(${RED_HUE}, 82%, 95%)`,
  red_100: `hsl(${RED_HUE}, 82%, 90%)`,
  red_200: `hsl(${RED_HUE}, 82%, 80%)`,
  red_300: `hsl(${RED_HUE}, 82%, 70%)`,
  red_400: `hsl(${RED_HUE}, 82%, 60%)`,
  red_500: `hsl(${RED_HUE}, 82%, 50%)`,
  red_600: `hsl(${RED_HUE}, 82%, 42%)`,
  red_700: `hsl(${RED_HUE}, 82%, 34%)`,
  red_800: `hsl(${RED_HUE}, 82%, 26%)`,
  red_900: `hsl(${RED_HUE}, 82%, 18%)`,
  red_950: `hsl(${RED_HUE}, 82%, 10%)`,
  red_975: `hsl(${RED_HUE}, 82%, 7%)`,
};
