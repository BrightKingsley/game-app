import {Stack} from 'expo-router';

import {useThemeColor} from '$/src/hooks/theme';

export default function Layout() {
  const themeColor = useThemeColor('background');
  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}>
        <Stack.Screen
          name="(drawer)"
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: themeColor,
            },
            contentStyle: {
              backgroundColor: themeColor,
            },
          }}
        />
        <Stack.Screen
          name="chats"
          options={{headerShown: false, presentation: 'modal'}}
        />
        <Stack.Screen
          name="wallet"
          options={{headerShown: false, presentation: 'modal'}}
        />
      </Stack>
    </>
  );
}
