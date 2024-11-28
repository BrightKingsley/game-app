import useAuthApi from './auth';
import useChatApi from './chat';
import useOrderApi from './order';
import useUsersApi from './users';

export default function useApi() {
  const auth = useAuthApi();
  const users = useUsersApi();
  const order = useOrderApi();
  const chat = useChatApi();

  return {
    auth,
    chat,
    order,
    users,
  };
}
