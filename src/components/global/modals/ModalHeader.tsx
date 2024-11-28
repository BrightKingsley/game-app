import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {a} from '#/lib/style/atoms';

import {hexWithOpacity} from '#/lib/ui/helpers';

import {Text} from '../Themed';
import {useModalControls} from './ModalState';

interface ModalHeaderProps {
  title: string;
  canCloseInModal: boolean;
  onClose?(): void;
}

export default function ModalHeader({
  canCloseInModal,
  title,
  onClose,
}: ModalHeaderProps) {
  const {closeAllModals} = useModalControls();

  // when "Pressed" function closes open modal
  function onPressCloseService() {
    closeAllModals();
  }

  return (
    <View>
      {title && (
        <View style={[a.flex, a.justify_center, a.items_center, a.py_xs]}>
          <Text style={[a.text_lg, a.font_bold, a.capitalize]}>{title}</Text>
        </View>
      )}
      {canCloseInModal && (
        <View
          style={[
            a.absolute,
            styles.closeIcon,
            a.overflow_hidden,
            a.rounded_full,
            a.w_(35),
            a.h_(35),
          ]}>
          <Pressable
            android_ripple={{
              color: hexWithOpacity(colors.dark_3, 0.6),
            }}
            style={[
              a.z_10,
              a.items_center,
              a.justify_center,
              a.w_full,
              a.h_full,
            ]}
            onPress={() => {
              onClose?.();
              onPressCloseService();
            }}>
            <FontAwesome
              name="close"
              style={[a.text_(colors.yellow_3), a.text_xl]}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    right: 10,
    top: -10,
  },
});
