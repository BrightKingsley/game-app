import {ApiError} from '#/lib/utils/api/axios';
import apiRoutes from '#/lib/utils/api/routes';
import {setAuthLoading, setUser} from '#/store/slices/auth';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {useAppDispatch} from '../store';
import {addItemToAsyncStore} from '$/src/lib/utils/helpers/async-store';
import {useStorageState} from '../useStorageState';
import {useRouter} from 'expo-router';
import {
  isClerkAPIResponseError,
  useOAuth,
  useSignIn,
  useSignUp,
} from '@clerk/clerk-expo';
import {ClerkAPIError} from '@clerk/types';
import useRequest from './useRequest';
import * as Linking from 'expo-linking';

export default function useAuthApi() {
  const router = useRouter();

  const {signIn, setActive: setActiveIn, isLoaded} = useSignIn();
  const {signUp, setActive: setActiveUp} = useSignUp();
  const {startOAuthFlow: startGoogleOAuthFlow} = useOAuth({
    strategy: 'oauth_google',
    redirectUrl: Linking.createURL('/(app)/(drawer)/'),
  });

  const {startOAuthFlow: startAppleOAuthFlow} = useOAuth({
    strategy: 'oauth_apple',
    redirectUrl: Linking.createURL('/(app)/(drawer)/'),
  });

  const dispatch = useAppDispatch();
  const [[isLoading, session], setSession] = useStorageState('session');

  const {fetchData} = useRequest();

  const google = useCallback(async () => {
    try {
      dispatch(setAuthLoading(true));
      const {createdSessionId, setActive, signUp, signIn} =
        await startGoogleOAuthFlow();
      if (createdSessionId) {
        setActive!({session: createdSessionId});
        createUser({
          email: signUp?.emailAddress || '',
          firstName: signUp?.firstName || '',
          lastName: signUp?.lastName || '',
          uid: signUp?.createdUserId || '',
        });
      } else {
      }
    } catch (err) {
      console.error('GOOGLE_SIGN_IN: ', err);
    } finally {
      dispatch(setAuthLoading(false));
    }
  }, []);

  const apple = useCallback(async () => {
    try {
      dispatch(setAuthLoading(true));
      const {createdSessionId, setActive, signUp, signIn} =
        await startAppleOAuthFlow();
      if (createdSessionId) {
        setActive!({session: createdSessionId});
        createUser({
          email: signUp?.emailAddress || '',
          firstName: signUp?.firstName || '',
          lastName: signUp?.lastName || '',
          uid: signUp?.createdUserId || '',
        });
      } else {
      }
    } catch (err) {
      console.error('APPLE_SIGN_IN: ', err);
    } finally {
      dispatch(setAuthLoading(false));
    }
  }, []);

  const email = useCallback(
    async (
      {email, password}: {email: string; password: string},
      handleErrors: (errors: ClerkAPIError[]) => void,
      remember?: boolean,
    ) => {
      if (!isLoaded) {
        return false;
      }

      // Start the sign-up process using the info the user provided
      try {
        const signInAttempt = await signIn.create({
          identifier: email,
          password,
        });

        if (signInAttempt.status === 'complete') {
          await setActiveIn({session: signInAttempt.createdSessionId});
          router.replace('/(app)/(drawer)');
          if (remember) addItemToAsyncStore('auth', {email, password});
          return true;
        } else {
          // If the status is not complete, check why. User may need to
          // complete further steps.
          console.error(JSON.stringify(signInAttempt, null, 2));
          return false;
        }
      } catch (err) {
        if (isClerkAPIResponseError(err)) {
          handleErrors(err.errors);
        }
        console.error(JSON.stringify(err, null, 2));
        return false;
      }
    },
    [],
  );

  const login = useCallback(
    async (
      {email, password}: {email: string; password: string},
      handleErrors: (errors: ClerkAPIError[]) => void,
      remember?: boolean,
    ) => {
      try {
        const signInAttempt = await signIn?.create({
          identifier: email,
          password,
        });

        if (signInAttempt?.status === 'complete' && setActiveIn) {
          await setActiveIn({session: signInAttempt.createdSessionId});
          router.replace('/');
          return true;
        } else {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.error(JSON.stringify(signInAttempt, null, 2));
          return false;
        }
      } catch (err: any) {
        if (isClerkAPIResponseError(err)) {
          handleErrors(err.errors);
        }
        console.error(JSON.stringify(err, null, 2));
        return false;
      }

      // try {
      // const data = await fetchData<{
      //   message: string;
      //   user: User;
      //   token: string;
      // }>('post', `${apiRoutes.auth.login.route}`, {email, password});
      // console.log({data});
      // dispatch(
      //   setUser({
      //     isAuthenticated: true,
      //     user: data.user,
      //     token: data.token,
      //     callback() {
      //       setSession('xxx');
      //       router.replace('/home');
      //     },
      //   }),
      // );
      //   if (remember) addItemFromAsyncStore('auth', {email, password});
      //   return true;
      // } catch (error) {
      //   if (error instanceof ApiError) {
      //     console.error(
      //       `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
      //     );
      //   } else {
      //     console.error('Unexpected Error:', error);
      //   }
      //   return false;
      // }
    },
    [],
  );

  const credentials = useCallback(
    async (
      {
        email,
        firstName,
        lastName,
        password,
      }: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      },
      handleErrors: (errors: Partial<ClerkAPIError>[]) => void,
    ) => {
      if (!isLoaded) {
        return false;
      }

      const userWithEmailExists = await doesUserWithEmailExist(email);
      if (userWithEmailExists) {
        handleErrors([
          {
            message:
              'A user with this email already exists, please proceed to login',
            longMessage:
              'A user with this email already exists, please proceed to login',
          },
        ]);
        return false;
      }

      if (userWithEmailExists !== false) return false;

      // Start the sign-up process using the info the user provided
      try {
        await signUp?.create({
          firstName,
          lastName,
          emailAddress: email,
          password,
        });

        signUp?.prepareEmailAddressVerification({
          // redirectUrl: Linking.createURL('/account'),
          strategy: 'email_code',
        });

        // Display the second form to collect the verification code
        // setPendingVerification(true);
        router.push('/(auth)/verify-signup');
        return true;
      } catch (err) {
        if (isClerkAPIResponseError(err)) {
          handleErrors(err.errors);
        }
        console.error(JSON.stringify(err, null, 2));
        return false;
      }
    },
    [],
  );

  const verifyUser = async (code: string) => {
    if (!isLoaded || code.length < 6) {
      return;
    }

    // Use the code the user provided to attempt verification
    try {
      const signUpAttempt = await signUp?.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt?.status === 'complete') {
        await setActiveUp?.({session: signUpAttempt.createdSessionId});
        await createUser({
          email: signUp?.emailAddress || '',
          firstName: signUp?.firstName || '',
          lastName: signUp?.lastName || '',
          uid: signUp?.createdUserId || '',
        });
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

  const doesUserWithEmailExist = useCallback(async (email: string) => {
    try {
      const data = await fetchData<{
        message: string;
        emailExists: boolean;
      }>('post', `${apiRoutes.auth['check-email-exist'].route}`, {email});
      return data?.emailExists;
    } catch (error) {
      console.error('doesUserWithEmailExist: ', error);
      return null;
    }
  }, []);

  const createUser = useCallback(
    async ({
      email,
      firstName,
      lastName,
      uid,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      uid: string;
    }) => {
      try {
        if (!(firstName && lastName && uid)) return;
        const data = await fetchData<{
          message: string;
        }>('post', `${apiRoutes.auth['create-user'].route}`, {
          email,
          firstName,
          lastName,
          uid,
        });
        await addItemToAsyncStore('onboarded', true);
      } catch (error) {
        console.error('CREATE_USER:', error);
      }
    },
    [],
  );

  const signup = useCallback(
    async (
      {
        email,
        firstname,
        lastname,
        password,
        phoneNumber,
        anniversary,
        dateOfBirth,
        gender,
        referee,
      }: {
        email: string;
        password: string;
        firstname: string;
        lastname: string;
        phoneNumber: string;
        gender: string;
        dateOfBirth: string;
        anniversary: string;
        referee: string;
      },
      handleErrors: (errors: ClerkAPIError[]) => void,
    ) => {
      try {
        const signUpAttempt = await signUp?.create({
          // firstName: firstname,
          // lastName: lastname,
          emailAddress: email,
          password: '@Test3244',
          username: 'BriggSKvngZ',
        });

        if (signUpAttempt?.status === 'complete' && setActiveUp) {
          await setActiveUp({session: signUpAttempt.createdSessionId});
          // router.replace('/(drawer)/index');
          return true;
        } else {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.error(JSON.stringify(signUpAttempt, null, 2));
          return false;
        }
      } catch (err: any) {
        if (isClerkAPIResponseError(err)) {
          handleErrors(err.errors);
        }
        console.error(JSON.stringify(err, null, 2));
        return false;
      }

      // try {
      //   const data = await fetchData('post', `${apiRoutes.auth.signup.route}`, {
      //     email,
      //     password,
      //     firstname,
      //     lastname,
      //     phoneNumber,
      //     anniversary,
      //     dateOfBirth,
      //     gender,
      //     referee,
      //   });
      //   console.log({data});
      // } catch (error) {
      //   if (error instanceof ApiError) {
      //     console.error(
      //       `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
      //     );
      //   } else {
      //     console.error('Unexpected Error:', error);
      //   }
      // }
    },
    [],
  );

  const forgotPassword = useCallback(async (email: string) => {
    try {
      const data = await fetchData(
        'post',
        `${apiRoutes.auth['forgot-password'].route}`,
        {email},
      );
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
        );
      } else {
        console.error('Unexpected Error:', error);
      }
      return false;
    }
  }, []);

  const verifyResetOtp = async ({email, otp}: {otp: string; email: string}) => {
    try {
      const data = await fetchData(
        'post',
        `${apiRoutes.auth['verify-reset-otp'].route}`,
        {otp, email},
      );
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
        );
      } else {
        console.error('Unexpected Error:', error);
      }
      return false;
    }
  };

  const createNewPassword = useCallback(
    async ({email, password}: {email: string; password: string}) => {
      try {
        const data = await fetchData(
          'post',
          `${apiRoutes.auth['reset-password'].route}`,
          {password, email},
        );
        return true;
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(
            `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
          );
        } else {
          console.error('Unexpected Error:', error);
        }
        return false;
      }
    },
    [],
  );

  return {
    login: {
      google,
      apple,
      email,
    },
    signup: {
      credentials,
      google,
      apple,
      verifyUser,
    },
    forgotPassword,
    verifyResetOtp,
    createNewPassword,
  };
}
