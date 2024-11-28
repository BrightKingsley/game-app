import {
  Button,
  Column,
  Indicator,
  Row,
  Separator,
} from '$/src/components/global';
import {Text} from '$/src/components/global/Themed';
import {a} from '#/lib/style/atoms';

import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

import {ButtonText} from '$/src/components/global/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import {FormField, FormProvider, useFormContext} from './state';
import t from '$/locales/translate';

import {IS_RTL} from '$/locales';
import {StatusBar} from 'expo-status-bar';
import {Stack, useRouter} from 'expo-router';
import {useOAuth, useSignIn, useSignUp} from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import {useWarmUpBrowser} from '$/src/hooks/useWarmupBrowser';
import * as Linking from 'expo-linking';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextInput from '$/src/components/global/TextInput';
import {Container} from '$/src/components/utils';
import {FontAwesome} from '@expo/vector-icons';
import {HITSLOP_30} from '$/src/lib/constants';
import BackButton from '$/src/components/global/BackButton';
import useApi from '$/src/hooks/api/useApi';
import {ClerkAPIError} from '@clerk/types';
import {hexWithOpacity} from '$/src/lib/ui/helpers';

const DATA = [StepOne, StepTwo];

const pages = IS_RTL ? DATA : DATA;

export default function SignUpCredentials() {
  const [email, setEmail] = useState<FormField>({error: '', value: ''});
  const [firstName, setFirstName] = useState<FormField>({error: '', value: ''});
  const [lastName, setLastName] = useState<FormField>({error: '', value: ''});
  const [password, setPassword] = useState<FormField>({error: '', value: ''});
  const [retypePassword, setRetypePassword] = useState<FormField>({
    error: '',
    value: '',
  });
  const [errors, setErrors] = useState<Partial<ClerkAPIError>[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordCorrect =
    retypePassword.value !== '' && retypePassword.value === password.value;

  const {signup} = useApi().auth;

  const handleErrors = (errors: Partial<ClerkAPIError>[]) => {
    setErrors(errors);
  };

  const resetErrors = () => {
    setErrors([]);
    setError(false);
    setLoading(false);
  };

  const handleSignUpPress = useCallback(async () => {
    setLoading(true);
    const success = await signup.credentials(
      {
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
      },
      handleErrors,
    );

    if (!success) setError(true);
    setLoading(false);
    // if (!isLoaded) {
    //   return;
    // }

    // // Start the sign-up process using the info the user provided
    // try {
    //   console.log({emailAddress: email.value, password: password.value});
    //   await signUp.create({
    //     firstName: firstName.value,
    //     lastName: lastName.value,
    //     emailAddress: email.value,
    //     password: password.value,
    //   });

    //   signUp?.prepareEmailAddressVerification({
    //     // redirectUrl: Linking.createURL('/account'),
    //     strategy: 'email_code',
    //   });

    //   // Display the second form to collect the verification code
    //   router.push('/(auth)/verify-signup');
    // } catch (err) {
    //   console.error(JSON.stringify(err, null, 2));
    // }
  }, [firstName.value, lastName.value, email.value, password.value]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLargeTitleShadowVisible: true,
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            fontFamily: 'DMSans_400Regular',
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'DMSans_700Bold',
            fontWeight: 'bold',
          },
          title: 'Sign Up',
          headerBackTitleVisible: false,
          headerLeft: props => <BackButton {...props} />,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[a.flex_1, a.bg_(colors.light_1)]}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[{flexGrow: 1}]}
          contentContainerStyle={[a.py_5xl]}>
          <Container>
            {/* <View style={[a.h_(189), a.relative]}>
              <Column style={[a.absolute, a.bottom_(0), a.py_(24), a.z_20]}>
                <Text
                  family="Bold"
                  style={[
                    a.text_2xl,
                    a.text_left,
                    a.leading_snug,
                    a.font_bold,
                  ]}>
                  {t('signup')}
                </Text>
                <Row style={[a.gap_sm, a.mt_2xs]}>
                  <Text
                    style={[
                      a.font_normal,
                      a.text_('16'),
                      a.text_('#000000CC'),
                    ]}>
                    {t('loginPrompt')}
                  </Text>
                  <TouchableOpacity onPress={handleLoginPress} style={[]}>
                    <Text
                      style={[
                        a.text_(colors.yellow_2),
                        a.underline,
                        a.solid,
                        a.decoration_tint_(colors.yellow_2),
                      ]}>
                      {t('login')}
                    </Text>
                  </TouchableOpacity>
                </Row>
              </Column>
            </View> */}

            <TextInput
              value={firstName.value}
              errorText={firstName.error}
              onChangeText={text => {
                resetErrors();
                setFirstName({value: text, error: ''});
              }}
              label={t('firstname')}
              labelStyle={[a.text_(colors.dark_3)]}
              containerStyle={[]}
              textContentType="name"
              placeholder="Bright"
              style={[a.mt_sm]}
            />

            <TextInput
              value={lastName.value}
              errorText={lastName.error}
              onChangeText={text => {
                resetErrors();
                setLastName({value: text, error: ''});
              }}
              label={t('lastname')}
              labelStyle={[a.text_(colors.dark_3)]}
              containerStyle={[a.mt_2xl]}
              placeholder="Kingsley"
              textContentType="familyName"
              style={[a.mt_sm]}
            />

            <TextInput
              value={email.value}
              errorText={email.error}
              onChangeText={text => {
                resetErrors();
                setEmail({value: text, error: ''});
              }}
              label={t('email')}
              labelStyle={[a.text_(colors.dark_3)]}
              containerStyle={[a.mt_2xl]}
              placeholder="briggskvngzz@gmail.com"
              keyboardType="email-address"
              textContentType="emailAddress"
              style={[a.mt_sm]}
            />

            <TextInput
              value={password.value}
              errorText={password.error}
              onChangeText={text => {
                resetErrors();
                setPassword({value: text, error: ''});
              }}
              label={t('password')}
              labelStyle={[a.text_(colors.dark_3)]}
              containerStyle={[a.mt_2xl]}
              placeholder="******"
              textContentType="password"
              style={[a.mt_sm]}
            />

            <TextInput
              value={retypePassword.value}
              errorText={retypePassword.error}
              onChangeText={text => setRetypePassword({value: text, error: ''})}
              label={t('password_confirmation')}
              labelStyle={[a.text_(colors.dark_3)]}
              containerStyle={[a.mt_2xl]}
              placeholder="******"
              textContentType="password"
              style={[
                a.px_0,
                a.py_0,
                a.mt_sm,
                passwordCorrect && a.border_tint('lightgreen'),
              ]}
              inputStyle={[passwordCorrect && a.text_('lightgreen')]}
            />

            {/* {error && (
              <Text
                style={[
                  a.self_center,
                  a.mt_sm,
                  a.text_(hexWithOpacity(colors.error_3, 0.5)),
                ]}>
                {t('please_enter_correct_details')}
              </Text>
            )} */}

            <Column>
              {errors.map(err => (
                <Text
                  key={err.code}
                  style={[
                    a.self_center,
                    a.mt_sm,
                    a.text_(hexWithOpacity(colors.error_3, 0.5)),
                  ]}>
                  {err.longMessage}
                </Text>
              ))}
            </Column>

            <Button
              loading={loading}
              disabled={loading}
              style={[a.mt_xl]}
              shape="round"
              color="primary"
              variant="solid"
              onPress={handleSignUpPress}>
              <ButtonText>Sign Up</ButtonText>
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
