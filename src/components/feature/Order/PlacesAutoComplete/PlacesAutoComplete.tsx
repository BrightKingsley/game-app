import {FontAwesome, Ionicons, Octicons} from '@expo/vector-icons';
import React, {ComponentProps, PropsWithChildren, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleProp,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

import {GOOGLE_MAPS_API_KEY} from '#/lib/constants';
import {a} from '#/lib/style/atoms';

import {hexWithOpacity} from '#/lib/ui/helpers';
import {matchAndCutText} from '$/src/lib/utils/helpers/strings';

import {ListTile, Row, Separator} from '../../../global';
import {Text, View} from '../../../global/Themed';
import {GooglePlacesAutocomplete} from './GoogleAutocomplete';

// navigator.geolocation = require('react-native-geolocation-service');

let KEYBOARD_HEIGHT: number | undefined = undefined;
export default function PlacesAutoComplete({
  placeholder,
  getDetails,
  containerStyles,
  listViewStyles,
  inputContainerStyles,
  iconTransitionDirection,
  ...inputProps
}: TextInputProps & {
  getDetails(data: GooglePlaceData, details: GooglePlaceDetail | null): void;
  placeholder: string;
  containerStyles?: StyleProp<ViewStyle>;
  inputContainerStyles?: StyleProp<ViewStyle>;
  listViewStyles?: StyleProp<ViewStyle>;
  iconTransitionDirection?: 'up' | 'down';
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputText, setInputText] = useState(inputProps.value);
  const [selectedPlaceDetails, setSelectedDetails] =
    useState<GooglePlaceDetail | null>(null);

  // const keyboard = useAnimatedKeyboard();
  // console.log({keyboard});
  // if (!KEYBOARD_HEIGHT && keyboard.height.value) {
  //   KEYBOARD_HEIGHT = keyboard.height.value;
  // }

  // React.useEffect(() => {z
  //   console.log({KEYBOARD_HEIGHT});
  // }, []);

  return (
    <GooglePlacesAutocomplete
      autoFillOnNotFound
      debounce={300}
      enablePoweredByContainer={false}
      fetchDetails={true}
      isRowScrollable={true}
      nearbyPlacesAPI="GooglePlacesSearch"
      suppressDefaultStyles={true}
      listViewDisplayed={true}
      nestedScrollEnabled={true}
      listEmptyComponent={
        <View style={[a.w_full, a.h_(80), a.justify_center]}>
          <Text
            style={[
              a.text_center,
              a.text_md,
              a.text_(hexWithOpacity(colors.error_3, 0.6)),
            ]}>
            No search results found
          </Text>
        </View>
      }
      listLoaderComponent={
        <View style={[a.h_(80), a.items_center, a.justify_center]}>
          <ActivityIndicator />
        </View>
      }
      onPress={(data: GooglePlaceData, details: GooglePlaceDetail) => {
        setSelectedDetails(details);
        getDetails?.(data, details);
      }}
      placeholder={placeholder}
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: 'en',
        // components: 'country:LR',
        components: `country:NG`,
      }}
      renderRow={(data: GooglePlaceData) => (
        <React.Fragment>
          <PlaceRow data={data} inputText={inputText!} />
          <Separator
            height={1.8}
            width={'95%'}
            backgroundColor={colors.light_2}
            style={[a.self_center]}
          />
        </React.Fragment>
      )}
      renderLeftButton={() => (
        <View style={[a.items_center, a.justify_center]}>
          {
            selectedPlaceDetails ? (
              // <Animated.View
              //   entering={ZoomIn}
              //   entering={ZoomOut}
              //   style={[a.opacity_(0.4),  a.w_(20), a.h_(20)]}>
              <Animated.Image
                entering={ZoomIn}
                exiting={ZoomOut}
                width={20}
                height={20}
                style={[]}
                source={{
                  uri:
                    (selectedPlaceDetails as any).icon_mask_base_uri + '.png',
                }}
              />
            ) : // </Animated.View>
            // <Animated.View
            //   style={[ a.w_(20), a.h_(20)]}
            //   entering={ZoomIn}
            //   entering={ZoomOut}>
            isFocused ? (
              <Animated.View
                entering={
                  iconTransitionDirection === 'up' ? FadeInUp : FadeInDown
                }
                exiting={iconTransitionDirection === 'up' ? FadeOut : FadeOut}>
                <FontAwesome name={'search'} size={20} color={colors.dark_3} />
              </Animated.View>
            ) : (
              <FontAwesome name={'circle-o'} size={20} color={colors.light_3} />
            )
            // </Animated.View>
          }
        </View>
      )}
      renderRightButton={
        isFocused
          ? () => (
              <Pressable
                style={[
                  a.rounded_full,
                  a.w_(20),
                  a.h_(20),
                  a.items_center,
                  a.justify_center,
                  a.p_xs,
                  a.self_center,
                  a.bg_(hexWithOpacity(colors.dark_4, 0.1)),
                ]}
                onPress={() => {
                  setInputText('');
                }}>
                <FontAwesome name="close" />
              </Pressable>
            )
          : undefined
      }
      styles={{
        row: [a.bg_transparent],
        container: [a.bg_transparent, a.w_full, containerStyles],
        textInput: [a.text_md, a.ml_sm, a.flex_1, a.p_(8), a.h_(50)],
        textInputContainer: [
          a.rounded_md,
          a.overflow_hidden,
          a.flex_row,
          a.px_lg,
          a.z_20,
          isFocused ? a.p_0 : a.p_(2),
          a.border_(isFocused ? 2 : 1),
          a.p_(isFocused ? 0 : 1),
          a.bg_(colors.light_1),
          a.border_(isFocused ? 2 : 1),
          a.bg_(
            isFocused ? 'transparent' : hexWithOpacity(colors.light_2, 0.3),
          ),
          a.border_tint(isFocused ? colors.light_3 : colors.light_2),
          inputContainerStyles,
        ],
        // separator: [a.h_(2), a.bg_(colors.dark_4_3)],
        listView: [
          a.absolute,
          a.pt_(0),
          // a.h_(KEYBOARD_HEIGHT as number),
          a.w_full,
          listViewStyles,
          a.z_50,
          a.bg_(colors.light_1),
          {minHeight: 80},
        ],
      }}
      showsVerticalScrollIndicator={false}
      // contentContainerStyle={[a.pb_((KEYBOARD_HEIGHT! / 2) as number)]}
      textInputProps={{
        onFocus() {
          setIsFocused(true);
        },
        onBlur() {
          setIsFocused(false);
        },
        onChangeText(e: string) {
          setInputText(e);
        },
        value: inputText,
        numberOfLines: 1,
        ...inputProps,
      }}
    />
  );
}

