/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  Animated,
  ColorValue,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {hexWithOpacity} from '#/lib/ui/helpers';
import {usePalette} from '$/src/hooks/theme';

import Row from './Row';
interface IndicatorProps {
  scrollX: Animated.Value;
  DATA: any[];
  padding: number;
}

export default function Indicator({scrollX, DATA, padding}: IndicatorProps) {
  const safeAreaInset = useSafeAreaInsets();
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const colors = usePalette();

  return (
    <Row
      style={
        (StyleSheet.absoluteFill,
        {
          alignItems: 'center',
          justifyContent: 'center',
        })
      }>
      {DATA.map((_, i) => {
        const inputRange = [
          (i - 1) * SCREEN_WIDTH,
          i * SCREEN_WIDTH,
          (i + 1) * SCREEN_WIDTH,
        ];
        const scaleX = scrollX.interpolate({
          inputRange,
          outputRange: [1, 1.1, 1],
          extrapolate: 'clamp',
        });
        const widthValue = scrollX.interpolate({
          inputRange,
          outputRange: [
            SCREEN_WIDTH * 0.025,
            SCREEN_WIDTH * 0.055,
            SCREEN_WIDTH * 0.025,
          ],
          extrapolate: 'clamp',
        });
        const heightValue = scrollX.interpolate({
          inputRange,
          outputRange: [
            SCREEN_WIDTH * 0.025,
            SCREEN_WIDTH * 0.023,
            SCREEN_WIDTH * 0.025,
          ],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [
            hexWithOpacity(colors.primary, 0.5),
            colors.primary,
            hexWithOpacity(colors.primary, 0.5),
          ],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [1, 1, 1],
          extrapolate: 'clamp',
        });
        const styles = StyleSheet.create({
          container: {
            width: widthValue,
            height: heightValue,
            //Check Animated.AnimatedInterpolation requires string | number ?? colorValue to understand the error here check animated doc.
            backgroundColor: backgroundColor as unknown as ColorValue,
            opacity,
            borderRadius: 100,
            margin: 5,
            transform: [{scaleX}],
          },
        });
        return <Animated.View key={i} style={styles.container} />;
      })}
    </Row>
  );
}
