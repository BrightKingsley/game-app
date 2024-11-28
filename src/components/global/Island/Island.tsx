import React, {useCallback} from 'react';

import {useContext, useEffect, useState} from 'react';

import {
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {FontAwesome, Ionicons} from '@expo/vector-icons';

import Animated, {
  BounceInLeft,
  BounceInRight,
  BounceInUp,
  BounceOutLeft,
  BounceOutRight,
  BounceOutUp,
  Easing,
  Keyframe,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

import {a} from '#/lib/style/atoms';
import Row from '../Row';
import {useAppSelector} from '#/hooks/store';
import {useNavigation} from '@react-navigation/native';
import Menu from './Menu';
import {
  CustomBounceInRight,
  CustomBounceInUp,
  CustomBounceOutLeft,
  CustomBounceOutRight,
  CustomBounceOutUp,
} from './animations';
import {useIslandContent} from './island-repo';
import {useUser} from '@clerk/clerk-expo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {OrderType} from '$/src/store/slices/order/types';

const AIonicons = Animated.createAnimatedComponent(Ionicons);

export const ISLAND_PERCENTAGE = 0.55;

// const notification = document.getElementById("notification")!;
export default function Island(props: View['props'] & {show?: boolean}) {
  const {style: customStyle, ...islandProps} = props;
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const {children, type, showIsland, pingReceptor, content} = useAppSelector(
    state => state.island,
  );
  const {orderRequest} = useAppSelector(state => state.order);
  const [showMenu, setShowMenu] = useState(false);
  const modalContent = useIslandContent();
  const {user} = useUser();

  const contentComponent = modalContent[content || 'null'];
  const safeInsets = useSafeAreaInsets();

  const handleToggleMenu = useCallback(() => {
    console.log('TOGGLE_MENU');
    setShowMenu(prev => !prev);
  }, []);

  const hideMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  useEffect(() => {
    scale.value = withTiming(
      0.9,
      {
        duration: 100,
        easing: Easing.ease,
      },
      () => {
        // Return to original size
        scale.value = withTiming(1, {
          duration: 100,
          easing: Easing.ease,
        });
      },
    );
  }, [pingReceptor]);

  useEffect(() => {
    if (type !== 'menu') hideMenu();
  }, [type]);

  if (!showIsland) return null;

  return (
    <View
      style={[
        a.absolute,
        [a.mt_(Platform.OS === 'ios' ? safeInsets.top - 13 : safeInsets.top!)],
        a.self_center,
        a.w_(SCREEN_WIDTH * ISLAND_PERCENTAGE),
        a.z_10,
        !showIsland && a.top_(-100),
        customStyle,
      ]}
      {...islandProps}>
      <Animated.View
        entering={CustomBounceInUp}
        exiting={CustomBounceOutUp}
        style={[
          a.flex_1,
          a.w_(SCREEN_WIDTH * ISLAND_PERCENTAGE),
          a.bg_('black'),
          a.mx_auto,
          a.rounded_(25),
          // a.overflow_hidden
        ]}>
        {/* {showIsland && ( */}
        <Animated.View style={[animatedStyle, a.self_center, a.z_10]}>
          <Animated.View
            style={[
              a.w_(SCREEN_WIDTH * ISLAND_PERCENTAGE),
              // a.h_(50),
              a.bg_(colors.dark_4),
              a.relative,
              a.rounded_(35),
              a.z_20,
              a.justify_center,
              a.overflow_hidden,

              //   a.overflow_hidden,

              {
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.16,
                shadowRadius: 1.51,
                elevation: 2,
              },
            ]}>
            <Row style={[a.items_center, a.px_(2), a.py_(2)]}>
              <Pressable
                onPress={() =>
                  type === 'menu'
                    ? handleToggleMenu()
                    : contentComponent?.action?.()
                }
                style={[
                  a.w_(40),
                  a.h_(40),
                  a.bg_(
                    contentComponent
                      ? contentComponent.iconBackground
                      : orderRequest?.type === OrderType.delivery
                        ? colors.teal_3
                        : colors.primary,
                  ),
                  a.z_50,
                  a.relative,
                  a.items_center,
                  a.justify_center,
                  a.rounded_full,
                  a.overflow_hidden,
                ]}>
                {contentComponent ? (
                  <Animated.View
                    entering={CustomBounceInRight}
                    exiting={CustomBounceOutLeft}
                    style={[
                      a.overflow_hidden,
                      a.w_full,
                      a.h_full,
                      a.items_center,
                      ,
                      a.justify_center,
                    ]}>
                    {contentComponent?.icon}
                  </Animated.View>
                ) : type === 'menu' ? (
                  <Animated.View
                    // entering={CustomBounceInRight}
                    // exiting={CustomBounceOutLeft}
                    style={[a.items_center, a.justify_center]}>
                    {showMenu ? (
                      <AIonicons
                        entering={ZoomIn}
                        exiting={ZoomOut}
                        name="close"
                        size={24}
                        style={[a.absolute]}
                        color={colors.light_1}
                      />
                    ) : (
                      <AIonicons
                        entering={ZoomIn}
                        exiting={ZoomOut}
                        name="menu"
                        size={24}
                        style={[a.absolute]}
                        color={colors.light_1}
                      />
                    )}
                  </Animated.View>
                ) : (
                  <></>
                )}
              </Pressable>

              {contentComponent ? (
                contentComponent.component
              ) : !content || typeof content === 'string' ? (
                <Text
                  style={[
                    a.font_bold,
                    a.text_(colors.light_1),
                    a.ml_2xl,
                    a.capitalize,
                  ]}>
                  Hey, {user?.firstName}
                </Text>
              ) : (
                <></>
              )}
            </Row>
          </Animated.View>
        </Animated.View>
        {/* // )} */}
        <Menu menuHidden={!showMenu || !showIsland} hideMenu={hideMenu} />
      </Animated.View>
    </View>
  );
}
