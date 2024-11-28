import AntDesign from '@expo/vector-icons/AntDesign';
import React, {PropsWithChildren} from 'react';
import {
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleProp,
  View,
  ViewProps,
} from 'react-native';
import {ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

import {a} from '#/lib/style/atoms';

import Row from './Row';
import {Text} from './Themed';
import ToggleButton from './ToggleButton';

export type ListTileType = {
  leading?: React.ReactNode;
  content: string | React.ReactNode;
  trailing?: React.ReactNode;
  action?(payload?: GestureResponderEvent): void;
  pointerEvents?: ViewProps['pointerEvents'];
  style?: StyleProp<ViewStyle>;
  ripple?: boolean;
  rippleColor?: string;
};

export function AccordionRight() {
  return <AntDesign name="right" size={20} style={[a.text_('gray')]} />;
}

export default function ListTile({
  action,
  leading,
  content,
  trailing,
  style,
  ripple = false,
  rippleColor,
  pointerEvents,
}: ListTileType) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      pointerEvents={pointerEvents}>
      <ListTileWrapper
        ripple={ripple}
        rippleColor={rippleColor}
        action={action}
        style={style}>
        <Row style={[a.items_center]}>
          {leading}
          {typeof content === 'string' ? (
            <View style={[a.ml_xs, a.flex_1]}>
              <Text>{content}</Text>
            </View>
          ) : (
            // content
            <View style={[a.flex_1]}>{content}</View>
          )}
          <View>{trailing}</View>
        </Row>
      </ListTileWrapper>
    </Animated.View>
  );
}

function ListTileWrapper({
  children,
  action,
  rippleColor,
  ripple,
  style,
}: PropsWithChildren<Partial<ListTileType>>) {
  return Platform.OS === 'android' ? (
    <Pressable
      style={[a.rounded_sm, a.overflow_hidden, style]}
      android_ripple={
        ripple
          ? {
              color: rippleColor || '#ffffff94',
              foreground: true,
            }
          : null
      }
      onPress={e => {
        action?.(e);
      }}>
      {children}
    </Pressable>
  ) : (
    <TouchableOpacity
      style={[a.rounded_sm, a.overflow_hidden, style]}
      onPress={() => {
        action?.();
      }}>
      {children}
    </TouchableOpacity>
  );
}

export function ToggleBtn() {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <ToggleButton
      accessibilityLabel={'PinButton'}
      isActive={isActive}
      switchActive={() => setIsActive(prev => !prev)}
      style={[a.h_(38), a.w_(70)]}
      circleSize={30}
    />
  );
}
