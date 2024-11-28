import {Insets, Platform} from 'react-native';

// constants to manage active and logged out users
export const DEV_MODE = false;
export const PROD_MODE = true;
export const ZEBRA_SERVICE = '172.20.10.3:443';
export const DEFAULT_SERVICE = ZEBRA_SERVICE;

export const createHitslop = (size: number): Insets => ({
  top: size,
  left: size,
  right: size,
  bottom: size,
});
export const HITSLOP_10 = createHitslop(10);
export const HITSLOP_20 = createHitslop(20);
export const HITSLOP_30 = createHitslop(30);
export const BACK_HITSLOP = HITSLOP_30;

export const BOTTOM_TAB_HEIGHT = 60;

export const GOOGLE_MAPS_API_KEY = 'AIzaSyBFfImYMw4uHbtiHQwCJVFD6IusEUtzVZI';

export const GEOCODE_URL = `https://maps.googleapis.com/maps/api/geocode/json?`;

export let API_BASE_URL: string;

if (__DEV__) {
  if (Platform.OS !== 'ios') {
    API_BASE_URL = 'http://192.168.122.1:8080';
  } else API_BASE_URL = 'https://transit-api-givk.onrender.com';
  API_BASE_URL = 'https://transit-api-givk.onrender.com';
} else {
  API_BASE_URL = 'https://transit-api-givk.onrender.com';
}
