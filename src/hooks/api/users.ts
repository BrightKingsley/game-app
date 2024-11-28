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

export default function useUsersApi() {
  const router = useRouter();
  const {signIn, setActive: setActiveIn, isLoaded} = useSignIn();
  const {signUp, setActive: setActiveUp} = useSignUp();
  const dispatch = useAppDispatch();
  const [[isLoading, session], setSession] = useStorageState('session');

  const {fetchData} = useRequest();

  const search = useCallback(
    async (
      {params}: {params: {username: string}},
      handleErrors?: (errors: ClerkAPIError[]) => void,
    ) => {
      try {
        const data = await fetchData<{
          message: string;
          users: User[];
        }>('get', `${apiRoutes.users.search.route}`, {}, {params});
        // console.log('DATA: ', data, data.users);
        return data.users;
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(
            `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
          );
        } else {
          console.error('Unexpected Error:', error);
        }
        return null;
      }
    },
    [],
  );

  const update = useCallback(
    async (
      {
        firstName,
        lastName,
        phoneNumber,
      }: {firstName: string; lastName: string; phoneNumber: string},
      handleErrors?: (errors: ClerkAPIError[]) => void,
    ) => {
      try {
        const data = await fetchData<{
          message: string;
          users: User[];
        }>('post', `${apiRoutes.users.update.route}`, {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
        });
        // console.log('DATA: ', data, data.users);
        return data.users;
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(
            `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
          );
        } else {
          console.error('Unexpected Error:', error);
        }
        return null;
      }
    },
    [],
  );

  return {
    search,
    update,
  };
}
