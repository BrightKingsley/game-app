import {socket} from '$/src/lib/utils/socket';
import {useUser} from '@clerk/clerk-expo';
import {useEffect} from 'react';
import {addMessage} from '$/src/store/slices/chat';
import {MessageType} from '$/src/components/feature/Chat/types';
import {useAppDispatch, useAppSelector} from '$/src/hooks/store';

export function ChatSocket() {
  const {user} = useUser();
  const {chatId} = useAppSelector(state => state.chat);

  useEffect(() => {
    socket.emit('join_room', chatId);
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;

    socket.on('incoming_message', (message: MessageType) => {
      dispatch(addMessage(message));
    });
  }, []);

  return null;
}
