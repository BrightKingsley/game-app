import React, {ComponentProps, PropsWithChildren} from 'react';
import {KeyboardAvoidingView, Platform, ViewProps} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {a} from '#/lib/style/atoms';

import {View} from './Themed';

const KeyboardAvoidingComponent = ({
  children,
  scrollProps = {contentContainerStyle: []},
  ...props
}: PropsWithChildren<
  ViewProps & {scrollProps?: Partial<ComponentProps<typeof FlatList>>}
>) => {
  const {style, ...viewProps} = props;
  const {contentContainerStyle, ..._scrollProps} = scrollProps;
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[a.flex_1, style]}
      {...viewProps}>
      <FlatList
        contentContainerStyle={[a.flex_1, contentContainerStyle]}
        scrollEnabled={false}
        keyboardShouldPersistTaps={'handled'}
        nestedScrollEnabled={true}
        data={[0]}
        renderItem={() => <>{children}</>}
        {..._scrollProps}
      />
    </KeyboardAvoidingView>
  ) : (
    children
  );
};

export default KeyboardAvoidingComponent;
