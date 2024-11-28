import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {a} from '#/lib/style/atoms';

import ModalHeader from './ModalHeader';

type WrapperProps = {
  title?: string;
  padSides?: boolean;
  onClose?(): void;
};

export function ModalWrapper({
  children,
  title,
  padSides = true,
  onClose,
}: React.PropsWithChildren<WrapperProps>) {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[a.flex_1, a.bg_('transparent')]}>
      <View
        testID="walletModal"
        style={[
          {padding: (safeAreaInsets.left, 15)},
          {paddingHorizontal: padSides ? (safeAreaInsets.left, 15) : 0},
          a.bg_('transparent'),
          a.flex_1,
        ]}>
        <ModalHeader title={title!} canCloseInModal={true} onClose={onClose} />
        <View style={[a.mt_2xl, a.flex_1]}>{children}</View>
      </View>
    </SafeAreaView>
  );
}
