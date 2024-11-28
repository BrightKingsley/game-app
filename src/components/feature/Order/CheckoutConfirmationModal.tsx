// import {useModalControls} from '#/state/modals';
// import {NigeriaIcon, UnitedKingdomIcon} from '#/lib/icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as React from 'react';
import {ScrollView, View} from 'react-native';

import {a} from '#/lib/style/atoms';
import {useTheme} from '#/lib/ui/theme';
;

import {Button} from '../../global';
import {ButtonText} from '../../global/Button';
import {useModalControls} from '../../global/modals/ModalState';
import {Text} from '../../global/Themed';

// NOTE: snapPoints holds the default height point for modal
export const snapPoints = ['70%'];

export const enablePanDownToClose = false;

export function Component() {
  // const onPressBuyService = React.useCallback(() => {
  //   //TODO logic to buy currency
  // }, []);
  const {closeModal} = useModalControls();

  const handleProceed = () => {
  };

  return (
    <View style={[]}>
      <ScrollView style={[a.h_full]}>
        <View
          style={[
            a.flex_row,
            a.items_end,
            a.justify_between,
            a.w_60,
            a.self_center,
          ]}>
          <View>
            <Text>From</Text>
            <View style={[a.flex_row, a.items_center, a.mt_sm]}></View>
          </View>

          <Ionicons
            name="arrow-forward-outline"
            style={[a.text_(colors.primary), a.text_2xl, a.mb_sm]}
          />
          <View>
            <Text>To</Text>
            <View style={[a.flex_row, a.items_center, a.mt_sm]}>
              {/* <NigeriaIcon /> */}
              <Text>NGN</Text>
              <Text style={[a.ml_sm]}>{'NGN'}</Text>
            </View>
          </View>
        </View>
        <Button
          onPress={handleProceed}
          size="large"
          variant="solid"
          color="primary"
          shape="square"
          label="confirm"
          loading={true}
          style={[a.w_full, a.mt_2xl]}>
          <ButtonText>Confirm</ButtonText>
        </Button>
      </ScrollView>
    </View>
  );
}
