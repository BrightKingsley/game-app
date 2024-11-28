import {useFocusEffect, useRouter} from 'expo-router';
import {useCallback, useEffect} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';

import {Button, Row} from '$/src/components/global';
import {ButtonText} from '$/src/components/global/Button';
import {
  useModalControls,
  useModals,
} from '$/src/components/global/modals/ModalState';
import {Text, View} from '$/src/components/global/Themed';
import useApi from '$/src/hooks/api/useApi';
import {a} from '$/src/lib/style/atoms';
import {
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '$/src/hooks/store';
import PingAnimation from '$/src/components/global/PingAnimation';
import {useUser} from '@clerk/clerk-expo';
import {OrderPhase, OrderType} from '$/src/store/slices/order/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  hideIsland,
  setIslandMenuItemsKey,
  showIsland,
} from '$/src/store/slices/island';
import Animated, {
  BounceInDown,
  BounceInLeft,
  BounceOutDown,
  BounceOutRight,
  BounceOutUp,
} from 'react-native-reanimated';
import {ISLAND_PERCENTAGE} from '$/src/components/global/Island/Island';
import {TrackOrderIcon} from '$/src/lib/icons';
import TextInput from '$/src/components/global/TextInput';
import KeyboardAvoidingComponent from '$/src/components/global/KeyboardAvoidingComponent';
import {usePalette} from '$/src/hooks/theme';

export default function Home() {
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const {openModal, closeModal} = useModalControls();
  const {activeModals} = useModals();
  const activeModal = activeModals[activeModals.length - 1];
  const colors = usePalette();

  const {createOrder} = useApi().order;

  const {riderInfo, orderPhase, orderRequest} = useAppSelector(
    state => state.order,
  );

  const dispatch = useAppDispatch();

  const {user} = useUser();

  const router = useRouter();
  const safeInsets = useSafeAreaInsets();

  const toggleModal = useCallback(() => {
    // openModal(activeModals[activeModals.length - 1] || 'where-to');
  }, [activeModals]);

  const handleWalletPress = useCallback(() => {
    Platform.OS === 'android'
      ? openModal('wallet')
      : router.push('/(app)/wallet');
  }, []);

  useFocusEffect(
    useCallback(() => {
      // if (true) {
      if (!orderRequest || orderRequest.type !== OrderType.delivery) {
        toggleModal();
      }
    }, [orderRequest]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(showIsland());
      dispatch(setIslandMenuItemsKey(OrderPhase.enroute));

      return () => {
        dispatch(hideIsland());
      };
    }, []),
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[a.flex_1]}>
      <ScrollView
        scrollEnabled={false}
        style={[a.flex_1]}
        contentContainerStyle={[a.flex_1]}>
        <View style={[a.flex_1]} />
        {orderPhase === OrderPhase.awaitingRide && (
          <View
            style={[
              a.absolute,
              a.w_full,
              a.h_full,
              a.items_center,
              a.justify_center,
              a.z_50,
            ]}>
            <PingAnimation pingSize={200}>
              <Image
                source={{uri: user?.imageUrl}}
                style={
                  [
                    a.w_(50),
                    a.h_(50),
                    a.rounded_full,
                    a.bg_(colors.primary_darker),
                  ] as ImageStyle
                }
              />
            </PingAnimation>
            <Text style={[a.mx_auto, a.mt_2xl]}>
              Finding Available Riders...
            </Text>
          </View>
        )}

        {orderRequest?.type === OrderType.delivery && (
          <Animated.View
            entering={BounceInDown}
            exiting={BounceOutDown}
            style={[
              a.absolute,
              a.flex_row,
              a.bottom_(10),
              a.z_50,
              a.w_90,
              a.self_center,
              a.gap_md,
              a.items_center,
            ]}>
            <TextInput
              placeholder="Enter Tracking ID..."
              containerStyle={[a.flex_1]}
            />
            <Button
              color="teal"
              variant="solid"
              shape="round"
              style={[
                a.p_2xl,
                a.w_(50),
                a.h_(50),
                a.items_center,
                a.justify_center,
              ]}>
              {/* <Ionicons name='trac' /> */}
              <TrackOrderIcon />
            </Button>
          </Animated.View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
