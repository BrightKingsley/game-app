import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MessageType} from '$/src/components/feature/Chat/types';

type ChatState = {
  chatId: string | null;
  messages: MessageType[];
};

const initialChatState: ChatState = {
  chatId: 'first_chat',
  // messages: Array.from({length: 10}, () => null).map((_, i) => ({
  //   id: i.toString(),
  //   sender: 'senderId',
  //   text: `A text ${i}`,
  // })),
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    setChatId(state, action: PayloadAction<string>) {
      return {
        ...state,
        chatId: action.payload,
      };
    },
    clearChatId(state) {
      return {
        ...state,
        chatId: null,
      };
    },
    clearMessages(state) {
      return {
        ...state,
        messages: [],
      };
    },
    addMessage(state, action: PayloadAction<MessageType>) {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
    setMessages(state, action: PayloadAction<MessageType[]>) {
      return {
        ...state,
        messages: action.payload,
      };
    },
  },
});

export const {addMessage, clearChatId, clearMessages, setChatId, setMessages} =
  chatSlice.actions;
export default chatSlice;
