/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {ColorValue, StyleSheet, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';



import {Row} from '../global';
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {darkenColor} from '$/src/lib/ui/helpers';
import { usePalette } from '$/src/hooks/theme';

// interface IndicatorProps {
//   scrollX: Animated.Value;
//   DATA: any[];
//   padding: number;
// }

interface IndicatorProps {
  scrollX: SharedValue<number>;
  DATA: any[];
  padding: number;
}

export default function Indicator({scrollX, DATA, padding}: IndicatorProps) {
  const safeAreaInset = useSafeAreaInsets();
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const colors = usePalette();

  return (
    <View
      style={[
        // StyleSheet.absoluteFill,
        {
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: padding,
          marginHorizontal: 'auto',
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {DATA.map((_, i) => {
          const animatedStyle = useAnimatedStyle(() => {
            const inputRange = [
              (i - 1) * SCREEN_WIDTH,
              i * SCREEN_WIDTH,
              (i + 1) * SCREEN_WIDTH,
            ];

            const scaleX = interpolate(scrollX.value, inputRange, [1, 1.1, 1]);
            const width = interpolate(scrollX.value, inputRange, [
              SCREEN_WIDTH * 0.015,
              SCREEN_WIDTH * 0.035,
              SCREEN_WIDTH * 0.015,
            ]);
            const height = interpolate(scrollX.value, inputRange, [
              SCREEN_WIDTH * 0.015,
              SCREEN_WIDTH * 0.013,
              SCREEN_WIDTH * 0.015,
            ]);
            const backgroundColor = interpolateColor(
              scrollX.value,
              inputRange,
              [colors.tint, colors.primary, colors.tint], // Map numeric values for colors
            );
            // const opacity = interpolate(scrollX.value, inputRange, [1, 1, 1]);

            return {
              width,
              height,
              backgroundColor, // Adjust for actual color range
              // opacity,
              transform: [{scaleX}],
              borderRadius: 100,
              margin: 5,
            };
          });

          return (
            <Animated.View key={i} style={[styles.indicator, animatedStyle]} />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    margin: 5,
  },
});
