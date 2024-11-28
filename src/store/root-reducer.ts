import {combineReducers} from 'redux';

import authSlice from './slices/auth';
import chatSlice from './slices/chat';
import islandSlice from './slices/island';
import orderSlice from './slices/order/slice';
import walletSlice from './slices/wallet';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  // modal: modalSlice.reducer,
  // notification: notificationSlice.reducer,
  order: orderSlice.reducer,
  chat: chatSlice.reducer,
  wallet: walletSlice.reducer,
  island: islandSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
