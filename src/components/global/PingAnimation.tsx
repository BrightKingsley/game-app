;
import {hexWithOpacity} from '$/src/lib/ui/helpers';
import {PropsWithChildren, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {View} from './Themed';

export default function PingAnimation({
  coreSize = 10,
  pingSize = 20,
  color = colors.yellow_1,
  children,
}: PropsWithChildren<{
  pingSize?: number;
  coreSize?: number;
  color?: string;
}>) {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    ping: {
      width: pingSize,
      height: pingSize,
      borderRadius: pingSize / 2,
      backgroundColor: hexWithOpacity(color, 0.5),
      position: 'absolute',
    },
    core: {
      width: coreSize,
      height: coreSize,
      borderRadius: coreSize / 2,
      backgroundColor: color,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible',
    },
  });

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(2, {duration: 1000, easing: Easing.out(Easing.ease)}),
      -1,
      true,
    );

    opacity.value = withRepeat(
      withTiming(0, {duration: 1000, easing: Easing.out(Easing.ease)}),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  return (
    // <View style={styles.container}>
    //   <Animated.View style={[styles.ping, animatedStyle]} />
    //   {children || <View style={styles.core} />}
    // </View>

    <View style={styles.core}>
      <Animated.View style={[styles.ping, animatedStyle]} />
      {/* {children || <View style={styles.core} />} */}
    </View>
  );
}
