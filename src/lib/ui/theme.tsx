import React from 'react';

import * as palette from './palette';
export * as tokens from './tokens';
import {Dimensions} from 'react-native';
type BreakpointName = keyof typeof breakpoints;

/**
 * Breakpoints
 */
const breakpoints: {
  [key: string]: number;
} = {
  gtPhone: 500,
  gtMobile: 800,
  gtTablet: 1300,
};
function getActiveBreakpoints({width}: {width: number}) {
  const active: (keyof typeof breakpoints)[] = Object.keys(breakpoints).filter(
    breakpoint => width >= breakpoints[breakpoint],
  );
  return {
    active: active[active.length - 1],
    gtPhone: active.includes('gtPhone'),
    gtMobile: active.includes('gtMobilet'),
    gtTablet: active.includes('gtTablet'),
  };
}
/**
 * Context
 */
export const Context = React.createContext<{
  themeName: palette.ThemeName;
  theme: palette.Theme;
  breakpoints: {
    active: BreakpointName | undefined;
    gtPhone: boolean;
    gtMobile: boolean;
    gtTablet: boolean;
  };
}>({
  themeName: 'light',
  theme: palette.light,
  breakpoints: {
    active: undefined,
    gtMobile: false,
    gtPhone: false,
    gtTablet: false,
  },
});

export function ThemeProvider({
  children,
  theme: themeName,
}: React.PropsWithChildren<{theme: palette.ThemeName}>) {
  const theme = palette[themeName];
  const [breakpoints, setBreakpoints] = React.useState(() =>
    getActiveBreakpoints({width: Dimensions.get('window').width}),
  );
  React.useEffect(() => {
    const listener = Dimensions.addEventListener('change', ({window}) => {
      const bp = getActiveBreakpoints({width: window.width});
      if (bp.active !== breakpoints.active) {
        setBreakpoints(bp);
      }
    });
    return listener.remove;
  }, [breakpoints, setBreakpoints]);

  return (
    <Context.Provider
      value={React.useMemo(
        () => ({
          themeName: themeName,
          theme: theme,
          breakpoints,
        }),
        [theme, themeName, breakpoints],
      )}>
      {children}
    </Context.Provider>
  );
}

export function useTheme() {
  return React.useContext(Context).theme;
}
export function useBreakpoints() {
  return React.useContext(Context).breakpoints;
}
