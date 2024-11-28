import {useUser} from '@clerk/clerk-expo';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {LinearGradient} from 'expo-linear-gradient';
import {Drawer} from 'expo-router/drawer';
import {Image, Pressable} from 'react-native';

import {Column, Row} from '$/src/components/global';
import {Text, View} from '$/src/components/global/Themed';
import {usePalette, useThemeColor} from '$/src/hooks/theme';
import {a} from '$/src/lib/style/atoms';
export default function TabLayout() {
  const backgroundThemeColor = useThemeColor('background');
  const textThemeColor = useThemeColor('text');

  return (
    <>
      <Drawer
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          sceneStyle: {
            backgroundColor: 'red',
          },
          headerStyle: {
            backgroundColor: backgroundThemeColor,
          },
          headerTintColor: textThemeColor,
          drawerContentStyle: {
            borderRadius: 50,
          },
          drawerContentContainerStyle: {
            borderRadius: 50,
          },
          drawerStyle: {
            borderBottomRightRadius: 40,
          },
          drawerHideStatusBarOnOpen: true,
        }}>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'overview',
          }}
        />
        <Drawer.Screen
          name="orders" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'User',
            title: 'overview',
          }}
        />
      </Drawer>
    </>
  );
}

function DrawerContent(props: DrawerContentComponentProps) {
  const {user} = useUser();
  const backgroundThemeColor = useThemeColor('background');
  const colors = usePalette();
  return (
    <LinearGradient
      colors={[
        colors.primary,
        colors.primary,
        backgroundThemeColor,
        backgroundThemeColor,
      ]}
      style={[a.flex_1, a.rounded_br_xl]}>
      <DrawerContentScrollView
        style={[a.flex_1]}
        contentContainerStyle={[
          a.flex_1,
          {
            paddingTop: 0,
            paddingBottom: 0,
            paddingStart: 0,
            paddingEnd: 0,
          },
        ]}>
        <Pressable
          onPress={() => props.navigation.navigate('account')}
          style={[]}>
          <Row style={[a.h_(250), a.bg_(colors.primary), a.p_lg]}>
            <Row style={[a.items_center, a.self_end]}>
              <Image
                source={{uri: user?.imageUrl}}
                style={{width: 50, height: 50, borderRadius: 25}}
              />
              <Column style={[a.ml_sm]}>
                <Text family="Bold">{user?.fullName}</Text>
                <Text>{user?.emailAddresses[0].emailAddress}</Text>
                <Row></Row>
              </Column>
            </Row>
          </Row>
        </Pressable>
        <View style={[a.flex_1, a.w_full]}></View>
        <DrawerItem
          label={'New'}
          onPress={() => console.log('DRAWER)ITEM_PRESSED')}
        />
      </DrawerContentScrollView>
    </LinearGradient>
  );
}
