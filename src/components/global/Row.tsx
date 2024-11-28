import React, {PropsWithChildren} from 'react';
import {ViewProps} from 'react-native';

import {a} from '#/lib/style/atoms';

import {View} from './Themed';

interface RowProps extends ViewProps {
  reverse?: boolean;
}

export default function Row({
  children,
  reverse = false,
  style,
  ...rest
}: PropsWithChildren<RowProps>) {
  return (
    <View
      style={[
        a.flex_row,
        reverse && a.flex_row_reverse,
        a.bg_transparent,
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
}
