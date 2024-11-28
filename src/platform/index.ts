import {Platform} from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';
export const isNative = isAndroid || isIos;
export const devicePlatform = isIos ? 'ios' : isAndroid ? 'android' : 'web';

export function ios(value: any) {
  if (isIos) {
    return value;
  }
}
export function android(value: any) {
  if (isAndroid) {
    return value;
  }
}
export function native(value: any) {
  if (isNative) {
    return value;
  }
}
