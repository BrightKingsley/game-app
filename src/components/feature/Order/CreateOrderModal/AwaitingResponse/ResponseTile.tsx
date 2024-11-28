import {
  Image,
  Platform,
  Pressable,
  TouchableNativeFeedback,
  ViewProps,
} from 'react-native';
import {PropsWithChildren, useCallback, useEffect, useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {G, Path, Pattern, Polygon, Rect, Svg} from 'react-native-svg';
import {a} from '#/lib/style/atoms';
import {useNavigation} from '@react-navigation/native';

import {hexWithOpacity} from '#/lib/ui/helpers';
import {useModalControls} from '$/src/components/global/modals/ModalState';
import {Text, View} from '$/src/components/global/Themed';
import {Column, ListTile, Row} from '$/src/components/global';
import {CarAwaiting, CarAwaitingGray} from '#/assets/images';
import Skeleton from '$/src/components/global/Skeleton';
import {MotiView} from 'moti';
import getRidePrice, {
  calculateDistance,
  calculateRideFare,
  rideFareConfig,
} from '$/src/lib/utils/api/getRidePrice';
import {useAppSelector} from '$/src/hooks/store';

const imageUri =
  'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

export default function ResponseTile({
  id = Math.random().toString(),
  photo = imageUri,
  title = 'react',
  ridePrice,
  loading,
}: {
  id?: string | number;
  photo?: string;
  title?: string;
  ridePrice: number;
  loading: boolean;
}) {
  const {closeAllModals, openModal} = useModalControls();
  const {orderRequest} = useAppSelector(state => state.order);

  const handleTilePress = useCallback(() => {
    openModal('ride-info', {});
  }, []);

  const handleMapIconClick = useCallback(() => {
    closeAllModals();
  }, []);

  return loading ? (
    <ResponseTileLoader />
  ) : (
    <View
      style={[
        a.rounded_md,
        a.relative,
        a.border,
        a.border_tint(hexWithOpacity(colors.light_2, 0.4)),
      ]}>
      <ListTile
        style={[a.relative, a.bg_('white'), a.rounded_md]}
        ripple
        rippleColor={hexWithOpacity(colors.teal_2, 0.5)}
        leading={
          <Row style={[]}>
            <Svg
              width={90}
              style={[a.justify_center, a.items_center]}
              height={70}>
              <Pattern
                id="c"
                height="100%"
                width="100%"
                patternUnits="userSpaceOnUse"
                patternContentUnits="objectBoundingBox"
                preserveAspectRatio="none"
                x="0"
                y="0">
                <Rect width="1" height="1" fill={colors.teal_2} />
                <View
                  style={[
                    a.w_(85),
                    a.h_(70),
                    a.self_center,
                    a.items_center,
                    a.justify_center,
                  ]}>
                  <Image
                    height={100}
                    width={100}
                    resizeMode="contain"
                    // preserveAspectRatio="xMidYMid meet"
                    // xlinkHref={CarAwaiting}
                    source={CarAwaiting}
                    alt="car"
                    // href={CarAwaiting}
                    // x="0.05"
                    // y="0"
                    style={[a.w_80, a.h_80, a.self_center]}
                  />
                </View>
              </Pattern>
              <Path
                d="M0 0 L60 0 L90 90 L0 90 Z"
                stroke="transparent"
                strokeWidth={0}
                fill="url(#c)"
              />
            </Svg>
          </Row>
        }
        content={
          <View style={[]}>
            <Text style={[a.text_lg, a.font_bold, a.capitalize]}>
              {'Workobor'}
            </Text>
            <Row style={[a.mt_xs]}>
              <Text style={[a.text_(colors.light_2)]}>8 min</Text>
              <Row style={[a.items_center, a.ml_md]}>
                <Ionicons name="person" color={colors.light_2} />
                <Text style={[a.text_(colors.light_2)]}>4</Text>
              </Row>
            </Row>
          </View>
        }
        trailing={
          <Column
            style={[a.items_end, a.justify_center, a.z_20, a.right_0, a.px_md]}>
            <Text style={[a.text_lg, a.font_bold]}>₦{ridePrice}</Text>
            <Text
              style={[
                a.text_sm,
                a.font_bold,
                a.text_(colors.light_3),
                {
                  textDecorationColor: colors.light_2,
                  textDecorationStyle: 'solid',
                  textDecorationLine: 'line-through',
                },
              ]}>
              ₦{ridePrice}
            </Text>
          </Column>
        }
        action={handleTilePress}
      />

      {/* <View
        style={[
          a.absolute,
          a.right_0,
          a.z_20,
          a.top_('74%'),
          a.w_(40),
          a.h_(40),
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
            elevation: 2,
          },
        ]}>
        <Pressable
          onPress={handleMapIconClick}
          android_ripple={{
            color: hexWithOpacity(colors.yellow_3, 0.5),
          }}
          style={[
            a.self_center,
            a.rounded_full,
            a.align_center,
            a.justify_center,
            a.w_full,
            a.h_full,
            a.bg_('white'),
          ]}>
          <Ionicons name="location" size={18} color={colors.yellow_3} />
        </Pressable>
      </View> */}
    </View>
  );
}

export function ResponseTileLoader() {
  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      animate={{backgroundColor: '#ffffff'}}
      style={[
        a.rounded_md,
        a.relative,
        a.border,
        a.border_tint(hexWithOpacity(colors.light_2, 0.4)),
      ]}>
      <ListTile
        style={[a.relative, a.bg_('white'), a.rounded_md]}
        ripple
        rippleColor={hexWithOpacity(colors.light_2, 0.5)}
        leading={
          <Row style={[]}>
            <Svg
              width={90}
              style={[a.justify_center, a.items_center]}
              height={70}>
              <Pattern
                id="c"
                height="100%"
                width="100%"
                patternUnits="userSpaceOnUse"
                patternContentUnits="objectBoundingBox"
                preserveAspectRatio="none"
                x="0"
                y="0">
                <Rect width="1" height="1" fill={colors.light_2} />
                <View
                  style={[
                    a.w_(85),
                    a.h_(70),
                    a.self_center,
                    a.items_center,
                    a.justify_center,
                  ]}>
                  {/* <Grayscale> */}
                  <Image
                    height={100}
                    width={100}
                    resizeMode="contain"
                    // preserveAspectRatio="xMidYMid meet"
                    // xlinkHref={CarAwaiting}
                    source={CarAwaitingGray}
                    alt="car"
                    // href={CarAwaiting}
                    // x="0.05"
                    // y="0"
                    style={[a.w_80, a.h_80, a.self_center]}
                  />
                  {/* </Grayscale> */}
                </View>
              </Pattern>
              <Path
                d="M0 0 L60 0 L90 90 L0 90 Z"
                stroke="transparent"
                strokeWidth={0}
                fill="url(#c)"
              />
            </Svg>
          </Row>
        }
        content={
          <View style={[]}>
            <Skeleton width={80} height={20} radius={'round'} />
            <Row style={[a.mt_xs]}>
              <Skeleton width={20} height={10} radius={'round'} />
              <Row style={[a.items_center, a.ml_md]}>
                <Ionicons name="person" color={colors.light_2} />
                <Skeleton width={10} height={10} radius={'round'} />
              </Row>
            </Row>
          </View>
        }
        trailing={
          <Column
            style={[a.items_end, a.justify_center, a.z_20, a.right_0, a.px_md]}>
            <Skeleton width={50} height={16} radius={'round'} />
            <View style={[a.mt_sm]}>
              <Skeleton width={40} height={14} radius={'round'} />
            </View>
          </Column>
        }
        action={() => null}
      />
    </MotiView>
  );
}
