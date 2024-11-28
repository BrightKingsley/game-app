import React from 'react';
import {
  ColorValue,
  DimensionValue,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

type SeparatorProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

export default function Separator(props: SeparatorProps) {
  const {style, ...otherProps} = props;
  return <View style={[otherProps, style]} />;
}