const PlaceRow = ({
  data,
  inputText,
}: {
  data: GooglePlaceData;
  inputText: string;
}) => {
  const HeaderText = ({
    children,
    style,
    ...textProps
  }: PropsWithChildren<ComponentProps<typeof Text>>) => {
    return (
      <Text style={[a.text_md, style]} {...textProps}>
        {children}
      </Text>
    );
  };

  // useEffect(() => {
  //   console.log({matchedText: textInput?.matchedText});
  // }, [textInput?.matchedText]);

  return (
    <>
      <ListTile
        pointerEvents="none"
        ripple
        rippleColor={hexWithOpacity(colors.dark_4, 0.4)}
        style={[
          a.justify_start,
          a.items_center,
          a.self_center,
          a.rounded_xs,
          a.overflow_hidden,
          a.w_full,
          a.bg_(colors.light_1),
          a.px_3xl,
          a.py_(12),
          a.my_(1),
          //   a.w_(380),
        ]}
        leading={
          <View style={[a.items_center, a.justify_center]}>
            <Octicons name="location" size={24} color={'gray'} />
          </View>
        }
        trailing={
          <View style={[a.items_center, a.justify_center]}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={'gray'}
              style={[{transform: [{rotate: '45deg'}]}]}
            />
          </View>
        }
        content={
          <View style={[a.flex_1, a.ml_xl]}>
            {matchAndCutText(
              inputText,
              data.structured_formatting?.main_text || '',
            )?.matchedText ? (
              <Row>
                <HeaderText style={[a.text_(colors.yellow_3)]}>
                  {
                    matchAndCutText(
                      inputText,
                      data.structured_formatting?.main_text || '',
                    )?.matchedText
                  }
                </HeaderText>
                <HeaderText numberOfLines={1}>
                  {
                    matchAndCutText(
                      inputText,
                      data.structured_formatting?.main_text || '',
                    )?.remainingText
                  }
                </HeaderText>
              </Row>
            ) : (
              <HeaderText>{data.structured_formatting?.main_text}</HeaderText>
            )}
            <Text
              style={[a.text_sm, a.text_(colors.light_3)]}
              numberOfLines={1}>
              {data.structured_formatting?.secondary_text}
            </Text>
          </View>
        }
      />
    </>
  );
};
