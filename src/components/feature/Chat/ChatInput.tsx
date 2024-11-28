import Ionicons from '@expo/vector-icons/Ionicons';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {useCallback, useState} from 'react';
import {Platform, Pressable, ViewStyle} from 'react-native';
import Animated, {Easing, RollInRight} from 'react-native-reanimated';

import {a} from '#/lib/style/atoms';

import {hexWithOpacity} from '#/lib/ui/helpers';

import {Row} from '../../global';
import TextInput from '../../global/TextInput';
import useApi from '$/src/hooks/api/useApi';
import {Haptics} from '$/src/lib/utils/haptics';

export default function ChatInput() {
  const {sendMessage} = useApi().chat;

  const [text, setText] = useState('');
  const handleSubmit = useCallback(async () => {
    Haptics.success();
    try {
      const result = await sendMessage(text);
    } catch (error) {
      console.error('CHAT_INPUT: ', error);
    }
  }, [text]);

  return (
    <Row style={[a.items_center, a.mx_auto, a.bg_('transparent')]}>
      <TextInput
        altComponent={
          Platform.OS === 'android' ? BottomSheetTextInput : undefined
        }
        containerStyle={
          [
            a.items_center,
            a.p_(1),
            a.overflow_hidden,
            a.bg_transparent,
            a.border_tint(colors.light_2),
            a.flex_1,
          ] as ViewStyle
        }
        style={[
          a.rounded_full,
          a.px_xs,
          a.py_0,
          a.bg_(hexWithOpacity(colors.light_2, 0.3)),
        ]}
        inputStyle={[a.flex_1, a.w_full, a.h_(40), a.px_lg]}
        keyboardType="default"
        value={text}
        onChangeText={newText => {
          setText(newText);
        }}
        placeholder="Aa"
        // autoFocus
        cursorColor="black"
        autoCorrect
        focusStyle={isFocused => ({
          borderColor: 'transparent',
          borderWidth: isFocused ? 2 : 1,
          backgroundColor: 'transparent',
        })}
      />
      <Animated.View
        style={[a.w_(38), a.h_(38), a.overflow_hidden, a.rounded_full, a.ml_xs]}
        entering={RollInRight.duration(200).easing(Easing.ease)}>
        <Pressable
          android_ripple={{
            color: hexWithOpacity(colors.light_3, 0.6),
          }}
          onPress={handleSubmit}
          style={[
            a.w_(38),
            a.h_(38),
            a.items_center,
            a.justify_center,
            a.py_(0),
            a.bg_(colors.primary),
            a.rounded_full,
          ]}>
          <Ionicons name="paper-plane" color={colors.light_1} size={26} />
        </Pressable>
      </Animated.View>
    </Row>
  );
}
