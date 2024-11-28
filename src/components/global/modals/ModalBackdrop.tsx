import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {useModalControls} from './ModalState';

export function createCustomBackdrop(
  onClose?: (() => void) | undefined,
): React.FC<BottomSheetBackdropProps> {
  const CustomBackdrop = ({animatedIndex, style}: BottomSheetBackdropProps) => {
    // animated variables
    const opacity = useAnimatedStyle(() => ({
      opacity: interpolate(
        animatedIndex.value,
        [-1, 0], //input range
        [0, 0.5], // output range
        Extrapolation.CLAMP,
      ),
    }));
    const {closeModal} = useModalControls();

    const containerStyle = React.useMemo(
      () => [style, {backgroundColor: '#000'}, opacity],
      [style, opacity],
    );

    return (
      <TouchableWithoutFeedback
        onPress={() => onClose?.() || closeModal()}
        accessibilityLabel="Close bottom drawer"
        accessibilityHint=""
        onAccessibilityEscape={() => {
          if (onClose !== undefined) {
            onClose();
          }
        }}>
        <Animated.View style={containerStyle} />
      </TouchableWithoutFeedback>
    );
  };
  return CustomBackdrop;
}
