import {useRouter} from 'expo-router';
import LottieView from 'lottie-react-native';
import {useEffect, useRef, useState} from 'react';
import {useWindowDimensions, ViewToken} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {a} from '#/lib/style/atoms';
import {AnimatedLaptop, AnimatedPhone} from '$/src/assets/animation';
import {Column, Row} from '$/src/components/global';
import Button, {ButtonText} from '$/src/components/global/Button';
import {Text, View} from '$/src/components/global/Themed';
import Indicator from '$/src/components/utils/Indicator';

interface OnboardingStepContent {
  id: string;
  title: string;
  content: string;
  image: any;
}

const data: OnboardingStepContent[] = [
  {
    id: '10',
    title: 'Request Ride',
    content: 'Request a ride get picked up by a nearby community driver',
    image: AnimatedPhone,
  },
  {
    id: '100',
    title: 'Confirm Your Driver',
    content:
      'Huge drivers network helps you find comfortable, safe and cheap ride',
    image: AnimatedLaptop,
  },
  {
    id: '101',
    title: 'Track your ride',
    content:
      'Know your driver in advance and be able to view current location in real time on the map',
    image: AnimatedPhone,
  },
  // {
  //   id: '102',
  //   title: 'Card Payment ',
  //   content: 'Make international payment and fund your card at the rate',
  //   image: OnboardingFour,
  // },
];

export default function Onboarding() {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const [currentPage, setCurrentPage] = useState(0);
  const viewabilityConfig = {viewAreaCoveragePercentThreshold: 50};
  const flatListRef = useRef<FlatList>(null);
  const flatListIndex = useSharedValue(0);
  const scrollX = useSharedValue(0);

  const onViewableItemsChanged = useRef<
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => void
  >(({viewableItems}) => {
    if (viewableItems.length > 0) {
      if (viewableItems[0].index !== null) {
        setCurrentPage(viewableItems[0].index); // Track the first visible item's index
        flatListIndex.value = viewableItems[0].index;
        console.log({FL_VALUE: flatListIndex.value});
      }
    }
  }).current;

  useEffect(() => {
    console.log({currentPage});
  }, [currentPage]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <Animated.View
      testID="welcomeMobileOnboarding"
      style={[a.h_full, a.bg_transparent, a.relative]}>
      <Animated.FlatList
        testID="welcomeMobileContentSlide"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        horizontal={true}
        pagingEnabled
        data={data}
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        style={[{width: SCREEN_WIDTH}]}
        onScroll={scrollHandler}
        renderItem={({item}) => {
          const Img = item.image;
          return (
            <Animated.View style={[{width: SCREEN_WIDTH}]}>
              <View style={[a.flex_1]}>
                <View style={[a.flex_1, a.relative]}>
                  <View style={[a.flex_(5), a.justify_end, a.pb_2xl, a.w_full]}>
                    <View style={[a.self_center, a.bottom_0]}>
                      {/* <Img width="100%" height="100%" /> */}
                      <LottieView
                        source={Img}
                        style={{width: SCREEN_WIDTH * 0.8, aspectRatio: 1}}
                        autoPlay
                        loop
                      />
                    </View>
                  </View>
                  <Column style={[a.w_full, a.flex_(4), a.p_3xl]}>
                    <Text
                      family="Bold"
                      style={[a.font_bold, a.text_3xl, a.text_center]}>
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        a.text_center,
                        a.font_semi_bold,
                        a.text_md,
                        a.mt_xl,
                      ]}>
                      {item.content}
                    </Text>
                  </Column>
                </View>
              </View>
            </Animated.View>
          );
        }}
      />

      {currentPage > 1 && (
        <OnboardingButton index={currentPage} scrollX={scrollX} />
      )}

      <Row style={[a.flex_(1), a.bottom_(80), a.absolute, a.self_center]}>
        <Indicator scrollX={scrollX} DATA={data} padding={50} />
      </Row>
    </Animated.View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     height: '100%',
//     position: 'relative',
//   },
//   text: {
//     textAlign: 'center',
//   },
//   actionButton: {
//     width: '100%',
//     position: 'absolute',
//     justifyContent: 'flex-end',
//     paddingHorizontal: 10,
//   },
//   btnContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'center',
//   },
// });

type Props = {
  index: number;
  scrollX: SharedValue<number>;
};

function OnboardingButton({index, scrollX}: Props) {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      scrollX.value,
      [(index - 1) * 1, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [200, 0, -200],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      [
        (index - 1) * SCREEN_WIDTH, // Previous page
        index * SCREEN_WIDTH, // Current page
        (index + 1) * SCREEN_WIDTH, // Next page
      ],
      [0, 1, 0], // Fully transparent off-screen, fully visible on current page
      Extrapolation.CLAMP,
    );

    return {
      transform: [{translateY: translateYAnimation}],
      opacity,
    };
  });

  const router = useRouter();

  return (
    <View style={[a.absolute, a.bottom_0, a.w_full, a.h_('25%')]}>
      <Animated.View
        style={[buttonAnimationStyle]}
        // entering={FadeIn}
        // exiting={FadeOut}
      >
        <Button
          onPress={() => {
            router.replace('/sign-in');
          }}
          style={[
            // a.absolute,
            // a.bottom_(100),
            a.w_90,
            a.self_center,
            a.mt_4xl,
            a.py_xl,
          ]}
          color="primary"
          variant="solid"
          shape="round">
          <ButtonText>Get Started</ButtonText>
        </Button>
      </Animated.View>
    </View>
  );
}
