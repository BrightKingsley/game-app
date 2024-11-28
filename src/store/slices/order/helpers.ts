import {Dispatch} from '@reduxjs/toolkit';

import store from '#/store';

import {setOrderRequest, setOrderResponse} from './slice';
import {
  DeliveryOrderRequest,
  DeliveryOrderResponse,
  OrderResponse,
  OrderType,
  RideOrderRequest,
  RideOrderResponse,
} from './types';

export function updateOrderRequest<T extends OrderType>(
  dispatch: Dispatch,
  data: Partial<
    T extends OrderType.ride ? RideOrderRequest : DeliveryOrderRequest
  >,
) {
  const orderState = store.getState().order;
  if (!data) return;
  dispatch(
    setOrderRequest({
      orderRequest: {...orderState.orderRequest, ...(data as any)},
    }),
  );
}

export function updateOrderResponse<T extends OrderType>(
  dispatch: Dispatch,
  type: T,
  data: Partial<
    T extends OrderType.ride ? RideOrderResponse : DeliveryOrderResponse
  >,
) {
  const orderState = store.getState().order;
  console.debug('updateOrderResponse', {data, orderState});
  dispatch(
    setOrderResponse({
      orderResponse: {
        ...orderState.orderResponse,
        ...(data as OrderResponse),
        // type: type,
      },
    }),
  );
}
