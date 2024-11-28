// import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

import {ApiError} from '#/lib/utils/api/axios';
import apiRoutes from '#/lib/utils/api/routes';
// import {NavigationProps} from '#/navigation/types';
import useRequest from './useRequest';
import {useAppDispatch, useAppSelector} from '../store';
import {Alert} from 'react-native';
import {MessageType} from '$/src/components/feature/Chat/types';
import {addMessage, setMessages} from '$/src/store/slices/chat';
import {useUser} from '@clerk/clerk-expo';

// import {useAppDispatch} from '../store';

export default function useChatApi() {
  // const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const {fetchData} = useRequest();
  const {user} = useUser();
  const {chatId} = useAppSelector(state => state.chat);

  const getMessages = useCallback(async (chatId: string) => {
    try {
      const data = await fetchData<{messages: any[]}>(
        'get',
        `${apiRoutes.chat['get-messages'].route_(chatId)}`,
      );
      dispatch(setMessages(data.messages));
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

  const sendMessage = useCallback(async (text: string) => {
    if (!(user && chatId && text)) return;
    try {
      const message: MessageType = {
        id: Date.now().toString(),
        sender: user?.id,
        content: text,
      };
      dispatch(addMessage(message));
      const data = await fetchData<{chat: any}>(
        'post',
        `${apiRoutes.chat['send-message'].route}`,
        {content: message.content, chatId},
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

  return {
    sendMessage,
    getMessages,
  };
}
