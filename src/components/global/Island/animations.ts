import {
  BounceInUp,
  BounceOutUp,
  Keyframe,
  RollInRight,
  ZoomInUp,
} from 'react-native-reanimated';

// Customized BounceInUp animation
export const CustomBounceInUp = BounceInUp.springify()
  .damping(20)
  .stiffness(100)
  .mass(1)
  .duration(1000);

export const CustomZoomInUp = ZoomInUp.springify()
  .damping(20)
  .stiffness(100)
  .mass(1)
  .duration(1000);

export const CustomRollInRight = RollInRight.springify()
  .damping(20)
  .stiffness(100)
  .mass(1)
  .duration(1000);

// Customized BounceOutUp animation
export const CustomBounceOutUp = BounceOutUp.springify()
  .damping(20)
  .stiffness(100)
  .mass(1)
  .duration(1000);

export const CustomBounceInRight = new Keyframe({
  0: {
    transform: [{translateX: 100}],
    opacity: 0,
  },
  50: {
    transform: [{translateX: -10}],
    opacity: 1,
  },
  100: {
    transform: [{translateX: 0}],
    opacity: 1,
  },
}).duration(1000);
//   .easing(Easing.bounce);

export const CustomBounceOutRight = new Keyframe({
  0: {
    transform: [{translateX: 0}],
    opacity: 1,
  },
  50: {
    transform: [{translateX: -10}],
    opacity: 1,
  },
  100: {
    transform: [{translateX: 100}],
    opacity: 0,
  },
}).duration(1000);

export const CustomBounceOutLeft = new Keyframe({
  0: {
    transform: [{translateX: 0}],
    opacity: 1,
  },
  50: {
    transform: [{translateX: 10}],
    opacity: 1,
  },
  100: {
    transform: [{translateX: -100}],
    opacity: 0,
  },
}).duration(1000);

//   .easing(Easing.bounce);
