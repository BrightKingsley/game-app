import React, {ComponentProps, useRef} from 'react';
import {View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  ReduceMotion,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {a} from '#/lib/style/atoms';
import Ionicons from '@expo/vector-icons/Ionicons';

import {useAppSelector} from '#/hooks/store';
import {Button, Row, Separator} from '$/src/components/global';
import {ButtonText} from '$/src/components/global/Button';

// const tabs: {
//   name: string;
//   label: string;
//   icon: ComponentProps<typeof Ionicons>['name'];
// }[] = [
//   {name: 'OrderDetails', label: 'Order Details', icon: 'document'},
//   {name: 'ConfirmOrder', label: 'Confirm Order', icon: 'checkmark-circle'},
//   {name: 'AwaitingResponse', label: 'Awaiting Response', icon: 'time-outline'},
// ];

// export default function DetailsTabBar({
//   setIndex,
//   state,
// }: {
//   state: number;
//   setIndex: (index: number) => void;
// }) {
//   return (
//     <Row style={[a.py_sm]}>
//       {tabs.map((tab, index) => {
//         const isFocused = state === index;

//         const flex = useSharedValue(isFocused ? 1 : 0.2);

//         const animatedStyle = useAnimatedStyle(() => {
//           return {
//             flex: withTiming(flex.value),
//           };
//         });

//         const onPress = () => {
//           if (!isFocused) {
//             setIndex(index);
//           }
//         };

//         React.useEffect(() => {
//           if (isFocused) {
//             flex.value = 1;
//           } else {
//             flex.value = 0.2;
//           }
//         }, [isFocused]);

//         return (
//           <React.Fragment key={index}>
//             <Animated.View style={[animatedStyle]}>
//               <Button
//                 onPress={onPress}
//                 color={isFocused ? 'yellow' : undefined}
//                 shape="round"
//                 label={tab.label}
//                 variant="solid"
//                 size="large"
//                 style={{}}>
//                 {isFocused ? (
//                   <ButtonText
//                     style={[a.text_sm, a.px_2xl, a.w_full]}
//                     numberOfLines={1}>
//                     {tab.label}
//                   </ButtonText>
//                 ) : (
//                   <View style={[a.w_full, a.align_center, a.justify_center]}>
//                     <Ionicons
//                       size={20}
//                       name={tab.icon}
//                       color={colors.light_1}
//                     />
//                   </View>
//                 )}
//               </Button>
//             </Animated.View>
//             {index !== tabs.length - 1 && <Separator width={2} />}
//           </React.Fragment>
//         );
//       })}
//     </Row>
//   );
// }

// import React from 'react';
// import {View} from 'react-native';
// import {Button, ButtonText, Row, Separator} from 'your-ui-library';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {colors} from 'your-styles';

// const tabs: {
//   name: string;
//   label: string;
//   icon: ComponentProps<typeof Ionicons>['name'];
// }[] = [
//   {name: 'OrderDetails', label: 'Order Details', icon: 'document'},
//   {name: 'ConfirmOrder', label: 'Confirm Order', icon: 'checkmark-circle'},
//   {name: 'AwaitingResponse', label: 'Awaiting Response', icon: 'time-outline'},
// ];

// export default function DetailsTabBar({
//   setIndex,
//   state,
// }: {
//   state: number;
//   setIndex: (index: number) => void;
// }) {
//   const {orderRequest} = useAppSelector(state => state.order);

//   return (
//     <Row style={[a.py_sm]}>
//       {tabs.map((tab, index) => {
//         const isFocused = state === index;

//         const flex = useSharedValue(isFocused ? 1 : 0.2);
//         const color = useSharedValue(isFocused ? 'yellow' : 'transparent');

//         // const animatedStyle = useAnimatedStyle(() => {
//         //   return {
//         //     flex: withTiming(flex.value),
//         //     // backgroundColor: withTiming(color.value),
//         //   };
//         // });

//         const animatedStyle = useAnimatedStyle(() => {
//           return {
//             flex: withTiming(flex.value, {
//               duration: 400,
//               easing: Easing.linear,
//             }),
//           };
//         });

//         const animatedButtonColorStyle = useAnimatedStyle(() => {
//           return {
//             backgroundColor: withTiming(color.value, {
//               duration: 400,
//               easing: Easing.linear,
//             }),
//           };
//         });

//         const onPress = () => {
//           if (!isFocused) {
//             setIndex(index);
//           }
//         };

//         React.useEffect(() => {
//           flex.value = isFocused ? 1 : 0.2;
//           color.value = isFocused ? colors.yellow_2 : colors.light_2;
//         }, [isFocused]);

//         return (
//           <React.Fragment key={index}>
//             <Button
//               onPress={onPress}
//               color={'yellow'}
//               shape="round"
//               label={tab.label}
//               variant="solid"
//               size="large"
//               style={[animatedButtonColorStyle, animatedStyle]}>
//               {isFocused && orderRequest?.tabIndex === index ? (
//                 <ButtonText
//                   style={[a.text_sm, a.px_2xl, a.w_full]}
//                   numberOfLines={1}>
//                   {tab.label}
//                 </ButtonText>
//               ) : (
//                 <View style={[a.w_full, a.align_center, a.justify_center]}>
//                   <Ionicons size={20} name={tab.icon} color={colors.light_1} />
//                 </View>
//               )}
//             </Button>
//             {index !== tabs.length - 1 && <Separator width={2} />}
//           </React.Fragment>
//         );
//       })}
//     </Row>
//   );
// }

const tabs: {
  name: string;
  label: string;
  icon: ComponentProps<typeof Ionicons>['name'];
}[] = [
  {name: 'OrderDetails', label: 'Order Details', icon: 'document'},
  {name: 'ConfirmOrder', label: 'Confirm Order', icon: 'checkmark-circle'},
  {name: 'AwaitingResponse', label: 'Awaiting Response', icon: 'time-outline'},
];

export default function DetailsTabBar({
  setIndex,
  state,
}: {
  state: number;
  setIndex: (index: number) => void;
}) {
  return (
    <Row style={[a.py_sm]}>
      {tabs.map((tab, index) => {
        const isFocused = state === index;

        const animatedStyle = useAnimatedStyle(() => {
          return {
            flex: withTiming(isFocused ? 1 : 0.2, {
              duration: 400,
              easing: Easing.linear,
            }),
            backgroundColor: withTiming(
              isFocused ? colors.primary : colors.light_2,
              {
                duration: 400,
                easing: Easing.linear,
              },
            ),
          };
        });

        const onPress = () => {
          if (!isFocused) {
            setIndex(index);
          }
        };

        return (
          <React.Fragment key={index}>
            <Button
              // disabled={true}
              onPress={onPress}
              color={'primary'}
              shape="round"
              label={tab.label}
              variant="solid"
              size="large"
              style={animatedStyle}>
              {isFocused ? (
                <ButtonText
                  style={[a.text_sm, a.px_2xl, a.w_full]}
                  numberOfLines={1}>
                  {tab.label}
                </ButtonText>
              ) : (
                <View style={[a.w_full, a.items_center, a.justify_center]}>
                  <Ionicons
                    size={20}
                    name={tab.icon}
                    color={colors.yellow_1}
                  />
                </View>
              )}
            </Button>
            {index !== tabs.length - 1 && <Separator width={2} />}
          </React.Fragment>
        );
      })}
    </Row>
  );
}
