import {Stack} from 'expo-router';
import React from 'react';

import {useThemeColor} from '$/src/hooks/theme';

export default function AuthLayout() {
  const backgroundThemeColor = useThemeColor('background');
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: backgroundThemeColor},
      }}>
      <Stack.Screen name="onboarding" options={{headerShown: false}} />
    </Stack>
  );
}
