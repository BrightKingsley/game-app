import {PropsWithChildren} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import {HITSLOP_10, HITSLOP_30} from '#/lib/constants';

interface HeaderClickProp
  extends Pick<
    React.ComponentProps<typeof TouchableOpacity>,
    | 'accessibilityRole'
    | 'accessible'
    | 'accessibilityLabel'
    | 'accessibilityHint'
  > {
  testID: string;
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
}

export default function IconButton({
  children,
  testID,
  onPress,
  accessible,
  accessibilityHint,
  accessibilityRole,
  accessibilityLabel,
  style,
}: PropsWithChildren<HeaderClickProp>) {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      accessible={accessible}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      hitSlop={HITSLOP_10}
      style={style}>
      {children}
    </TouchableOpacity>
  );
}
