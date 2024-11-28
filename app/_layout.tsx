{
  /* <script src="http://192.168.0.197:8097"></script>; */
}
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...', 'Error: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //

import {ClerkProvider, useAuth} from '@clerk/clerk-expo';
import {Slot, useRouter, useSegments} from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useLoadedFonts from '#/hooks/useLoadedFonts';
import {a} from '#/lib/style/atoms';
import {ReduxProviders} from '#/store/provider';

import {LocalizationProvider} from '../locales/localizationContext';
import {Splash} from '../src/components/global';
import {hexWithOpacity} from '../src/lib/ui/helpers';
import {RouteTracker, SocketContainer} from '$/src/components/utils';
import {ModalProvider} from '$/src/components/global/modals/ModalState';

import * as Sentry from '@sentry/react-native';
import {getItemFromAsyncStore} from '$/src/lib/utils/helpers/async-store';
import {useAppDispatch, useAppSelector} from '$/src/hooks/store';
import {setAuthLoading} from '$/src/store/slices/auth';
import {usePalette, useThemeColor} from '$/src/hooks/theme';

Sentry.init({
  dsn: 'https://7fe76dab3ab51dbdec9b6b3d48bd456b@o4508120609783808.ingest.us.sentry.io/4508120612012032',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});

const CLERK_PUBLISHABLE_KEY =
  'pk_test_aGVyb2ljLWRhc3NpZS00Ni5jbGVyay5hY2NvdW50cy5kZXYk';
// const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

function RootLayoutInner() {
  useLoadedFonts();

  const [isReady, setIsReady] = React.useState(false);
  const {isLoaded, isSignedIn} = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const {isLoading} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const backgroundThemeColor = useThemeColor('background');
  const colors = usePalette();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(app)';

    console.info('SIGNED_IN: ', {
      isSignedIn,
      inTabsGroup,
      segs: segments[0],
      ok: '',
      segments,
    });

    if (!isSignedIn) {
      (async () => {
        try {
          dispatch(setAuthLoading(true));
          const onboarded = await getItemFromAsyncStore('onboarded');
          if (!onboarded) {
            router.replace('/(auth)/onboarding');
          } else {
            router.replace('/(auth)/sign-in');
          }
        } catch (error) {
          console.error('CHECK_SIGN_IN: ', error);
        } finally {
          dispatch(setAuthLoading(false));
        }
      })();
      return;
    }

    if (!inTabsGroup) router.replace('/(app)/(drawer)');
  }, [isSignedIn]);

  useEffect(() => {
    console.log({isLoading});
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <Splash
          backgroundColor={hexWithOpacity(backgroundThemeColor, 0.5)}
          spinnerColor={colors.primary}
          isReady={isLoaded}
        />
      )}
      <Slot />
    </>
  );
}

const RootLayout = () => {
  // return (
  //   <SafeAreaProvider style={[a.flex_1, a.w_full]}>
  //     {/* <Splash isReady={isReady}> */}
  //     <RootSiblingParent>
  //       <React.Fragment>
  //         <GestureHandlerRootView style={a.h_full}>
  //           <Stack screenOptions={{headerShown: false}} />
  //         </GestureHandlerRootView>
  //       </React.Fragment>
  //     </RootSiblingParent>
  //     {/* </Splash> */}
  //   </SafeAreaProvider>
  // );

  return (
    <ReduxProviders>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}>
        <LocalizationProvider>
          <SafeAreaProvider style={[a.flex_1, a.w_full]}>
            <StatusBar animated={true} translucent={true} />
            <GestureHandlerRootView style={a.h_full}>
              <ModalProvider>
                <RootLayoutInner />
                <RouteTracker />
                <SocketContainer />
              </ModalProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </LocalizationProvider>
      </ClerkProvider>
    </ReduxProviders>
  );
};

export default Sentry.wrap(RootLayout);
