import {Button, Column, Row} from '$/src/components/global';
import Separator from '$/src/components/global/Separator';
import {Text} from '$/src/components/global/Themed';
import {a} from '#/lib/style/atoms';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import {useAppDispatch} from '#/hooks/store';
import React from 'react';

import TextInput from '$/src/components/global/TextInput';
import Animated, {RollInRight} from 'react-native-reanimated';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import {ButtonText} from '$/src/components/global/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useApi from '$/src/hooks/api';
import {
  validateEmail,
  validatePhoneNumber,
} from '$/src/lib/utils/input-validation';
import {useRouter} from 'expo-router';

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const {forgotPassword} = useApi().auth;
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState({login: false, google: false});

  const handleContinue = useCallback(async () => {
    const emailValidation = validateEmail(email);
    const phoneNumberValidation = validatePhoneNumber(email);

    if (emailValidation.error && phoneNumberValidation.error)
      return Alert.alert('Please enter a a valid email or password ');

    setLoading(prev => ({...prev, login: true}));
    // const success = await forgotPassword(email);
    setLoading(prev => ({...prev, login: false}));
    if (true)
      return router.navigate({pathname: '/verify-otp', params: {email}});
    // if (success) return navigation.navigate('VerifyOtp');
    // if (!success) setError(true);
  }, [email]);

  return (
    <KeyboardAvoidingView behavior="padding" style={[a.flex_1]}>
      <ScrollView
        style={{flexGrow: 1}}
        contentContainerStyle={[a.justify_center, a.h_full]}>
        <View style={[a.flex_1, a.w_85, a.self_center, a.pt_(150)]}>
          <View style={[a.mx_auto]}></View>

          <Column style={[[a.mt_(60)]]}>
            <Text style={[a.text_lg, a.font_semi_bold]}>Forgot Password</Text>

            <Text style={[a.font_normal, a.mt_md, a.text_(colors.dark_3)]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, perferendis.
            </Text>

            <TextInput
              label="Email Address"
              labelStyle={[a.text_(colors.dark_3)]}
              containerStyle={[a.mt_4xl]}
              value={email}
              onChangeText={text => {
                setError(false);
                setEmail(text);
              }}
              textContentType="emailAddress"
              placeholder="briggskvngzz@gmail.com"
              style={[a.mt_sm]}
            />
          </Column>

          {error && (
            <Text style={[a.self_center, a.text_(colors.error_3)]}>
              Please enter a correct email or phoneNumber
            </Text>
          )}

          <Button
            loading={loading.login}
            onPress={handleContinue}
            variant="solid"
            color="primary"
            shape="round"
            style={[a.mt_5xl]}>
            <ButtonText>Continue</ButtonText>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
