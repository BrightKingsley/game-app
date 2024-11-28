import {useAppSelector} from '#/hooks/store';
import {a} from '#/lib/style/atoms';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  DimensionValue,
  Pressable,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
  runOnJS,
  BounceInUp,
  AnimatableValue,
  withSpring,
  useDerivedValue,
} from 'react-native-reanimated';
import {Text, View} from '../Themed';
import {
  CustomBounceInRight,
  CustomBounceInUp,
  CustomBounceOutRight,
  CustomBounceOutUp,
  CustomZoomInUp,
} from './animations';
import {useIslandContent, useIslandMenu} from './island-repo';
import Row from '../Row';
import {hexWithOpacity} from '#/lib/ui/helpers';
import {MenuItemType} from '#/store/slices/island/types';

import { ISLAND_PERCENTAGE } from './Island';

type MenuProps = {
  index: number;
  hidden: boolean;
  hide(): void;
  items: MenuItemType[];
  item: MenuItemType;
};

const MenuItem = ({index, hidden, items, item, hide}: MenuProps) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const {showIsland} = useAppSelector(state => state.island);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  const [unmount, setUnmount] = useState(false);

  const handleAction = useCallback(() => {
    item.action?.();
    hide();
  }, []);

  // useEffect(() => {
  //   if (hidden) {
  //     setTimeout(
  //       () => {
  //         setUnmount(true);
  //       },
  //       (items.length - index) * 10,
  //     );
  //     translateY.value = withDelay(
  //       (items.length - index - 1) * 1000,
  //       withTiming(-50, {
  //         duration: 500,
  //         easing: Easing.in(Easing.exp),
  //       }),
  //     );
  //     opacity.value = withDelay(
  //       (items.length - index - 1) * 200,
  //       withTiming(0, {
  //         duration: 500,
  //         easing: Easing.in(Easing.exp),
  //       }),
  //     );
  //   } else {
  //     // setTimeout(() => {
  //     //   setUnmount(false);
  //     // }, 100 * index);
  //     // translateY.value = withDelay(
  //     //   index * 200,
  //     //   withTiming(60 * index, {
  //     //     duration: 500,
  //     //     easing: Easing.out(Easing.exp),
  //     //   }),
  //     // );
  //     // opacity.value = withDelay(
  //     //   index * 200,
  //     //   withTiming(1, {
  //     //     duration: 500,
  //     //     easing: Easing.out(Easing.exp),
  //     //   }),
  //     // );
  //     setTimeout(
  //       () => {
  //         setUnmount(false);
  //       },
  //       100 * (index + 1),
  //     );
  //     translateY.value = withDelay(
  //       index * 200,
  //       withTiming(60 * index, {
  //         duration: 500,
  //         easing: Easing.out(Easing.exp),
  //       }),
  //     );
  //     opacity.value = withDelay(
  //       index * 200,
  //       withTiming(1, {
  //         duration: 500,
  //         easing: Easing.out(Easing.exp),
  //       }),
  //     );
  //   }
  // }, [index, translateY, opacity, hidden]);
  const islandHeight = useSharedValue<DimensionValue>(0);

  useEffect(() => {
    if (hidden) {
      console.log('Animating islandHeight to 10');
      islandHeight.value = withTiming(0, {
        // duration: 200,
        // easing: Easing.ease,
      });
    } else {
      console.log('Animating islandHeight to 100');
      islandHeight.value = withTiming(45, {
        // duration: 200,
        // easing: Easing.ease,
      });
    }
  }, [hidden, islandHeight]);

  const animatedIslandStyle = useAnimatedStyle(() => ({
    height: islandHeight.value,
  }));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [{translateY: translateY.value}],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        a.w_full,
        a.mx_auto,
        a.mt_(2),
        a.relative,
        a.rounded_(35),
        a.z_20,
        // a.absolute,
        // animatedStyle,
        !showIsland && a.top_(50),
        // [unmount && a.display_none],
        a.z_(items.length - index),
        // a.opacity_(hidden ? 0 : 1),
        // a.h_(hidden ? 0 : 40),
        animatedIslandStyle,
      ]}>
      {!unmount && (
        <Animated.View
          // exiting={CustomBounceOutUp.delay(1000)}
          style={[
            a.w_(SCREEN_WIDTH * (ISLAND_PERCENTAGE - 0.02)),
            a.flex_row,
            a.mx_auto,
            a.items_center,
            a.px_(2),
            a.h_(43),
            a.bg_(item.color),
            a.rounded_full,
            a.overflow_hidden,
            {
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.16,
              shadowRadius: 1.51,
              elevation: 3,
            },
          ]}>
          <Pressable
            android_ripple={{
              color: hexWithOpacity(item.color, 0.6),
            }}
            onPress={handleAction}
            style={[
              a.w_(40),
              a.h_(40),
              a.bg_(item.icon.backgroundColor),
              a.z_20,
              a.items_center,
              a.justify_center,
              a.rounded_full,
              a.overflow_hidden,
            ]}>
            {!unmount && (
              <Animated.View
                entering={CustomBounceInRight}
                exiting={CustomBounceOutRight}>
                {item.icon.component}
              </Animated.View>
            )}
          </Pressable>
          <View
            style={[
              a.flex_1,
              a.my_(2),
              a.ml_(4),
              a.rounded_full,
              a.overflow_hidden,
            ]}>
            <Pressable
              android_ripple={{
                color: hexWithOpacity(colors.light_1, 0.7),
              }}
              onPress={handleAction}
              style={[
                a.mx_md,
                a.w_full,
                a.h_full,
                a.justify_center,
                a.self_center,
              ]}>
              <Text style={[a.font_bold, a.text_(colors.light_1), a.ml_2xl]}>
                {item.text}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const Menu = ({
  menuHidden,
  hideMenu,
}: {
  menuHidden: boolean;
  hideMenu(): void;
}) => {
  const {menuItemsKey} = useAppSelector((state) => state.island);
  const menuItems = useIslandMenu();

  const islandHeight = useSharedValue<DimensionValue>(0);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (menuHidden) {
      // Start shrinking the height and monitor its progress
      islandHeight.value = withTiming(
        0,
        { duration: 200, easing: Easing.linear },
        () => {
          // Ensure fully hidden when animation completes
          runOnJS(setHidden)(true);
        }
      );
    } else {
      // Ensure the element is visible immediately before expanding
      runOnJS(setHidden)(false);
      islandHeight.value = withTiming(100, { duration: 200 });
    }
  }, [menuHidden]);

  // Monitor height and hide component when it reaches a threshold
  useDerivedValue(() => {
    if ((islandHeight?.value as number) <= 5 && menuHidden) {
      runOnJS(setHidden)(true);
    }
  });

  const animatedIslandStyle = useAnimatedStyle(() => ({
    height: islandHeight.value,
    opacity: hidden ? 0 : 1, // Ensure no flicker occurs
  }));

  if (hidden && menuHidden) {
    return null; // Prevent rendering when fully hidden
  }

  return (
    <Animated.View
      style={[animatedIslandStyle, a.overflow_hidden]}>
      {menuItems['nil']?.map((item, index) => (
        <MenuItem
          key={index}
          index={index}
          items={menuItems['enroute'] || []}
          item={item}
          hidden={menuHidden}
          hide={hideMenu}
        />
      ))}
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'red',
    paddingHorizontal: 6,
  },
  text: {
    color: colors.light_1,
    fontWeight: 'bold',
  },
});

export default Menu;
