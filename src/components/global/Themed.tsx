import {useEffect} from 'react';
import {Text as DefaultText, View as DefaultView} from 'react-native';
import {StyleProp, TextStyle} from 'react-native';
import Animated, {AnimatedProps} from 'react-native-reanimated';

import useLoadedFonts from '#/hooks/useLoadedFonts';
import {a} from '#/lib/style/atoms';
import {flatten} from '#/lib/ui/helpers';
import {useTheme} from '#/lib/ui/theme';
import {isNative} from '#/platform';
import {useThemeColor} from '$/src/hooks/theme';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type FontFamily =
  | 'Regular'
  | 'Regular_Italic'
  | 'Medium'
  | 'Medium_Italic'
  | 'Bold'
  | 'Bold_Italic';

export type TextProps = ThemeProps &
  DefaultText['props'] & {
    selectable?: boolean;
    family?: FontFamily;
  };
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text({
  children,
  selectable,
  family = 'Regular',
  ...props
}: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor('text', {light: lightColor, dark: darkColor});
  const t = useTheme();
  // const nts = normalizeTextStyles([a.text_sm, t.atoms.text, flatten(style)]);
  const nts = normalizeTextStyles([a.text_sm, flatten(style)]);

  const {error, loaded} = useLoadedFonts();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      // throw error;
      console.error('FONT_ERROR: ', error);
    }
  }, [error]);

  if (!loaded) return null;

  return (
    <DefaultText
      selectable={selectable}
      // uiTextView
      style={[{color, fontFamily: getFontFamily(family)}, nts]}
      {...otherProps}>
      {children}
    </DefaultText>
  );
}

export function AnimatedText({
  children,
  selectable,
  family = 'Regular',
  ...props
}: AnimatedProps<TextProps>) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor('text', {
    light: lightColor as string,
    dark: darkColor as string,
  });
  const t = useTheme();
  const nts = normalizeTextStyles([
    a.text_sm,
    t.atoms.text,
    flatten(style as TextStyle),
  ]);

  const {error, loaded} = useLoadedFonts();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      // throw error;
    }
  }, [error]);

  if (!loaded) return null;

  return (
    <Animated.Text
      selectable={selectable}
      style={[{color, fontFamily: getFontFamily(family as any)}, nts]}
      {...otherProps}>
      {children}
    </Animated.Text>
  );
}

export function View(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor('background', {
    light: lightColor,
    dark: darkColor,
  });

  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}

export function normalizeTextStyles(styles: StyleProp<TextStyle>) {
  const f = flatten(styles);
  const fontSize = f.fontSize || a.text_md.fontSize;

  if (f?.lineHeight) {
    if (f.lineHeight !== 0 && f.lineHeight <= 2) {
      f.lineHeight = Math.round(fontSize * f.lineHeight);
    } else if (!isNative) {
      f.lineHeight = f.fontSize;
    }
  }
  return f;
}

export function getFontFamily(family: FontFamily): string {
  switch (family) {
    case 'Regular':
      return 'DMSans_400Regular';
    case 'Regular_Italic':
      return 'DMSans_400Regular_Italic';
    case 'Medium':
      return 'DMSans_500Medium';
    case 'Medium_Italic':
      return 'DMSans_500Medium_Italic';
    case 'Bold':
      return 'DMSans_700Bold';
    case 'Bold_Italic':
      return 'DMSans_700Bold_Italic';
    default:
      return 'DMSans_400Regular';
  }
}
