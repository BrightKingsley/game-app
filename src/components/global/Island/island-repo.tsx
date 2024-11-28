import {OrderPhase, OrderType} from '#/store/slices/order/types';
import {Image, Linking, Pressable} from 'react-native';
import Row from '../Row';
import {Text, View} from '../Themed';
import {a} from '#/lib/style/atoms';

import {Feather, Ionicons} from '@expo/vector-icons';
import {CarIcon, PackageIcon} from '#/lib/icons';
import {useNavigation} from '@react-navigation/native';
import {updateOrderRequest} from '#/store/slices/order/helpers';
import {useAppDispatch, useAppSelector} from '#/hooks/store';
// import {useModalControls} from '../modals/ModalContext';
import {MenuItemType} from '#/store/slices/island/types';
import {hexWithOpacity} from '#/lib/ui/helpers';
import {ComponentProps, useCallback} from 'react';
import Separator from '../Separator';
// import {DRIVER_IMG} from '../modals/ChatModal';
import {setIslandContent} from '#/store/slices/island';
import {useModalControls} from '../modals/ModalState';

export function useIslandMenu(): Partial<{
  [key in OrderPhase]: MenuItemType[];
}> {
  const dispatch = useAppDispatch();
  const {openModal} = useModalControls();

  const handleCallPress = () => {
    const phoneNumber = `tel:${'08021248576'}`;

    console.log({phoneNumber});

    Linking.openURL(phoneNumber).catch(err =>
      console.error('An error occurred while opening the phone app:', err),
    );
  };

  const handleMessagePress = () => {
    openModal('chat');
  };

  const ride_enroute_options: MenuItemType[] = [
    {
      action: handleMessagePress,
      color: colors.primary,
      icon: {
        backgroundColor: colors.yellow_1,
        component: (
          <Ionicons name="chatbox-ellipses" size={30} color={colors.primary} />
        ),
      },
      text: 'Ride',
    },
    {
      action: handleCallPress,
      color: colors.teal_3,
      icon: {
        backgroundColor: colors.teal_1,
        component: <Ionicons name="gift-outline" size={30} color={colors.teal_3} />,
      },
      text: 'Delivery',
    },
    // {
    //   action() {},
    //   color: colors.light_4,
    //   icon: {
    //     backgroundColor: colors.light_1,
    //     component: <Ionicons name="person" size={30} color={colors.light_4} />,
    //   },
    //   text: 'Rider Info',
    // },
    // {
    //   action() {},
    //   color: colors.error_3,
    //   icon: {
    //     backgroundColor: colors.error_1,
    //     component: <Ionicons name="close" size={30} color={colors.error_3} />,
    //   },
    //   text: 'Cancel Ride',
    // },
  ];
  return {
    nil: [
      {
        color: colors.primary,
        action() {
          console.log("ORDER_RIDE");
          updateOrderRequest(dispatch, {
            type: OrderType.ride,
          });
        },
        icon: {
          component: <Ionicons name='car' size={30} color={colors.primary} />,
          backgroundColor: colors.yellow_1,
        },
        text: 'Order A Ride',
      },
      {
        color: colors.teal_3,
        action() {
          updateOrderRequest(dispatch, {
            type: OrderType.delivery,
          });
          // openModal('select-destination');
        },
        icon: {
          component: <Feather name='package' size={30} color={colors.teal_3} />,
          backgroundColor: colors.teal_1,
        },
        text: 'Order A Delivery',
      },
    ],
    'awaiting-ride': ride_enroute_options,
    enroute: ride_enroute_options,
  };
}

export function useIslandContent() {
  const {openModal, closeModal} = useModalControls();
  const {orderRequest} = useAppSelector(state => state.order);
  const dispatch = useAppDispatch();

  const selectDestination = useCallback(() => {
  }, []);

  const continueOrder = useCallback(() => {
    openModal('awaiting-response');
  }, []);

  const closeChatIsland = useCallback(() => {
    closeModal();
    dispatch(setIslandContent('null'));
  }, []);

  return {
    'select-destination': {
      action: selectDestination,
      icon: <Ionicons name="location" color={colors.dark_4} size={30} />,
      iconBackground: colors.light_1,
      component: (
        <View
          style={[
            a.flex_1,
            a.my_(5),
            a.ml_(4),
            a.rounded_full,
            a.overflow_hidden,
          ]}>
          <Row
            style={[a.mx_md, a.w_full, a.h_90, a.self_center, a.items_center]}>
            <Row
              style={[a.flex_1, a.overflow_hidden, a.h_full, a.items_center]}>
              {/* <Text style={[a.font_bold, a.text_(colors.light_1)]}>
                Destination:
              </Text> */}
              <Separator width={10} />
              <Text
                numberOfLines={1}
                style={[a.font_bold, a.text_(colors.light_1)]}>
                {orderRequest?.destination?.address}
              </Text>
            </Row>
            <View
              style={[a.w_(50), a.h_(50), a.rounded_full, a.overflow_hidden]}>
              <Pressable
                android_ripple={{
                  color: hexWithOpacity(colors.light_1, 0.7),
                }}
                onPress={continueOrder}
                style={[
                  a.ml_auto,
                  a.w_full,
                  a.h_full,
                  a.items_center,
                  a.justify_center,
                ]}>
                <Ionicons
                  name="arrow-forward"
                  color={colors.light_1}
                  size={30}
                />
              </Pressable>
            </View>
          </Row>
        </View>
      ),
    },
    chat: {
      action() {},
      icon: (
        // <Image
        //   source={{uri: DRIVER_IMG}}
        //   alt={'rider name'}
        //   style={[a.w_(50), a.h_(50)] as ComponentProps<typeof Image>['style']}
        // />
        <View
          style={[a.bg_(colors.error_2), a.w_(50), a.h_(50), a.rounded_full]}
        />
      ),
      iconBackground: colors.light_1,
      component: (
        <View
          style={[
            a.flex_1,
            a.my_(5),
            a.ml_(4),
            a.rounded_full,
            a.overflow_hidden,
          ]}>
          <Row
            style={[
              a.mx_md,
              a.w_full,
              a.h_90,
              a.justify_center,
              a.items_center,
              a.self_center,
            ]}>
            <Row style={[a.ml_lg]}>
              <Text style={[a.font_bold, a.text_(colors.light_1)]}>Rider:</Text>
              <Separator width={10} />
              <Text
                numberOfLines={1}
                style={[a.font_bold, a.text_(colors.light_1)]}>
                {'Driver Corolla'}
              </Text>
            </Row>
            <Pressable
              style={[a.ml_auto, a.self_center]}
              onPress={closeChatIsland}>
              <Ionicons name="close" color={colors.light_1} size={24} />
            </Pressable>
          </Row>
        </View>
      ),
    },
    null: null,
  };
}
