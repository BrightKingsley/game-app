interface Colors {
  primary: string;
  primary_darker: string;
  light: string;
  dark: string;
  tint: string;
  light_theme: {
    background: string;
    text: string;
  };
  dark_theme: {
    background: string;
    text: string;
  };
  error: string;
  darkgrey: string;
}

type ThemeName = 'light' | 'dim' | 'dark';
