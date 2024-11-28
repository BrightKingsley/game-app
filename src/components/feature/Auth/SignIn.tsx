import {Button, Column, Row} from '$/src/components/global';
import Separator from '$/src/components/global/Separator';
import {Text} from '$/src/components/global/Themed';
import {a} from '#/lib/style/atoms';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import {useAppDispatch} from '#/hooks/store';
import React from 'react';

import TextInput from '$/src/components/global/TextInput';
import {ButtonText} from '$/src/components/global/Button';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import useApi from '$/src/hooks/api';
import {hexWithOpacity} from '#/lib/ui/helpers';
import t from '../../../../locales/translate';
import {IS_RTL} from '$/locales';
import {
  validateEmail,
  validatePassword,
} from '$/src/lib/utils/input-validation';
import {FormField} from './SignUp/state';
import {getItemFromAsyncStore} from '$/src/lib/utils/helpers/async-store';
import {useRouter} from 'expo-router';
import {ClerkAPIError} from '@clerk/types';
import {AppleLogo, GoogleLogo} from '$/src/assets/icons';
import {useWarmUpBrowser} from '$/src/hooks/useWarmupBrowser';
import {useOAuth, useSignIn} from '@clerk/clerk-expo';
import KeyboardAvoidingComponent from '../../global/KeyboardAvoidingComponent';
import {usePalette, useThemeColor} from '$/src/hooks/theme';

export default function SignIn() {
  const router = useRouter();
  const {login} = useApi().auth;

  const {isLoaded, setActive, signIn} = useSignIn();
  const backgroundThemeColor = useThemeColor('background');
  const colors = usePalette();

  const [email, setEmail] = useState<FormField>({error: '', value: ''});
  const [password, setPassword] = useState<FormField>({error: '', value: ''});
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const handleErrors = (errors: ClerkAPIError[]) => {
    setErrors(errors);
  };

  const handleSignUpPress = useCallback(() => {
    router.push('/(auth)/sign-up');
  }, []);

  const handleForgotPasswordPress = useCallback(() => {
    router.push('/(auth)/forgot-password');
  }, []);

  const handleRememberMePress = useCallback(() => {
    setRememberMe(prev => !prev);
  }, []);

  const handleGooglePress = useCallback(async () => {
    try {
      await login.google();
    } catch (err) {}
  }, []);

  const handleApplePress = useCallback(async () => {
    try {
      await login.google();
    } catch (err) {}
  }, []);

  const handleSignInPress = useCallback(async () => {
    const emailValidation = validateEmail(email.value);

    setEmail(emailValidation);

    if (emailValidation.error) return;

    setLoading(true);
    const success = await login.email(
      {email: email.value, password: password.value},
      handleErrors,
      rememberMe,
    );
    if (!success) setError(true);
    setLoading(false);
  }, [email.value, password.value]);

  useEffect(() => {
    (async () => {
      const item = await getItemFromAsyncStore('auth');
      if (!item) return;
      setEmail({value: item.email, error: ''});
      setPassword({value: item.password, error: ''});
    })();
  }, []);

  useWarmUpBrowser();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[a.flex_1, a.bg_(backgroundThemeColor)]}>
      <ScrollView style={{flexGrow: 1}}>
        <View style={[a.flex_1]}>
          <View style={[a.h_(189), a.relative]}>
            <View style={[a.absolute, a.bottom_(0), a.p_(24), a.z_20]}>
              <Text
                family="Bold"
                style={[a.text_2xl, a.text_left, a.leading_snug, a.font_bold]}>
                {t('welcome')}
              </Text>
              <Row style={[a.gap_sm, a.mt_2xs]}>
                <Text style={[a.font_normal]}>{t('signupPrompt')}</Text>
                <TouchableOpacity onPress={handleSignUpPress} style={[]}>
                  <Text
                    style={[
                      a.text_(colors.primary),
                      a.underline,
                      a.solid,
                      a.decoration_tint_(colors.primary),
                    ]}>
                    {t('signup')}
                  </Text>
                </TouchableOpacity>
              </Row>
            </View>
          </View>
          <View style={[, a.flex_1, a.py_md]}>
            <Column style={[a.w_90, a.self_center]}>
              <TextInput
                label={t('email')}
                labelStyle={[a.text_(colors.tint)]}
                containerStyle={[a.mt_2xl]}
                inputStyle={[]}
                value={email.value}
                errorText={email.error}
                onChangeText={text => {
                  setError(false);
                  setErrors([]);
                  setEmail(prev => ({value: text, error: ''}));
                }}
                textContentType="emailAddress"
                keyboardType="email-address"
                style={[a.mt_sm, a.rounded_full]}
              />

              <TextInput
                label={t('enter_password')}
                labelStyle={[a.text_(colors.tint)]}
                containerStyle={[a.mt_2xl]}
                value={password.value}
                onChangeText={text => {
                  setError(false);
                  setErrors([]);
                  setPassword(prev => ({value: text, error: ''}));
                }}
                textContentType="password"
                style={[a.mt_sm, a.rounded_full]}
              />

              <TouchableWithoutFeedback onPress={handleRememberMePress}>
                <Row style={[a.items_center, a.mt_xl, a.gap_md]}>
                  <View
                    style={[
                      a.w_(20),
                      a.h_(20),
                      a.rounded_full,
                      a.border_(1),
                      a.border_tint(colors.tint),
                      a.p_xs,
                    ]}>
                    <View
                      style={[
                        rememberMe && [
                          a.bg_(colors.tint),
                          a.w_full,
                          a.h_full,
                          a.rounded_full,
                        ],
                      ]}
                    />
                  </View>
                  <Text>{t('remember_me')}</Text>
                </Row>
              </TouchableWithoutFeedback>

              {error && (
                <Text
                  style={[
                    a.self_center,
                    a.mt_sm,
                    a.text_(hexWithOpacity(colors.error, 0.5)),
                  ]}>
                  {t('please_enter_correct_details')}
                </Text>
              )}

              <Column>
                {errors.map(err => (
                  <Text
                    key={err.code}
                    style={[
                      a.self_center,
                      a.mt_sm,
                      a.text_(hexWithOpacity(colors.error, 0.5)),
                    ]}>
                    {err.longMessage}
                  </Text>
                ))}
              </Column>

              <Button
                loading={loading}
                disabled={loading}
                onPress={handleSignInPress}
                variant="solid"
                shape="round"
                color="primary"
                style={[a.mt_2xl]}>
                <ButtonText>{t('login')}</ButtonText>
              </Button>

              <Column style={[a.mt_md]}>
                <Button
                  onPress={handleForgotPasswordPress}
                  variant="ghost"
                  shape="round"
                  color="primary">
                  <ButtonText style={[a.text_(colors.primary)]}>
                    {t('forgot_password')}
                  </ButtonText>
                </Button>
              </Column>

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
                onPress={handleApplePress}>
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
                onPress={handleGooglePress}>
                <Row style={[a.justify_center, a.items_center]}>
                  <View style={[a.absolute, a.left_(8)]}>
                    <GoogleLogo />
                  </View>
                  <ButtonText>Continue in with Google</ButtonText>
                </Row>
              </Button>
            </Column>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
