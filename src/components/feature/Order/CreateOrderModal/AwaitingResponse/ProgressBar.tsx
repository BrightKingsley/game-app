
import { View } from '$/src/components/global/Themed';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const LOOP_DURATION = 2000; // Duration for the progress bar to fill and empty

export default function ProgressBar() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {duration: LOOP_DURATION / 2, easing: Easing.linear}),
      -1, // Loop indefinitely
      true, // Reverse the animation on each loop
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 20, // Height of the progress bar
    backgroundColor: '#e0e0e0', // Background color of the progress bar
    borderRadius: 10, // Optional: for rounded corners
    overflow: 'hidden', // Ensure the progress bar doesn't overflow the container
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary, // Color of the progress
    borderRadius: 10, // Optional: for rounded corners
  },
});
