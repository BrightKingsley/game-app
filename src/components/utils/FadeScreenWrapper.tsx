import React, {PropsWithChildren, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const FadeScreenWrapper = ({
  children,
  duration,
}: PropsWithChildren<{duration?: number}>) => {
  const isFocused = useIsFocused(); // Detect if the screen is focused
  const opacity = useSharedValue(0); // Initial opacity value

  // Animate opacity when the screen is focused or unfocused
  useEffect(() => {
    if (isFocused) {
      opacity.value = withTiming(1, {duration: duration || 200}); // Fade-in animation
    } else {
      opacity.value = withTiming(0, {duration: duration || 200}); // Fade-out animation
    }
  }, [isFocused]);

  // Create an animated style to control the screen's opacity
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FadeScreenWrapper;
