// import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

import {ApiError} from '#/lib/utils/api/axios';
import apiRoutes from '#/lib/utils/api/routes';
// import {NavigationProps} from '#/navigation/types';
import {OrderRequest} from '#/store/slices/order/types';
import useRequest from './useRequest';
import {useAppDispatch, useAppSelector} from '../store';
import {Alert} from 'react-native';
import {updateOrderRequest} from '$/src/store/slices/order/helpers';
import {clearOrderRequest} from '$/src/store/slices/order/slice';

// import {useAppDispatch} from '../store';

export default function useOrderApi() {
  // const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const {orderRequest} = useAppSelector(state => state.order);
  const {fetchData} = useRequest();

  const getOrders = useCallback(async (status: 'pending' | 'completed') => {
    try {
      const data = await fetchData<{orders: any[]}>(
        'get',
        `${apiRoutes.order.orders.route}?user_type=passenger&status=${status}`,
      );
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
        );
      } else {
        console.error('Unexpected Error:', error);
      }
      return null;
    }
  }, []);

  const getOrder = useCallback(async (id: string) => {
    try {
      const data = await fetchData<{order: any}>(
        'get',
        `${apiRoutes.order.orders.route_(id)}`,
      );
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
        );
      } else {
        console.error('Unexpected Error:', error);
      }

      return null;
    }
  }, []);

  const createOrder = useCallback(async () => {
    console.log({orderRequest});
    try {
      if (!orderRequest) return Alert.alert('Invalid Order Request');
      const data = await fetchData<{orderId: string}>(
        'post',
        `${apiRoutes.order.create.route}`,
        {order: orderRequest},
      );
      updateOrderRequest(dispatch, {orderId: data?.orderId});
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
        );
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  }, [orderRequest]);

  const cancelRequest = useCallback(async () => {
    try {
      if (!orderRequest) return Alert.alert('Invalid Order Request');
      const data = await fetchData<{orderId: string}>(
        'post',
        `${apiRoutes.order['cancel-request'].route}`,
        {orderId: orderRequest.orderId},
      );
      dispatch(clearOrderRequest());
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
        );
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  }, []);

  const cancelRide = useCallback(async () => {
    try {
      if (!orderRequest) return Alert.alert('Invalid Order Request');
      const data = await fetchData<{orderId: string}>(
        'post',
        `${apiRoutes.order['cancel-ride'].route}`,
        {orderId: orderRequest.orderId},
      );
      dispatch(clearOrderRequest());
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
        );
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  }, []);

  return {
    createOrder,
    getOrder,
    getOrders,
    cancelRequest,
    cancelRide,
  };
}
