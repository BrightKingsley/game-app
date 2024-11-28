import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {FlatList, useWindowDimensions, View, ViewToken} from 'react-native';

import {useAppDispatch, useAppSelector} from '#/hooks/store';
import {a} from '#/lib/style/atoms';


import AwaitingResponse from './AwaitingResponse';
import ConfirmOrder from './ConfirmOrder';
import DetailsTabBar from './DetailsTabBar';
import OrderDetails from './OrderDetails';

export const snapPoints = [`80%`];

export const enablePanDownToClose = false;

function CreateOrderTabs() {}
// app/(drawer)/index.tsx

// import {useScrollProps} from '@bacons/expo-router-top-tabs';
// import {Animated} from 'react-native';

// export default function Screen() {
//   const props = useScrollProps();

//   return <Animated.ScrollView {...props}></Animated.ScrollView>;
// }

import {StyleSheet, Text} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import Animated, {useEvent, useHandler} from 'react-native-reanimated';

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

export function usePagerScrollHandler(handlers: any, dependencies?: any) {
  const {context, doDependenciesDiffer} = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent<any>(
    event => {
      'worklet';
      const {onPageScroll} = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer,
  );
}

export default function MyPager() {
  const pagerRef = React.useRef<PagerView>(null);
  const {width: WIDTH} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const {orderRequest} = useAppSelector(state => state.order);

  React.useEffect(() => {
    if (orderRequest?.tabIndex !== undefined) {
      pagerRef?.current?.setPage(orderRequest.tabIndex);
    }
  }, [orderRequest?.tabIndex]);

  const onViewRef = React.useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0 && orderRequest) {
        updateIndex(viewableItems[0].index as number);
      }
    },
  );

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const getItemLayout = (data: any, index: number) => ({
    length: WIDTH * 0.9,
    offset: WIDTH * 0.9 * index,
    index,
  });

  const handler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      'worklet';
    },
  });

  const renderPagerView = React.useCallback(
    () => (
      <AnimatedPager
        onPageSelected={e => {
          updateIndex(e.nativeEvent.position);
        }}
        ref={pagerRef}
        key={'pager-view'}
        style={styles.pagerView}
        initialPage={0}>
        <OrderDetails
          key="order-details"
          state={orderRequest?.tabIndex || 0}
          setIndex={(i: number) => {
            updateIndex(i);
            pagerRef?.current?.setPage(i);
          }}
        />
        <ConfirmOrder
          key="confirm-order"
          state={orderRequest?.tabIndex || 0}
          setIndex={(i: number) => {
            updateIndex(i);
            pagerRef?.current?.setPage(i);
          }}
        />
        <AwaitingResponse
          key="awaiting-response"
          state={orderRequest?.tabIndex || 0}
          setIndex={(i: number) => {
            updateIndex(i);
            pagerRef?.current?.setPage(i);
          }}
        />
      </AnimatedPager>
    ),
    [],
  );

  return renderPagerView();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
});

// export default function CreateOrder() {
//   return (
//     <View style={[a.w_full, a.h_full]}>
//       <CreateOrderTabs />
//     </View>
//   );
// }
