import {useLocalSearchParams, useRouter} from 'expo-router';
import {useEffect, useState} from 'react';
import React from 'react';
import {KeyboardAvoidingView, View} from 'react-native';

import {a} from '#/lib/style/atoms';

import {Column} from '$/src/components/global';
import DialPad from '$/src/components/global/DialPad/DialPad';
import {Text} from '$/src/components/global/Themed';
import useApi from '$/src/hooks/api';

export default function VerifyOtp() {
  const router = useRouter();
  const params = useLocalSearchParams<{email: string}>();

  const {verifyResetOtp} = useApi().auth;

  const [error, setError] = useState(false);
  const [, setLoading] = useState({login: false, google: false});

  const [input, setInput] = React.useState('');

  const handleNumberPress = (val: string) => {
    setError(false);
    setInput(val);
  };

  useEffect(() => {}, [input]);

  const handleCompleteOtp = () => {
    setTimeout(async () => {
      setLoading(prev => ({...prev, login: true}));
      const success = await verifyResetOtp({
        otp: input,
        email: params?.email ?? '',
      });
      setLoading(prev => ({...prev, login: false}));
      if (success)
        return router.replace({
          pathname: '/reset-password',
          params: {
            email: params?.email,
          },
        });
      setError(true);
    }, 500);
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    // Use the code the user provided to attempt verification
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({session: signUpAttempt.createdSessionId});
        router.replace('/(app)/(drawer)');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={[a.flex_1]}>
      <View
        style={[
          a.flex_1,
          a.w_85,
          a.self_center,
          a.justify_center,
          a.items_center,
          a.flex_row,
        ]}>
        <Column style={[a.justify_center]}>
          <View style={[a.mx_auto]}>
            <Text
              style={[
                a.text_(colors.dark),
                a.text_center,
                a.text_xl,
                a.font_bold,
              ]}>
              Verify via E-mail or SMS
            </Text>
            <Text style={[a.mt_md, a.text_(colors.dark_3), a.text_center]}>
              Lorem ipsum dolor sit amet, consectetur elit. Nulla aliquet
              facilisis magna sit amet
            </Text>
          </View>

          <View style={[a.mt_2xl]}>
            <DialPad
              handleCompleteOtp={handleCompleteOtp}
              pinLength={4}
              getValue={handleNumberPress}
            />
          </View>

          {error && (
            <Text style={[a.self_center, a.text_(colors.error_3)]}>
              Please enter a correct code
            </Text>
          )}
        </Column>
      </View>
    </KeyboardAvoidingView>
  );
}
