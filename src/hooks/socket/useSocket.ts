import {useChatSocket} from './chat';
import {useOrderSocket} from './order';

export default function useSocket() {
  const order = useOrderSocket();
  const chat = useChatSocket();

  return {
    chat,
    order,
  };
}
