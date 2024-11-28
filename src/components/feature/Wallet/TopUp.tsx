import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import React, {useState} from 'react';
import {Platform, TextInput, View} from 'react-native';

import {a} from '$/src/lib/style/atoms';
;

import {Button} from '../../global';
import {ButtonText} from '../../global/Button';
import {createCustomBackdrop} from '../../global/modals/ModalBackdrop';
import {useModalControls} from '../../global/modals/ModalState';
import {Text} from '../../global/Themed';

export const snapPoints = Platform.OS === 'ios' ? ['35%'] : ['50%', '80%'];
export const enablePanDownToClose = true;
export const backdropComponent = createCustomBackdrop();

export default function TopUp() {
  const [amount, setAmount] = useState('');
  const {closeModal} = useModalControls();

  return (
    <>
      <View
        style={{
          width: '70%',
          alignSelf: 'center',
          paddingTop: 40,
        }}>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            height: 70,
            borderRadius: 20,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            borderColor: colors.primary,
            // borderWidth: 2,
          }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: 'gray',
            }}>
            $
          </Text>
          <BottomSheetTextInput
            value={amount}
            placeholder="0.00"
            keyboardType="number-pad"
            cursorColor={colors.primary}
            // selection={{
            //   start:
            //     parseFloat(amount)?.toFixed(2)?.length > 2
            //       ? amount.length.toFixed(2) - 4
            //       : 0,
            //   end:
            //     parseFloat(amount)?.toFixed(2)?.length > 2
            //       ? amount.length.toFixed(2) - 4
            //       : 0,
            // }}

            onChangeText={value => {
              // const parsedQty = Number.parseFloat(value); // Convert input value to a Float
              // if (Number.isNaN(parsedQty)) {
              //   setAmount(0); // In case user input a characters instead of a number
              // } else if (parsedQty >= 11.99) {
              //   setAmount(11.99); // Set the value to 11.99 if the user input more than 11.99
              // } else if (parsedQty < 0) {
              //   setAmount(0); // Set the value to 0 if the user input is below 0. You can customize this part if you want a minimum value
              // } else {
              //   setAmount(parsedQty);
              // }
              setAmount(value);
            }}
            // autoFocus
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              height: '100%',
              fontFamily: 'DMSans_700Bold',
            }}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Button
            color="primary"
            shape="round"
            variant="solid"
            onPress={() => {
              // const topUpAmount = parseFloat(amount);
              // topUpBalance(parseFloat(topUpAmount));
              closeModal();
            }}
            style={{paddingVertical: 8}}>
            <ButtonText style={[a.text_2xl]}>Confirm</ButtonText>
          </Button>
        </View>
      </View>
    </>
  );
}
