import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {a} from '#/lib/style/atoms';

import t from '$/locales/translate';

import {AccordionDownIcon} from '../../assets/icons';
import {hexWithOpacity} from '../../lib/ui/helpers';
import Button from './Button';
import Row from './Row';
import {Text, View} from './Themed';

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  items: DropdownItem[];
  selected: any;
  onSelect: (item: DropdownItem['value']) => void;
}

export default function Dropdown({items, onSelect, selected}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const translateY = useSharedValue(-100); // Start with the dropdown hidden

  const opacity = useSharedValue(0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    translateY.value = withSpring(isOpen ? -20 : 0, {duration: 400}); // Translate downwards
    opacity.value = withSpring(isOpen ? 0 : 1, {duration: 400});
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isOpen) {
      timeout = setTimeout(() => {
        setShow(false);
      }, 400);
    } else {
      setShow(true);
    }

    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <Animated.View
      style={[a.mx_lg, a.self_center, a.w_full, a.z_50, a.relative, a.mt_md]}>
      <Row style={[a.ml_xs]}>
        <Text style={{}}>{t('select_gender')}</Text>
      </Row>
      <TouchableOpacity
        style={[
          a.p_(10),
          a.border_tint(colors.primary),
          a.border,
          a.rounded_full,
          a.w_full,
          a.z_50,
        ]}
        onPress={toggleDropdown}>
        <Row>
          <Text style={[a.text_(colors.dark_3), a.flex_1]}>
            {t(selected ? selected : 'select_an_item')}
          </Text>
          <AccordionDownIcon />
        </Row>
      </TouchableOpacity>
      {show && (
        <Animated.View
          style={[
            a.mt_(8),
            a.overflow_hidden,
            a.rounded_xl,
            a.bg_(colors.light_1),
            animatedStyle,
            a.absolute,
            a.w_70,
            a.z_50,
            a.top_('100%'),
            a.border,
            a.border_tint(hexWithOpacity(colors.dark_3, 0.2)),
          ]}>
          <FlatList
            data={items}
            keyExtractor={item => item.value}
            renderItem={({item}) => {
              const isSelected = item.value === selected;
              return (
                <Button
                  buttonWrapperStyle={[a.py_0]}
                  variant="ghost"
                  onPress={() => {
                    onSelect(item.value);
                    toggleDropdown();
                  }}>
                  <Row style={[a.p_md, a.px_xl]}>
                    <Text style={[a.flex_1]}>{item.label}</Text>
                    <View
                      style={[
                        a.w_(20),
                        a.h_(20),
                        a.rounded_full,
                        a.border_(1),
                        a.border_tint(colors.dark_3),
                        a.p_xs,
                      ]}>
                      <View
                        style={[
                          isSelected && [
                            a.bg_(colors.dark_3),
                            a.w_full,
                            a.h_full,
                            a.rounded_full,
                          ],
                        ]}
                      />
                    </View>
                  </Row>
                </Button>
              );
            }}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
}
