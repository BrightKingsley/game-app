import {Ionicons} from '@expo/vector-icons';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Platform, Pressable, ViewStyle} from 'react-native';

import {useAppDispatch, useAppSelector} from '#/hooks/store';
import {a} from '#/lib/style/atoms';

import {clearOrderRequest} from '#/store/slices/order/slice';
import {VehicleType} from '#/store/slices/order/types';
import {Button, Column, Row, Separator} from '$/src/components/global';
import {ButtonText} from '$/src/components/global/Button';
import {
  useModalControls,
  useModals,
} from '$/src/components/global/modals/ModalState';
import {Text, View} from '$/src/components/global/Themed';
import {Container, FadeScreenWrapper} from '$/src/components/utils';
import ViewHeader from '$/src/components/global/ViewHeader';
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {HITSLOP_20} from '$/src/lib/constants';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import ResponseTile, {
  ResponseTileLoader,
} from './AwaitingResponse/ResponseTile';
import {hexWithOpacity} from '$/src/lib/ui/helpers';
import useApi from '$/src/hooks/api/useApi';
import PingAnimation from '$/src/components/global/PingAnimation';
import {useRouter} from 'expo-router';
import {
  calculateDistance,
  calculateRideFare,
  rideFareConfig,
} from '$/src/lib/utils/api/getRidePrice';
import {updateOrderRequest} from '$/src/store/slices/order/helpers';

export const snapPoints = [280, '50%'];

export const enablePanDownToClose = false;

export const footerComponent = (props: BottomSheetFooterProps) => {
  const {openModal} = useModalControls();
  const router = useRouter();

  const handlePaymentOption = useCallback(() => {
    Platform.OS === 'android'
      ? openModal('wallet')
      : router.push('/(app)/wallet');
  }, []);

  const handleSelectRide = useCallback(() => {
    openModal('confirm-order');
  }, []);

  return (
    <BottomSheetFooter
      {...props}
      style={
        [
          a.bg_(colors.light_1),
          a.border_t_tint(hexWithOpacity(colors.light_2, 0.3)),
          a.border_t,
        ] as ViewStyle
      }
      bottomInset={24}>
      <Container>
        <Button onPress={handlePaymentOption} variant="ghost">
          <Row style={[a.items_center, a.mb_xs]}>
            <Ionicons name="cash" color={'green'} />
            <Text style={[a.ml_sm, a.text_md, a.font_bold]}>Pay In Cash</Text>
          </Row>
        </Button>
        <Button
          label={'Clear Order Request'}
          variant="solid"
          shape="round"
          color="primary"
          style={[a.w_full]}
          onPress={handleSelectRide}>
          <ButtonText>Select ride</ButtonText>
        </Button>
      </Container>
    </BottomSheetFooter>
  );
};

export default function OrderDetails() {
  const dispatch = useAppDispatch();
  const {closeModal, openModal} = useModalControls();
  const {modalRef} = useModals();

  const router = useRouter();

  const {orderResponse, orderRequest, riderInfo} = useAppSelector(
    state => state.order,
  );

  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.car);
  const [showInfo, setShowInfo] = useState(false);
  const [rides, setRides] = useState([]);
  const [ridePrice, setRidePrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleSelectRide = useCallback(() => {
    openModal('confirm-order');
  }, []);

  const toggleShowInfo = useCallback(() => {
    setShowInfo(prev => {
      prev ? modalRef?.current?.collapse() : modalRef?.current?.expand();
      return !prev;
    });
  }, [openModal]);

  useEffect(() => {
    if (orderResponse?.availableRiders.length) setLoading(false);
  }, [orderResponse?.availableRiders]);

  useEffect(() => {
    (async () => {
      try {
        console.log("RUNNINGGGGGGG!");
        setLoading(true);
        if (!(orderRequest && orderRequest.destination && orderRequest.origin))
          return;
        const data = await calculateDistance({
          // destination: {
          //   latitude: orderRequest?.destination.latitude,
          //   longitude: orderRequest?.destination.longitude,
          // },
          // origin: {
          //   latitude: orderRequest?.origin.latitude,
          //   longitude: orderRequest?.origin.longitude,
          // },
          destination: `${orderRequest?.destination.latitude},${orderRequest?.destination.longitude}`,
          origin: `${orderRequest?.origin.latitude},${orderRequest?.origin.longitude}`,
        });

        if (!data) return;

        const rideFare = calculateRideFare(rideFareConfig, {
          distanceKm: data.distanceInMeters / 1000,
          durationMin: data.timeInMilliSeconds / (1000 * 60),
        });

        if (rideFare) {
          setRidePrice(rideFare);
          updateOrderRequest(dispatch, {fare: ridePrice});
        }
      } catch (error) {
        console.error('CALCULATE_DISTANCE_ERROR: ', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handlePaymentOption = useCallback(() => {
    Platform.OS === 'android'
      ? openModal('wallet')
      : router.push('/(app)/wallet');
  }, []);

  return (
    <>
      <Container>
        <ViewHeader
          canGoBack={true}
          backPressHandler={closeModal}
          rightComponent={
            <Button
              onPress={toggleShowInfo}
              variant="ghost"
              shape="round"
              hitSlop={HITSLOP_20}
              style={[a.py_0]}>
              <Ionicons name="information-circle-outline" size={30} />
            </Button>
          }
          title="Select Ride"
        />
      </Container>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={[a.mt_xl]}>
        {showInfo ? (
          <RideInfo />
        ) : (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            {/* <Container>
              {loading || !riderInfo ? (
                <Fragment>
                  <ResponseTileLoader />
                  <Separator height={10} />
                </Fragment>
              ) : (
                )}
                </Container> */}
            <Container>
              <Fragment>
                <ResponseTile ridePrice={ridePrice} loading={loading} />
                <Separator height={10} />
              </Fragment>
            </Container>
            {/* <Separator
              height={1}
              backgroundColor={hexWithOpacity(colors.light_2, 0.3)}
              style={[a.mb_lg]}
            /> */}
            {/* <BottomSheetFooter animatedFooterPosition={}>
              
            </BottomSheetFooter> */}
          </Animated.View>
        )}
      </BottomSheetScrollView>
    </>
  );
}

function RideInfo() {
  const {orderRequest} = useAppSelector(state => state.order);

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[a.mt_2xl, a.top_0, a.pb_(20)]}>
      <Container>
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
                // a.absolute,
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
      </Container>
    </Animated.View>
  );
}
