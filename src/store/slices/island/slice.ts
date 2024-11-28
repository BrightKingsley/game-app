import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {OrderPhase} from '../order/types';
import {IslandState, MenuItemType, TriggerIsland} from './types';

const initialIslandState: IslandState = {
  showIsland: false,
  islandMessage: {
    text: '',
    title: '',
  },
  disableOnClick: true,
  type: 'menu',
  menuItems: [],
  pingReceptor: 0,
  menuItemsKey: OrderPhase.nil,
};

const islandSlice = createSlice({
  name: 'island',
  initialState: initialIslandState,
  reducers: {
    triggerIsland: (state, action: PayloadAction<TriggerIsland>) => {
      const {
        message,
        confirm,
        cancel,
        clickToDisable,
        show,
        type = 'menu',
        className,
        children,
      } = action.payload;

      console.log('TRIGGER_MODAL: ', action.payload);

      return {
        ...state,
        showIsland: show !== undefined ? show : !state.showIsland,
        actionCancel:
          typeof cancel === 'function' ? cancel : state.actionCancel,
        disableOnClick:
          typeof clickToDisable === 'boolean'
            ? clickToDisable
            : state.disableOnClick,
        actionConfirm:
          typeof confirm === 'function' ? confirm : state.actionConfirm,
        children,
        islandMessage: message,
        className,
        type,
      };
    },
    showIsland(state) {
      return {
        ...state,
        showIsland: true,
      };
    },
    setIslandContent(state, action: PayloadAction<IslandState['content']>) {
      return {
        ...state,
        content: action.payload,
      };
    },

    setIslandMenuItemsKey(state, action: PayloadAction<OrderPhase>) {
      return {
        ...state,
        menuItemsKey: action.payload,
      };
    },
    hideIsland(state) {
      return {
        ...state,
        showIsland: false,
      };
    },
    setMenuItems(state, action: PayloadAction<TriggerIsland>) {
      return {
        ...state,
      };
    },
    setIslandType(state, action: PayloadAction<IslandState['type']>) {
      return {
        ...state,
        type: action.payload,
      };
    },
    ping(state) {
      return {
        ...state,
        pingReceptor: Math.random(),
      };
    },
    closeIsland() {
      return initialIslandState;
    },
  },
});

export const {
  triggerIsland,
  closeIsland,
  setIslandType,
  hideIsland,
  showIsland,
  setIslandContent,
  setIslandMenuItemsKey,
  ping,
  setMenuItems,
} = islandSlice.actions;
export default islandSlice;
