import {a} from '#/lib/style/atoms';

import {hexWithOpacity} from '#/lib/ui/helpers';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {Text, View} from '$/src/components/global/Themed';
import {Row} from '$/src/components/global';
import Button, {ButtonText} from '$/src/components/global/Button';
import {useModalControls} from '$/src/components/global/modals/ModalState';
import {Container} from '$/src/components/utils';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ViewHeader from '$/src/components/global/ViewHeader';
import {useAppDispatch, useAppSelector} from '$/src/hooks/store';
import useApi from '$/src/hooks/api/useApi';
import PingAnimation from '$/src/components/global/PingAnimation';
import {setOrderPhase} from '$/src/store/slices/order/slice';
import {OrderPhase} from '$/src/store/slices/order/types';

export const snapPoints = [`40%`];

export const enablePanDownToClose = false;

export default function ConfirmOrder() {
  const {closeModal, openModal} = useModalControls();
  const {orderRequest} = useAppSelector(state => state.order);
  const {createOrder} = useApi().order;
  const dispatch = useAppDispatch();

  const handleConfirmOrder = useCallback(() => {
    dispatch(setOrderPhase(OrderPhase.awaitingRide));
    createOrder();
  }, []);

  return (
    <>
      <Container>
        <ViewHeader
          canGoBack
          backPressHandler={closeModal}
          title="Confirm Order"
        />
      </Container>
      <BottomSheetScrollView style={[a.mt_xl]}>
        <Container>
          <View style={[a.mt_2xl]}>
            <View
              style={[
                a.absolute,
                a.h_65,
                a.left_(4),
                a.border_l,
                a.mt_2xl,
                a.border_l_tint(colors.yellow_1),
                {borderStyle: 'dashed'},
              ]}
            />
            <Row style={[]}>
              <View
                style={[
                  a.relative,
                  a.w_(10),
                  a.h_(10),
                  a.mt_2xl,
                  a.rounded_full,
                  a.items_center,
                  a.justify_center,
                  // a.bg_(colors.yellow_1),
                  a.overflow_visible,
                ]}>
                <Ionicons
                  name="location"
                  color={colors.yellow_1}
                  size={24}
                  style={[
                    a.self_center,
                    a.top_(-10),
                    a.left_(-2),
                    a.z_20,
                    a.w_(20),
                    a.h_(30),
                  ]}
                />
              </View>
              <Text style={[a.ml_lg, a.text_sm]}>
                {orderRequest?.origin.address}
              </Text>
            </Row>
            <Row style={[a.mt_5xl]}>
              <View style={[a.mt_2xl]}>
                <PingAnimation pingSize={30} />
              </View>
              <Text style={[a.ml_lg, a.text_sm]}>
                {orderRequest?.destination.address}
              </Text>
            </Row>
          </View>
          <View style={[a.mt_4xl]}>
            <Button
              onPress={handleConfirmOrder}
              label={'confirm'}
              color="primary"
              variant="solid"
              shape="round">
              <ButtonText>Confirm</ButtonText>
            </Button>
          </View>
        </Container>
      </BottomSheetScrollView>
    </>
  );
}
