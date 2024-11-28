import {useEffect} from 'react';

import {socket} from '$/src/lib/utils/socket';
import {EventName} from '$/src/lib/utils/socket/socket';
import {useUser} from '@clerk/clerk-expo';
import {AlertSound} from '$/src/assets/audio';

export function useOrderSocket() {
  const {user} = useUser();

  useEffect(() => {
    if (!user) return;

    if (!socket.id) return;
    socket.emit<EventName>('update_rider_socket', {
      riderId: user?.id,
      socketId: socket?.id,
    });

    if (!socket.id) return;
    socket.emit<EventName>('update_passenger_socket', {
      passengerId: user?.id,
      socketId: socket?.id,
    });
  }, [socket.id, user?.id, user]);

  return null;
}
