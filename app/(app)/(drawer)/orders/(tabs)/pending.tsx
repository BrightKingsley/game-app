import {Stack} from 'expo-router';

import {ModalContainer} from '$/src/components/global/modals/Modal';
import {ModalProvider} from '$/src/components/global/modals/ModalState';
import Orders from '$/src/screens/Orders';

export default function OrdersPending() {
  return (
    <ModalProvider>
      <Stack.Screen
        options={{
          title: 'Pending',
          headerShown: true,
          headerLargeTitle: true,
        }}
      />
      <Orders status="pending" />
      <ModalContainer />
    </ModalProvider>
  );
}
