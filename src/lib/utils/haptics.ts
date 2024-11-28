import * as HP from 'expo-haptics';
import {Platform} from 'react-native';

export const Haptics = {
  success() {
    Platform.OS === 'ios' &&
      HP.notificationAsync(HP.NotificationFeedbackType.Success);
  },
  medium() {
    Platform.OS === 'ios' && HP.impactAsync(HP.ImpactFeedbackStyle.Medium);
  },
};
