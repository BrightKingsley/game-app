import {Stack} from 'expo-router';

import {Order} from '$/src/screens/Orders';

export default function OrderScreen() {
  return (
    <>
      <Stack.Screen options={{title: 'Order'}} />
      <Order />
    </>
  );
}
