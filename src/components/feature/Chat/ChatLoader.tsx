import {MotiView} from 'moti';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';

import {a} from '$/src/lib/style/atoms';

import {Row} from '../../global';
import Skeleton from '../../global/Skeleton';
import {View} from '../../global/Themed';
import {Container} from '../../utils';

export default function ChatLoader() {
  const data = Array.from({length: 20}, () => null); // Create data array with 20 items

  const renderItem = ({index}: {index: number}) => {
    const alignmentStyle =
      (Math.floor(Math.random() * 10 + 1) + 1) % 2
        ? a.items_end
        : a.items_start;
    const height = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
    const width = Math.floor(Math.random() * (300 - 100 + 1)) + 100;

    return (
      <View key={index} style={[a.mb_(20), alignmentStyle, a.flex_1]}>
        <Skeleton colorMode="light" height={height} width={width} radius={25} />
      </View>
    );
  };
  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      animate={{backgroundColor: '#ffffff'}}
      style={[a.flex_1, a.justify_between, a.py_3xl]}>
      <Container>
        <FlatList
          data={data}
          ListHeaderComponent={
            <Row style={[a.items_center, a.my_2xl, a.ml_xl]}>
              <Skeleton
                colorMode="light"
                height={30}
                width={30}
                radius={'round'}
              />
              <View style={[a.ml_sm]}>
                <Skeleton
                  colorMode="light"
                  height={40}
                  width={90}
                  radius={'round'}
                />
              </View>
            </Row>
          }
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          style={[a.w_full, a.self_center]}
        />
      </Container>
    </MotiView>
  );
}
