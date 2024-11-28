import BottomSheet from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import {memo, useEffect, useRef} from 'react';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import {a} from '$/src/lib/style/atoms';
import modalContent from './ModalContent';
import {useModalControls, useModals} from './ModalState';
import {Haptics} from '$/src/lib/utils/haptics';
import {useAppSelector} from '$/src/hooks/store';
import {OrderType} from '$/src/store/slices/order/types';
import {usePalette, useThemeColor} from '$/src/hooks/theme';

const DEFAULT_SNAP_POINTS = ['90%'];
const HANDLE_HEIGHT = 24;

function Modal() {
  const {isModalActive, modalRef, activeModals} = useModals();
  const {closeModal, setupModal, modalProps} = useModalControls();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const activeModal = activeModals[activeModals.length - 1];

  const colors = usePalette();
  const backgroundThemeColor = useThemeColor('background');

  const {orderRequest} = useAppSelector(state => state.order);

  const onBottomSheetChange = async (snapPoint: number) => {
    if (!modalRef?.current) setupModal(bottomSheetRef);
    Haptics.medium();
    if (snapPoint === -1) {
      closeModal();
    }
  };

  const onClose = () => {
    bottomSheetRef.current?.close();
    closeModal();
  };

  React.useEffect(() => {
    console.log({bottomSheetRef});
    if (bottomSheetRef.current) {
      console.log('SETTING UP MODAL');
      setupModal(bottomSheetRef);
    }
  }, [bottomSheetRef.current]);

  React.useEffect(() => {
    if (isModalActive) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close;
    }
  }, [isModalActive, bottomSheetRef, activeModal]);

  let snapPoints: (string | number)[] = DEFAULT_SNAP_POINTS;

  // useEffect(() => {}, [activeModals]);

  // if (snapPoints[0] === 'fullscreen') {
  //   return (
  //     <SafeAreaView
  //       style={[a.absolute, a.top_(0), a.bottom_(0), a.left_(0), a.right_(0)]}>
  //       {element}
  //     </SafeAreaView>
  //   );
  // }

  const {snapPoints: modSnapPoints, ...modProps} = modalProps;
  let contentSnapPoints;
  let contentProps = {};
  if (modalContent[activeModal]?.snapPoints) {
    const {snapPoints, ...content} = modalContent[activeModal];
    contentSnapPoints = snapPoints;
    contentProps = content;
  }

  if (!isModalActive || !activeModals.length) return null;
  
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={modSnapPoints || contentSnapPoints || DEFAULT_SNAP_POINTS}
      handleHeight={HANDLE_HEIGHT}
      index={isModalActive ? 0 : -1}
      android_keyboardInputMode="adjustResize"
      keyboardBlurBehavior="restore"
      // backdropComponent={
      //   isModalActive && modalContent[activeModal]?.backdropComponent
      //     ? createCustomBackdrop(onClose)
      //     : undefined
      // }
      containerStyle={[
        modalContent[activeModal]?.snapPoints?.includes('100%') &&
          Platform.OS === 'ios' && [a.mt_(Constants.statusBarHeight)],
        a.bg_(backgroundThemeColor),
      ]}
      handleIndicatorStyle={[a.bg_(colors.tint)]}
      onChange={onBottomSheetChange}
      // onClose={onClose}
      handleStyle={[styles.handle]}
      {...contentProps}
      {...modProps}>
      {modalContent[activeModal]?.children}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  handle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export const ModalContainer = memo(Modal);
