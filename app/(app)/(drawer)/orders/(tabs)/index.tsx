import {Stack} from 'expo-router';

import {ModalContainer} from '$/src/components/global/modals/Modal';
import {ModalProvider} from '$/src/components/global/modals/ModalState';
import Orders from '$/src/screens/Orders';

export default function OrdersCompleted() {
  return (
    <ModalProvider>
      <Stack.Screen
        options={{
          title: 'Completed',
          headerShown: true,
          headerLargeTitle: true,
        }}
      />
      <Orders status="completed" />
      <ModalContainer />
    </ModalProvider>
  );
}
