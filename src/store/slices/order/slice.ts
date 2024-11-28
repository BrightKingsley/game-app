import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {OrderPhase, OrderState, Rider} from './types';

// export type OrderType = 'ride' | 'delivery';

const initialState: OrderState = {
  orderRequest: null,
  orderResponse: null,
  orderPhase: OrderPhase.nil,
  riderInfo: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderRequest: (state, action: PayloadAction<Partial<OrderState>>) => {
      state.orderRequest = action.payload.orderRequest!;
    },
    setOrderResponse: (state, action: PayloadAction<Partial<OrderState>>) => {
      state.orderResponse = action.payload.orderResponse!;
    },
    setOrderPhase: (state, action: PayloadAction<OrderPhase>) => {
      state.orderPhase = action.payload!;
    },
    clearOrderRequest: state => {
      state.orderRequest = null;
    },
    clearOrderResponse: state => {
      state.orderRequest = null;
    },
    setRider: (state, action: PayloadAction<Rider>) => {
      state.riderInfo = action.payload;
    },
  },
});

export const {
  clearOrderRequest,
  clearOrderResponse,
  setOrderRequest,
  setOrderResponse,
  setOrderPhase,
  setRider,
} = orderSlice.actions;
export default orderSlice;
