import {useFocusEffect, useLocalSearchParams} from 'expo-router';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  ImageStyle,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

import useApi from '$/src/hooks/api/useApi';
import {useAppSelector} from '$/src/hooks/store';
import {a} from '$/src/lib/style/atoms';

import {Text, View} from '../../global/Themed';
import {Container} from '../../utils';
import ChatInput from './ChatInput';
import ChatLoader from './ChatLoader';
import Message from './Message';
;
import {Button, Column, Row, Separator} from '../../global';
import ViewHeader from '../../global/ViewHeader';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useHeaderHeight} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ButtonText} from '../../global/Button';
import {hexWithOpacity} from '$/src/lib/ui/helpers';
import {useChatSocket} from '$/src/hooks/socket/chat';
import {ChatSocket} from './Socket/ChatSocket';

type Props = {};

const QUICK_CHAT_MESSAGES = [
  'Where are you?',
  "I'm here.",
  'On my way.',
  'Almost there.',
  'Share your location.',
  'Stuck in traffic.',
];

export const snapPoints = ['95%'];
export const enablePanDownToClose = true;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function Chat() {
  let {chat: iosChatId} = useLocalSearchParams<{chat: string}>();

  const {chatId, messages} = useAppSelector(state => state.chat);
  const {riderInfo} = useAppSelector(state => state.order);
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList | null>(null);

  const {getMessages} = useApi().chat;

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    await getMessages(chatId!);
    setLoading(false);
  }, [chatId]);

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'ios') return;
      fetchMessages();
      return () => {};
    }, []),
  );

  useEffect(() => {
    if (Platform.OS === 'ios') return;
    fetchMessages();
  }, []);

  useEffect(() => {}, [loading]);

  const safeAreaInsets = useSafeAreaInsets();
  const [listViewDimensions, setListViewDimensions] = useState({
    width: 0,
    height: 0,
  });

  const scrollY = useSharedValue(0);
  const headerHeight = useHeaderHeight(); // Get the height of the header

  // Scroll handler to update scrollY based on scroll events
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Animated style for the large title (transitioning between large and small)
  const animatedHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [40, 60], [0, 1], 'clamp');
    const translateY = interpolate(scrollY.value, [40, 60], [5, 0], 'clamp');

    return {
      opacity,
      transform: [{translateY}],
    };
  });

  const animatedLargeHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [30, 60], [1, 0], 'clamp');

    return {
      opacity,
    };
  });

  const getItemLayout = (data: any[] | null | undefined, index: number) => ({
    length: 80,
    offset: 80 * index,
    index,
  }); // Assuming each item has a height of 80

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index,
      // viewOffset: -(listViewDimensions.height + 100),
      viewPosition: 10,
    });
  };

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  };

  const scrollToLast = () => {
    // flatListRef.current?.scrollToIndex({
    //   animated: true,
    //   index: messages.length - 1,
    //   viewOffset: -(listViewDimensions.height + 100),
    //   viewPosition: 10,
    // });
  };

  const renderItem = useCallback(
    ({item: {sender, content, id}}: any) => (
      <Message sender={sender} content={content} id={id} />
    ),
    [],
  );

  useEffect(() => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  }, [messages.length]);

  return (
    <>
      <ChatSocket />
      <Container
        safeArea={Platform.OS === 'android'}
        horizontalPadding={false}
        style={[
          a.flex_1,
          a.bg_(colors.light_1),
          Platform.OS === 'ios' && a.pt_2xl,
          a.pb_(safeAreaInsets.bottom),
        ]}>
        {loading ? (
          <ChatLoader />
        ) : (
          <KeyboardAvoidingView
            keyboardVerticalOffset={60}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[a.flex_1]}>
            <Container style={[a.bg_(colors.light_1), animatedHeaderStyle]}>
              <ViewHeader
                titleComponent={
                  <Row style={[a.items_center, a.justify_center, a.mx_auto]}>
                    <Image
                      style={[a.w_(30), a.h_(30), a.rounded_full] as ImageStyle}
                      source={{
                        uri: riderInfo?.photo,
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      family="Bold"
                      style={[a.text_xl, a.ml_sm]}>
                      {riderInfo?.firstName} {riderInfo?.lastName}
                    </Text>
                  </Row>
                }
              />
            </Container>

            <Container style={[a.flex_1]}>
              <AnimatedFlatList
                ref={flatListRef}
                onScroll={scrollHandler}
                onLayout={event => {
                  const {x, y, width, height} = event.nativeEvent.layout;
                  setListViewDimensions({width, height});
                  Keyboard.isVisible() ? scrollToLast() : scrollToEnd();
                }}
                getItemLayout={(data, index) => ({
                  index,
                  length: 500,
                  offset: 700,
                })}
                scrollEventThrottle={16}
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                style={[a.flex_1]}
                contentContainerStyle={[a.py_lg]}
                data={messages}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
                ListHeaderComponent={
                  <Container
                    horizontalPadding={false}
                    style={[animatedLargeHeaderStyle]}>
                    <Row style={[a.items_center, a.mb_md]}>
                      <Image
                        // width={50}
                        // height={50}
                        style={
                          [a.w_(30), a.h_(30), a.rounded_full] as ImageStyle
                        }
                        source={{
                          uri: riderInfo?.photo,
                        }}
                      />
                      <Text
                        numberOfLines={1}
                        family="Bold"
                        style={[a.text_5xl, a.ml_sm]}>
                        {riderInfo?.firstName} {riderInfo?.lastName}
                      </Text>
                    </Row>
                    <Separator
                      backgroundColor={hexWithOpacity(colors.light_2, 0.3)}
                      height={1}
                      style={[a.w_full]}
                    />
                  </Container>
                }
                ListFooterComponent={() =>
                  !messages.length && (
                    <Column style={[a.items_center, a.mt_5xl]}>
                      <Text style={[a.text_center]}>You have no messages</Text>
                      <Button
                        variant="ghost"
                        shape="round"
                        style={[a.py_xs, a.px_md, a.mt_sm]}
                        color="primary"
                        onPress={fetchMessages}>
                        <ButtonText style={[a.text_md]}>Refresh</ButtonText>
                      </Button>
                    </Column>
                  )
                }
              />
            </Container>
            <Container horizontalPadding={false}>
              <ScrollView
                style={[]}
                contentContainerStyle={[a.py_sm, a.px_md, a.h_full]}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                {QUICK_CHAT_MESSAGES.map((message, i) => (
                  <QuickButton key={i} text={message} />
                ))}
              </ScrollView>
            </Container>
            <Container style={[Platform.OS === 'android' ? a.pb_sm : null]}>
              <ChatInput />
            </Container>
          </KeyboardAvoidingView>
        )}
      </Container>
    </>
  );
}

function QuickButton({text}: {text: string}) {
  const {sendMessage} = useApi().chat;
  const sendQuickMessage = async () => await sendMessage(text);

  return (
    <View
      style={[
        {
          shadowColor: colors.dark_3,
          shadowOpacity: 0.3,
          shadowOffset: {height: 2, width: 1},
          elevation: 3,
        },
        a.ml_lg,
        a.bg_(colors.light_1),
        a.rounded_full,
      ]}>
      <Button
        onPress={sendQuickMessage}
        variant="solid"
        shape="round"
        style={[a.bg_(hexWithOpacity(colors.light_1, 1)), a.py_sm, a.px_lg]}>
        <ButtonText style={[a.text_(colors.dark_3), a.text_md]}>
          {text}
        </ButtonText>
      </Button>
    </View>
  );
}
