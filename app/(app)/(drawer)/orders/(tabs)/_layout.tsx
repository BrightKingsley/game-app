import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import {ParamListBase, TabNavigationState} from '@react-navigation/native';
import {Stack, withLayoutContext} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Text} from '$/src/components/global/Themed';
import {Container} from '$/src/components/utils';
import {a} from '$/src/lib/style/atoms';
;

const {Navigator} = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function OrdersTabLayout() {
  const safeInsets = useSafeAreaInsets();
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Orders',
          header: () => (
            <Container
              style={[
                a.h_(120),
                a.justify_end,
                a.bg_(colors.light_1),
                a.py_md,
                a.pt_(safeInsets.top),
              ]}>
              <Text family="Bold" style={[a.text_4xl]}>
                Orders
              </Text>
            </Container>
          ),
        }}
      />
      <MaterialTopTabs
        screenOptions={{
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontFamily: 'DMSans_700Bold',
            textTransform: 'lowercase',
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
          },
        }}>
        <MaterialTopTabs.Screen
          name="index"
          options={{
            title: 'Completed',
          }}
        />
        <MaterialTopTabs.Screen name="pending" options={{title: 'Pending'}} />
      </MaterialTopTabs>
    </>
  );
}
