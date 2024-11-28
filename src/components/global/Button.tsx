/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {Children, ComponentProps, forwardRef, useCallback} from 'react';
import {PropsWithChildren} from 'react';
import {
  AccessibilityProps,
  ActivityIndicator,
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  ActivityIndicatorIOSProps,
  ColorValue,
  GestureResponderEvent,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import {a} from '#/lib/style/atoms';

import {flatten, hexWithOpacity} from '#/lib/ui/helpers';
import {useTheme} from '#/lib/ui/theme';
import {android} from '#/platform';

import {normalizeTextStyles, Text, TextProps} from './Themed';
import {View} from './Themed';
import {Haptics} from '$/src/lib/utils/haptics';
import { usePalette } from '$/src/hooks/theme';

export type ButtonVariant =
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'gradient'
  | 'outline';
export type ButtonColor = 'primary' | 'teal' | 'gray' | 'error';
export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large';
export type ButtonShape = 'round' | 'square' | 'default' | 'custom';

export type ButtonState = {
  hovered: boolean;
  focused: boolean;
  pressed: boolean;
  disabled: boolean;
};
export type VariantProps = {
  /**
   * The style variation of the button
   */
  variant?: ButtonVariant;
  /**
   * The color of the button
   */
  color?: ButtonColor;
  /**
   * The size of the button
   */
  size?: ButtonSize;
  /**
   * The shape of the button
   */
  shape?: ButtonShape;
};
export type ButtonContext = VariantProps & ButtonState;

type NonTextElements =
  | React.ReactElement
  | Iterable<React.ReactElement | null | undefined | boolean>;

type ButtonProps = Pick<
  PressableProps & TouchableOpacityProps,
  'disabled' | 'onPress' | 'testID' | 'onLongPress' | 'hitSlop'
> &
  VariantProps &
  AccessibilityProps & {
    testID?: string;
    label?: string | any;
    loading?: boolean;
    activityIndicator?: ActivityIndicatorIOSProps;
    style?: StyleProp<ViewStyle>;
    buttonWrapperStyle?: StyleProp<ViewStyle>;
    ripple?: ColorValue;
    variant?: ButtonVariant;
    children: NonTextElements | ((context: ButtonContext) => NonTextElements);
    animatedStyle?: StyleProp<ViewStyle>;
    animatedProps?: ComponentProps<typeof AnimatedPressable>;
  };

export type ButtonTextProps = TextProps & VariantProps & {disabled?: boolean};

const ButtonContext = React.createContext<VariantProps & ButtonState>({
  hovered: false,
  focused: false,
  pressed: false,
  disabled: false,
});
export function useButtonContext() {
  return React.useContext(ButtonContext);
}

const Button = forwardRef(
  (
    {
      animatedStyle,
      children,
      loading,
      onPress,
      ripple,
      style,
      shape,
      variant = 'solid',
      color,
      activityIndicator,
      buttonWrapperStyle,
      disabled,
      animatedProps,
      ...otherProps
    }: PropsWithChildren<ButtonProps & ViewProps>,
    ref,
  ) => {
    const [state, setState] = React.useState({
      pressed: false,
      hovered: false,
      focused: false,
    });

  const colors = usePalette();
    

    const selectedColor =
      color === 'primary'
        ? colors.primary
        // : color === 'teal'
        //   ? colors.teal_2
          : color === 'error'
            ? colors.error
            : colors.dark;

    const onPressIn = React.useCallback(() => {
      setState((s: any) => ({
        ...s,
        pressed: true,
      }));
    }, [setState]);
    const onPressOut = React.useCallback(() => {
      setState((s: any) => ({
        ...s,
        pressed: false,
      }));
    }, [setState]);
    const onPressFocus = React.useCallback(() => {
      setState((s: any) => ({
        ...s,
        pressed: false,
      }));
    }, [setState]);
    const onPressBlur = React.useCallback(() => {
      setState((s: any) => ({
        ...s,
        pressed: false,
      }));
    }, [setState]);

    const context = React.useMemo<ButtonContext>(
      () => ({
        ...state,
        variant,
        color,
        disabled: disabled || false,
      }),
      [state, variant, color, disabled],
    );

    return (
      <ButtonWrapper
        animatedProps={animatedProps}
        variant={variant}
        selectedColor={selectedColor}
        disabled={disabled}
        buttonWrapperStyle={[buttonWrapperStyle]}
        onPress={onPress}
        shape={shape}
        style={style}>
        <Animated.View {...otherProps}>
          <ButtonContext.Provider value={context}>
            {loading ? (
              <ActivityLoader size="small" {...activityIndicator} />
            ) : (
              children
            )}
          </ButtonContext.Provider>
        </Animated.View>
      </ButtonWrapper>
    );
  },
);

export default Button;

export function ButtonText({children, style, ...rest}: ButtonTextProps) {
  const textStyles = useSharedButtonTextStyle();
  return (
    <Text
      {...rest}
      style={normalizeTextStyles([
        a.font_bold,
        a.text_center,
        textStyles,
        style,
      ])}>
      {children}
    </Text>
  );
}

function ActivityLoader(props: ActivityIndicatorIOSProps) {
  const textStyles = useSharedButtonTextStyle();

  return (
    <ActivityIndicator
      {...props}
      color={textStyles.color}
      // style={normalizeTextStyles([
      //   // textStyles,
      //   // style,
      // ])}
    />
  );
}

export function useSharedButtonTextStyle() {
  const t = useTheme();
  const colors = usePalette();
  const {variant, size, color, disabled} = useButtonContext();
  return React.useMemo(() => {
    const baseStyles: TextStyle[] = [];
    const light = t.name === 'light';

    if (color === 'primary') {
      if (variant === 'solid') {
        if (!disabled) {
          baseStyles.push({
            color: colors.dark,
          });
        } else {
          baseStyles.push({
            color: t.palette.white,
            opacity: 0.5,
          });
        }
      } else if (variant === 'outline') {
        if (!disabled) {
          baseStyles.push({
            color: light ? colors.primary : colors.primary, // COMEBACK: Or some dark color
          });
        } else {
          baseStyles.push({
            color: t.palette.primary_600,
            opacity: 0.5,
          });
        }
      } else if (variant === 'ghost') {
        if (!disabled) {
          baseStyles.push({
            color: colors.primary,
          });
        } else {
          baseStyles.push({
            color: t.palette.primary_500,
            opacity: 0.5,
          });
        }
      }
    } else if (color === 'gray') {
      if (variant === 'solid') {
        if (!disabled) {
          baseStyles.push({
            color: t.palette.contrast_700,
          });
        } else {
          baseStyles.push({
            color: t.palette.contrast_400,
          });
        }
      } else if (variant === 'outline') {
        if (!disabled) {
          baseStyles.push({
            // color: colors.graygreen,
          });
        } else {
          baseStyles.push({
            color: t.palette.contrast_300,
          });
        }
      } else if (variant === 'ghost') {
        if (!disabled) {
          baseStyles.push({
            color: t.palette.contrast_600,
          });
        } else {
          baseStyles.push({
            color: t.palette.contrast_300,
            opacity: 0.5,
          });
        }
      }
    } else if (color === 'error') {
      if (variant === 'solid') {
        if (!disabled) {
          baseStyles.push({
            color: t.palette.white,
          });
        } else {
          baseStyles.push({
            color: t.palette.white,
            opacity: 0.5,
          });
        }
      } else if (variant === 'outline') {
        if (!disabled) {
          baseStyles.push({
            color: t.palette.negative_400,
          });
        } else {
          baseStyles.push({
            color: t.palette.negative_400,
            opacity: 0.5,
          });
        }
      } else if (variant === 'ghost') {
        if (!disabled) {
          baseStyles.push({
            color: t.palette.negative_400,
          });
        } else {
          baseStyles.push({
            color: t.palette.contrast_400,
            opacity: 0.5,
          });
        }
      }
    } else {
      if (!disabled) {
        baseStyles.push({
          color: t.palette.white,
        });
      } else {
        baseStyles.push({
          color: t.palette.white,
          opacity: 0.5,
        });
      }
    }
    if (size === 'large') {
      baseStyles.push(a.text_md, android({paddingBottom: 1}));
    } else if (size === 'tiny') {
      baseStyles.push(a.text_xs, android({paddingBottom: 1}));
    } else {
      baseStyles.push(a.text_sm, android({paddingBottom: 1}));
    }
    return flatten(baseStyles);
  }, [t, color, variant, disabled, size]);
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

function ButtonWrapper({
  children,
  onPress,
  disabled,
  ripple,
  selectedColor,
  variant,
  buttonWrapperStyle,
  shape,
  style,
}: PropsWithChildren<
  Omit<ButtonProps, 'animatedProps'> &
    ButtonProps['animatedProps'] & {selectedColor: string}
>) {
  const onButtonPress = useCallback((e: GestureResponderEvent) => {
    Haptics.medium();
    onPress?.(e);
  }, []);

  return Platform.OS === 'android' ? (
    <AnimatedPressable
      disabled={disabled}
      android_ripple={{
        color:
          ripple || variant === 'solid'
            ? 'rgba(255,255,255,0.4)'
            : hexWithOpacity(selectedColor, 0.5),
        borderless: true,
        foreground: true,
      }}
      android_disableSound={false}
      style={[
        a.py_lg,
        buttonWrapperStyle,
        a.overflow_hidden,
        shape === 'square'
          ? a.rounded_sm
          : shape === 'round'
            ? a.rounded_full
            : a.rounded_(0),
        variant === 'outline' && [a.border, a.border_tint(selectedColor)],
        variant === 'solid' && a.bg_(selectedColor),
        style,
      ]}
      onPress={onButtonPress}>
      {children}
    </AnimatedPressable>
  ) : (
    <AnimatedTouchableOpacity
      disabled={disabled}
      style={[
        a.py_lg,
        buttonWrapperStyle,
        a.overflow_hidden,
        shape === 'square'
          ? a.rounded_sm
          : shape === 'round'
            ? a.rounded_full
            : a.rounded_(0),
        variant === 'outline' && [a.border, a.border_tint(selectedColor)],
        variant === 'solid' && a.bg_(selectedColor),
        style,
      ]}
      onPress={
        onButtonPress as ComponentProps<typeof TouchableOpacity>['onPress']
      }>
      {children}
    </AnimatedTouchableOpacity>
  );
}
