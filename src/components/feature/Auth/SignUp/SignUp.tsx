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
import {
  AppleLogo,
  GoogleLogo,
  MarketIcon,
  MarketIconOutline,
} from '$/src/assets/icons';
import {Container} from '$/src/components/utils';
import BackButton from '$/src/components/global/BackButton';
import {usePalette} from '$/src/hooks/theme';

const DATA = [StepOne, StepTwo];

const pages = IS_RTL ? DATA : DATA;

export default function SignUp() {
  const colors = usePalette();

  const [email, setEmail] = useState<FormField>({error: '', value: ''});
  const [firstName, setFirstName] = useState<FormField>({error: '', value: ''});
  const [lastName, setLastName] = useState<FormField>({error: '', value: ''});
  const [password, setPassword] = useState<FormField>({error: '', value: ''});
  const [retypePassword, setRetypePassword] = useState<FormField>({
    error: '',
    value: '',
  });
  const passwordCorrect =
    retypePassword.value !== '' && retypePassword.value === password.value;

  const [pendingVerification, setPendingVerification] = useState(false);

  const {signUp, isLoaded, setActive} = useSignUp();

  const router = useRouter();

  useWarmUpBrowser();
  const {startOAuthFlow: startGoogleOAuthFlow} = useOAuth({
    strategy: 'oauth_google',
    redirectUrl: Linking.createURL('/account'),
  });

  const {startOAuthFlow: startAppleOAuthFlow} = useOAuth({
    strategy: 'oauth_apple',
    redirectUrl: Linking.createURL('/account'),
  });

  const handlePressSignUp = useCallback(async () => {
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
    //   // setPendingVerification(true);
    //   router.replace('/(auth)/verify-otp');
    // } catch (err) {
    //   console.error(JSON.stringify(err, null, 2));
    // }
    router.push('/sign-up-credentials');
  }, [firstName.value, lastName.value, email.value, password.value]);

  // Handle the submission of the verification form

  const onPressGoogle = useCallback(async () => {
    try {
      const {createdSessionId, setActive, signUp, signIn} =
        await startGoogleOAuthFlow();
      if (createdSessionId) {
        setActive!({session: createdSessionId});
      } else {
      }
    } catch (err) {}
  }, []);

  const onPressApple = useCallback(async () => {
    try {
      const {createdSessionId, setActive, signUp, signIn, authSessionResult} =
        await startAppleOAuthFlow();
      if (createdSessionId) {
        setActive!({session: createdSessionId});
      } else {
      }
    } catch (err) {}
  }, []);

  const handleLoginPress = useCallback(() => {
    router.push('/sign-in');
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          title: '',
          headerLeft: props => <BackButton {...props} />,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[a.flex_1]}>
        <ScrollView style={[{flexGrow: 1}]} contentContainerStyle={[a.py_5xl]}>
          <Container>
            <View style={[a.h_(189), a.relative]}>
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
                        a.text_(colors.primary),
                        a.underline,
                        a.solid,
                        a.decoration_tint_(colors.primary),
                      ]}>
                      {t('login')}
                    </Text>
                  </TouchableOpacity>
                </Row>
              </Column>
            </View>

            <Button
              style={[a.mt_xl]}
              shape="round"
              color="primary"
              variant="solid"
              onPress={handlePressSignUp}>
              <ButtonText>Create Account</ButtonText>
            </Button>

            <Row style={[a.items_center, a.my_4xl]}>
              <Separator height={1} style={[a.flex_1, a.bg_('lightgrey')]} />
              <Text style={[a.mx_xl, a.text_('grey')]}>OR</Text>
              <Separator height={1} style={[a.flex_1, a.bg_('lightgrey')]} />
            </Row>

            <Button
              shape="round"
              color="gray"
              variant="outline"
              style={[a.relative, a.border_tint('lightgrey')]}
              onPress={onPressApple}>
              <Row style={[a.justify_center, a.items_center]}>
                <View style={[a.absolute, a.left_(8)]}>
                  <AppleLogo />
                </View>
                <ButtonText>Continue in with Apple</ButtonText>
              </Row>
            </Button>
            <Button
              shape="round"
              color="gray"
              variant="outline"
              style={[a.relative, a.mt_2xl, a.border_tint('lightgrey')]}
              onPress={onPressGoogle}>
              <Row style={[a.justify_center, a.items_center]}>
                <View style={[a.absolute, a.left_(8)]}>
                  <GoogleLogo />
                </View>
                <ButtonText>Continue in with Google</ButtonText>
              </Row>
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
