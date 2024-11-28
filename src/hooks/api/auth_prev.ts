import {ApiError} from '#/lib/utils/api/axios';
import apiRoutes from '#/lib/utils/api/routes';
import {setUser} from '#/store/slices/auth';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {useAppDispatch} from '../store';
import {addItemToAsyncStore} from '$/src/lib/utils/helpers/async-store';
import {useStorageState} from '../useStorageState';
import {useRouter} from 'expo-router';
import {isClerkAPIResponseError, useSignIn, useSignUp} from '@clerk/clerk-expo';
import {ClerkAPIError} from '@clerk/types';
import useRequest from './useRequest';

export default function useAuthApi() {
  const router = useRouter();
  const {signIn, setActive: setActiveIn, isLoaded} = useSignIn();
  const {signUp, setActive: setActiveUp} = useSignUp();
  const dispatch = useAppDispatch();
  const [[isLoading, session], setSession] = useStorageState('session');

  const {fetchData} = useRequest();

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
      //   const data = await fetchData<{
      //     message: string;
      //     user: User;
      //     token: string;
      //   }>('post', `${apiRoutes.auth.login.route}`, {email, password});
      //   console.log({data});
      //   dispatch(
      //     setUser({
      //       isAuthenticated: true,
      //       user: data.user,
      //       token: data.token,
      //       callback() {
      //         setSession('xxx');
      //         router.replace('/home');
      //       },
      //     }),
      //   );
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
    login,
    signup,
    forgotPassword,
    verifyResetOtp,
    createNewPassword,
  };
}
