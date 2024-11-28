import {useUser} from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useFocusEffect} from 'expo-router';
import {useCallback, useEffect} from 'react';
import {Platform, StatusBar, useWindowDimensions, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAppDispatch, useAppSelector} from '$/src/hooks/store';
import {a} from '$/src/lib/style/atoms';
;
import {hideIsland, showIsland} from '$/src/store/slices/island';

import {Button} from '../../global';
import {ButtonText} from '../../global/Button';
import Island from '../../global/Island';
import {createCustomBackdrop} from '../../global/modals/ModalBackdrop';
import {useModalControls} from '../../global/modals/ModalState';
import {Text} from '../../global/Themed';

export const snapPoints = ['95%'];
export const enablePanDownToClose = true;

export default function Wallet() {
  const {height: SCREEN_HEIGHT} = useWindowDimensions();
  const {openModal, closeModal} = useModalControls();
  const {balance} = useAppSelector(state => state.wallet);
  const {user} = useUser();

  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        if (Platform.OS === 'android') {
          dispatch(hideIsland());
        } else dispatch(showIsland());
      }, 500);
      return () => {
        dispatch(hideIsland());
      };
    }, []),
  );

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(showIsland());
  //   }, 500);
  // }, []);

  return (
    <>
      <Island style={[[Platform.OS === 'ios' && a.mt_(40)]]} />
      <SafeAreaView
        style={{
          paddingTop: StatusBar.currentHeight,
        }}>
        <ScrollView
          style={{
            width: '95%',
            alignSelf: 'center',
          }}>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 30}}>Hello, {user?.firstName}...</Text>
          </View> */}
          <View
            style={{
              backgroundColor: colors.yellow_1,
              width: '100%',
              borderRadius: 20,
              borderColor: colors.primary,
              borderStyle: 'solid',
              borderWidth: 1, // height: SCREEN_HEIGHT * 0.3,
              paddingVertical: 15,
              marginTop: 50,
            }}>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View>
                <Text style={[a.text_xs, a.text_(colors.dark_2)]}>
                  balance:
                </Text>
                <Text
                  family="Bold"
                  style={[
                    {
                      fontSize: 24,
                      fontWeight: 'bold',
                    },
                    a.text_(colors.dark_2),
                  ]}>
                  L${balance.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          <View style={[a.mt_2xl]}>
            <Button
              variant="solid"
              shape="round"
              color="primary"
              style={[a.py_lg]}
              onPress={() => {
                openModal('top-up', {
                  enablePanDownToClose: true,
                  backdropComponent: createCustomBackdrop(closeModal),
                });
              }}>
              <ButtonText style={[a.text_lg]}>Top up</ButtonText>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
