import {FontAwesome} from '@expo/vector-icons';
import type {HeaderBackButtonProps} from '@react-navigation/native-stack/src/types';
import {useRouter} from 'expo-router';
import {useCallback} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {HITSLOP_30} from '$/src/lib/constants';
import {a} from '$/src/lib/style/atoms';
import {Haptics} from '$/src/lib/utils/haptics';

export default function BackButton({
  backPressHandler,
  canGoBack,
}: Partial<HeaderBackButtonProps> & {backPressHandler?(): void}) {
  const router = useRouter();

  const onPressBack = useCallback(() => {
    if (backPressHandler) {
      backPressHandler();
    } else {
      if (router.canGoBack() || canGoBack) {
        router.back();
      } else {
        router.navigate('/(app)/(drawer)');
      }
    }
    Haptics.success();
  }, [router]);
  return (
    <TouchableOpacity
      testID="viewHeaderDrawerBtn"
      onPress={onPressBack}
      hitSlop={HITSLOP_30}
      style={[a.items_center, a.justify_center, a.rounded_full]}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Back"
      accessibilityHint={'Access navigation links and settings'}>
      <FontAwesome name="angle-left" size={30} />
    </TouchableOpacity>
  );
}
