import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...', 'Error: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //
import {ErrorBoundaryProps} from 'expo-router';
import React from 'react';
import {ActivityIndicator, Animated, View} from 'react-native';

import {Text} from '$/src/components/global/Themed';
import {usePalette} from '$/src/hooks/theme';
import {a} from '$/src/lib/style/atoms';
type Props = {
  isReady: boolean;
};
export default function StartPage(props: React.PropsWithChildren<Props>) {
  const colors = usePalette();
  //   const interp = useAnimatedValue(1);
  //   const scale = useAnimatedValue(0);
  //   const intro = useSharedValue(0);
  //   const outroLogo = useSharedValue(0);
  //   const outroApp = useSharedValue(0);
  //   const outroAppOpacity = useSharedValue(0);
  //   const [isAnimationComplete, setIsAnimationComplete] = React.useState(false);
  //   const [isLayoutReady, setIsLayoutReady] = React.useState(false);
  //   useEffect(() => {
  //     Animated.timing(interp, {
  //       toValue: 1,
  //       delay: 500,
  //       duration: 1000,
  //       useNativeDriver: true,
  //       isInteraction: false,
  //     }).start();
  //   }, [interp]);

  //   useEffect(() => {
  //     Animated.timing(scale, {
  //       toValue: 1,
  //       delay: 1000,
  //       duration: 500,
  //       useNativeDriver: true,
  //       isInteraction: false,
  //     }).start();
  //   }, [scale]);
  //   const isReady = props.isReady && isLayoutReady;
  //   const onFinish = React.useCallback(() => setIsAnimationComplete(true), []);
  //   const onLayout = React.useCallback(() => setIsLayoutReady(true), []);
  //   useEffect(() => {
  //     if (isReady) {
  //       SplashScreen.hideAsync()
  //         .then(() => {
  //           intro.value = withTiming(
  //             1,
  //             {
  //               duration: 400,
  //               easing: Easing.out(Easing.cubic),
  //             },
  //             async () => {
  //               outroLogo.value = withTiming(
  //                 1,
  //                 {duration: 1200, easing: Easing.in(Easing.cubic)},
  //                 () => {
  //                   runOnJS(onFinish)();
  //                 },
  //               );
  //               outroApp.value = withTiming(1, {
  //                 duration: 1200,
  //                 easing: Easing.in(Easing.cubic),
  //               });
  //               outroAppOpacity.value = withTiming(1, {
  //                 duration: 1200,
  //                 easing: Easing.in(Easing.cubic),
  //               });
  //             },
  //           );
  //         })
  //         .catch(() => {});
  //     }
  //   }, [intro, isReady, onFinish, outroApp, outroAppOpacity, outroLogo]);
  return (
    // <View testID="onboardingView" style={[a.flex_1]} onLayout={onLayout}>
    <View testID="onboardingView" style={[a.flex_1]}>
      {/* {!isAnimationComplete && ( */}
      <View
        style={[
          a.flex_1,
          a.flex,
          a.items_center,
          a.justify_center,
          a.bg_(colors.primary),
        ]}>
        <Animated.View style={{opacity: 1}} testID="splashZebraLogo">
          {/* <Image
            source={require('../assets/icon.png')}
            style={[a.w_(300), a.h_(150)] as ImageStyle}
          /> */}
        </Animated.View>
        <ActivityIndicator
          color={colors.light}
          style={[{transform: [{translateY: 100}]}]}
        />
      </View>
      {/* )} */}
      {/* {isReady && (
        <>
          <Animated.View style={{opacity: interp}}>
            {props.children}
          </Animated.View>
        </>
      )} */}
    </View>
  );
}

export function ErrorBoundary({error, retry}: ErrorBoundaryProps) {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Text>{error.message}</Text>
      <Text onPress={retry}>Try Again?</Text>
    </View>
  );
}
