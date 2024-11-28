import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  ImageStyle,
  useAnimatedValue,
} from 'react-native';
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {View} from '$/src/components/global/Themed';
import {a} from '$/src/lib/style/atoms';
;

type Props = {
  isReady: boolean;
};
export default function StartPage(props: React.PropsWithChildren<Props>) {
  //   const interp = useAnimatedValue(1);
  //   const scale = useAnimatedValue(0);
  //   const intro = useSharedValue(0);
  //   const outroLogo = useSharedValue(0);
  //   const outroApp = useSharedValue(0);
  //   const outroAppOpacity = useSharedValue(0);
  //   const [isAnimationComplete, setIsAnimationComplete] = React.useState(false);
  //   const [isLayoutReady, setIsLayoutReady] = React.useState(false);
  //   useEffect(() => {
  //     timing(interp, {
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
    <View className="bg-red-500">
      {/* {!isAnimationComplete && ( */}
      <View>
        <View style={{opacity: 1}}>
          <Image
            source={require('../assets/icon.png')}
            style={[a.w_(300), a.h_(150)] as ImageStyle}
          />
        </View>
        <ActivityIndicator
          color={colors.light_1}
          style={[{transform: [{translateY: 100}]}]}
        />
      </View>
      {/* )} */}
      {/* {isReady && (
        <>
          <View style={{opacity: interp}}>
            {props.children}
          </View>
        </>
      )} */}
    </View>
  );
}
