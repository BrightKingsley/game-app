import {useColorScheme} from 'react-native';

import {darkenColor} from '$/src/lib/ui/helpers';

const colors = {
  primary: '#12a633',
  get primary_darker() {
    return darkenColor(this.primary); // Dynamically compute the darker color
  },
  light: '#ffffff',
  dark: '#000000',
  error: '#FF0000',
  darkgrey: '#424242',
  get light_theme() {
    return {
      background: this.light,
      text: this.dark,
    };
  },
  get dark_theme() {
    return {
      background: this.dark,
      text: this.light,
    };
  },
};

export function usePalette(): Colors {
  const tint = useThemeColor('text');

  return {
    tint,
    ...colors,
  };
}

export function useThemeColor(
  colorName: keyof Colors['light_theme'] &
    keyof Colors['dark_theme'] = 'background',
  props?: {light?: string; dark?: string},
) {
  const light = colorName === 'background' ? colors.light : colors.dark;
  const dark = colorName === 'background' ? colors.dark : colors.light;
  const t = useColorScheme() ?? 'dark';
  const colorFromProps = props ? props[t] : t === 'light' ? light : dark;
  const theme = t === 'light' ? 'light_theme' : 'dark_theme';
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[theme][colorName];
  }
}
