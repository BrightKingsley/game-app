import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Animated,
  useAnimatedValue,
  View,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

import {usePalette} from '$/src/hooks/theme';

import {a} from '../../lib/style/atoms';
type Props = {
  isReady: boolean;
  spinnerColor?: string;
  backgroundColor?: string;
};
export default function Splash(props: React.PropsWithChildren<Props>) {
  const interp = useAnimatedValue(1);
  const scale = useAnimatedValue(0);
  const intro = useSharedValue(0);
  const outroLogo = useSharedValue(0);
  const outroApp = useSharedValue(0);
  const outroAppOpacity = useSharedValue(0);
  const [, setIsAnimationComplete] = React.useState(false);
  const [isLayoutReady] = React.useState(false);

  const colors = usePalette();

  useEffect(() => {
    Animated.timing(interp, {
      toValue: 1,
      delay: 500,
      duration: 1000,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
  }, [interp]);

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      delay: 1000,
      duration: 500,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
  }, [scale]);
  const isReady = props.isReady && isLayoutReady;
  const onFinish = React.useCallback(() => setIsAnimationComplete(true), []);
  // const onLayout = React.useCallback(() => setIsLayoutReady(true), []);
  useEffect(() => {
    if (isReady) {
      // SplashScreen.hideAsync()
      //   .then(() => {
      //     intro.value = withTiming(
      //       1,
      //       {
      //         duration: 400,
      //         easing: Easing.out(Easing.cubic),
      //       },
      //       async () => {
      //         outroLogo.value = withTiming(
      //           1,
      //           {duration: 1200, easing: Easing.in(Easing.cubic)},
      //           () => {
      //             runOnJS(onFinish)();
      //           },
      //         );
      //         outroApp.value = withTiming(1, {
      //           duration: 1200,
      //           easing: Easing.in(Easing.cubic),
      //         });
      //         outroAppOpacity.value = withTiming(1, {
      //           duration: 1200,
      //           easing: Easing.in(Easing.cubic),
      //         });
      //       },
      //     );
      //   })
      //   .catch(() => {});
    }
  }, [intro, isReady, onFinish, outroApp, outroAppOpacity, outroLogo]);
  return (
    // <View testID="onboardingView" style={[a.flex_1]} onLayout={onLayout}>
    //   <View style={[a.flex_1, a.align_center, a.justify_center]}>
    //     <ActivityIndicator color={colors.yellow_2} size={30} />
    //   </View>
    //   {!isAnimationComplete && (
    //     <View
    //       style={[
    //         a.flex_1,
    //         a.flex,
    //         a.align_center,
    //         a.justify_center,
    //         a.bg_(colors.yellow_2),
    //       ]}>
    //       <Animated.View style={{opacity: interp}} testID="splashZebraLogo">
    //         <Image
    //           source={require('../../../assets/icon.png')}
    //           style={[a.w_(300), a.h_(150)] as ImageStyle}
    //         />
    //       </Animated.View>
    //     </View>
    //   )}
    //   {isReady && (
    //     <>
    //       <Animated.View style={{opacity: interp}}>
    //         {props.children}
    //       </Animated.View>
    //     </>
    //   )}
    // </View>
    <View
      testID="onboardingView"
      style={[a.flex_1, a.fixed, a.top_0, a.z_50, a.h_full, a.w_full]}>
      {/* {!isAnimationComplete && ( */}
      <View
        style={[
          a.flex_1,
          a.flex,
          a.items_center,
          a.justify_center,
          a.bg_(props.backgroundColor || colors.primary),
        ]}>
        <Animated.View style={{opacity: 1}} testID="splashZebraLogo">
          {/* <Image
            source={require('../assets/icon.png')}
            style={[a.w_(300), a.h_(150)] as ImageStyle}
          /> */}
        </Animated.View>
        <ActivityIndicator
          color={props.spinnerColor || colors.light}
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
