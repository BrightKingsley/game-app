import {useEffect, useCallback} from 'react';
import {socket} from '$/src/lib/utils/socket';
import {EventName} from '$/src/lib/utils/socket/socket';
import {useUser} from '@clerk/clerk-expo';
import {Alert} from 'react-native';
import {useAppDispatch, useAppSelector} from '$/src/hooks/store';
import {useModalControls} from '$/src/components/global/modals/ModalState';
import {
  clearOrderRequest,
  clearOrderResponse,
  setOrderPhase,
  setRider,
} from '$/src/store/slices/order/slice';
import {clearChatId, setChatId} from '$/src/store/slices/chat';
import {OrderPhase, VehicleType} from '$/src/store/slices/order/types';

export default function OrderSocket() {
  const {user} = useUser();
  const dispatch = useAppDispatch();
  const {orderRequest} = useAppSelector(state => state.order);
  const {closeAllModals, closeModal} = useModalControls();

  // Emit passenger socket update only when socket ID or user ID changes
  useEffect(() => {
    if (user?.id && socket.id) {
      socket.emit<EventName>('update_passenger_socket', {
        passengerId: user.id,
        socketId: socket.id,
      });
    }
  }, [user?.id, socket.id]);

  // Handler for 'available_rides' event
  const handleAvailableRides = useCallback(
    (data: any) => {
      dispatch(setOrderPhase(OrderPhase.accepted));
      dispatch(
        setRider({
          riderId: data.driverId,
          location: {
            coords: {
              latitude: data.riderLocation?.latitude,
              longitude: data.riderLocation?.longitude,
            },
            address: data.riderLocation?.address,
          },
          vehicle: {capacity: 4, type: VehicleType.car},
          photo: data.photo,
          lastName: data.lastName,
          firstName: data.firstName,
        }),
      );
      dispatch(setChatId(data.chatId));
      socket.emit('handshake', orderRequest?.orderId);
    },
    [dispatch, orderRequest?.orderId],
  );

  const handleRideStarted = useCallback(() => {
    dispatch(setOrderPhase(OrderPhase.enroute));
    Alert.alert('Ride started');
  }, [dispatch, closeAllModals]);

  // Handler for 'ride_completed' event
  const handleRideCompleted = useCallback(async () => {
    dispatch(clearChatId());
    dispatch(clearOrderRequest());
    dispatch(clearOrderResponse());
    Alert.alert('Ride completed');
    closeAllModals();
    closeModal();
  }, [dispatch, closeAllModals, closeModal]);

  // Handler for 'ride_cancelled' event
  const handleRideCancelled = useCallback(() => {
    dispatch(clearChatId());
    dispatch(clearOrderResponse());
    closeAllModals();
    Alert.alert('Ride cancelled');
  }, [dispatch, closeAllModals]);

  // Socket event listeners
  useEffect(() => {
    socket.on<EventName>('available_rides', handleAvailableRides);
    socket.on<EventName>('ride_completed', handleRideCompleted);
    socket.on<EventName>('ride_started', handleRideStarted);
    socket.on<EventName>('ride_cancelled', handleRideCancelled);

    // Cleanup listeners on unmount or re-render to avoid memory leaks
    return () => {
      socket.off<EventName>('available_rides', handleAvailableRides);
      socket.off<EventName>('ride_completed', handleRideCompleted);
      socket.off<EventName>('ride_started', handleRideStarted);
      socket.off<EventName>('ride_cancelled', handleRideCancelled);
    };
  }, [handleAvailableRides, handleRideCompleted, handleRideCancelled]);

  return null;
}
