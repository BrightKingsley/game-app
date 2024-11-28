import {
  AnimatableNumericValue,
  DimensionValue,
  FlexStyle,
  Image,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import * as tokens from '../ui/tokens';

export const a = {
  /**
   *  Positioning
   */
  fixed: {
    position: 'absolute',
  },
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
  inset_0: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  top_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      top: val,
    };
  },
  bottom_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      bottom: val,
    };
  },
  left_(val: number) {
    return {
      left: val,
    };
  },
  right_(val: number) {
    return {
      right: val,
    };
  },

  z_(val: number): StyleProp<ViewStyle> {
    return {
      zIndex: val,
    };
  },
  z_10: {
    zIndex: 10,
  },
  z_20: {
    zIndex: 20,
  },
  z_30: {
    zIndex: 30,
  },
  z_40: {
    zIndex: 40,
  },
  z_50: {
    zIndex: 50,
  },

  overflow_hidden: {
    overflow: 'hidden',
  },
  overflow_scroll: {
    overflow: 'scroll',
  },
  overflow_visible: {
    overflow: 'visible',
  },

  /**
   *  Width
   */
  w_full: {
    width: '100%',
  },
  w_95: {
    width: '95%',
  },
  w_90: {
    width: '90%',
  },
  w_85: {
    width: '85%',
  },
  w_80: {
    width: '80%',
  },
  w_70: {
    width: '70%',
  },
  w_60: {
    width: '60%',
  },
  w_50: {
    width: '50%',
  },
  w_40: {
    width: '40%',
  },
  w_30: {
    width: '30%',
  },
  w_20: {
    width: '20%',
  },
  w_10: {
    width: '10%',
  },
  w_5: {
    width: '5%',
  },

  w_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      width: val,
    };
  },
  /**
   *  Height
   */

  // h_full_v: {
  //   height: '100vh',
  // },

  h_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      height: val,
    };
  },

  h_full: {
    height: '100%',
  },

  h_100: {
    height: '100%',
  },
  h_95: {
    height: '95%',
  },
  h_90: {
    height: '90%',
  },
  h_85: {
    height: '85%',
  },
  h_80: {
    height: '80%',
  },
  h_75: {
    height: '75%',
  },
  h_70: {
    height: '70%',
  },
  h_65: {
    height: '65%',
  },
  h_60: {
    height: '60%',
  },
  h_50: {
    height: '50%',
  },
  h_40: {
    height: '40%',
  },
  h_30: {
    height: '30%',
  },
  h_20: {
    height: '20%',
  },
  h_10: {
    height: '10%',
  },
  h_5: {
    height: '5%',
  },

  /**
   * Border radius
   */
  rounded_(val: AnimatableNumericValue): StyleProp<ViewStyle> {
    return {borderRadius: val};
  },

  rounded_2xs: {
    borderRadius: tokens.borderRadius._2xs,
  },
  rounded_xs: {
    borderRadius: tokens.borderRadius.xs,
  },
  rounded_sm: {
    borderRadius: tokens.borderRadius.sm,
  },
  rounded_md: {
    borderRadius: tokens.borderRadius.md,
  },
  rounded_lg: {
    borderRadius: tokens.borderRadius.lg,
  },
  rounded_xl: {
    borderRadius: tokens.borderRadius.xl,
  },
  rounded_full: {
    borderRadius: 1000,
  },

  rounded_t_(val: AnimatableNumericValue): StyleProp<ViewStyle | TextStyle> {
    return {borderTopLeftRadius: val, borderTopRightRadius: val};
  },

  rounded_t_2xs: {
    borderTopLeftRadius: tokens.borderRadius._2xs,
    borderTopRightRadius: tokens.borderRadius._2xs,
  },
  rounded_t_xs: {
    borderTopLeftRadius: tokens.borderRadius.xs,
    borderTopRightRadius: tokens.borderRadius.xs,
  },
  rounded_t_sm: {
    borderTopLeftRadius: tokens.borderRadius.sm,
    borderTopRightRadius: tokens.borderRadius.sm,
  },
  rounded_t_md: {
    borderTopLeftRadius: tokens.borderRadius.md,
    borderTopRightRadius: tokens.borderRadius.md,
  },
  rounded_t_lg: {
    borderTopLeftRadius: tokens.borderRadius.lg,
    borderTopRightRadius: tokens.borderRadius.lg,
  },
  rounded_t_xl: {
    borderTopLeftRadius: tokens.borderRadius.xl,
    borderTopRightRadius: tokens.borderRadius.xl,
  },
  rounded_t_full: {
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
  },

  rounded_b_(val: AnimatableNumericValue): StyleProp<ViewStyle | TextStyle> {
    return {borderBottomLeftRadius: val, borderBottomRightRadius: val};
  },

  rounded_b_2xs: {
    borderBottomLeftRadius: tokens.borderRadius._2xs,
    borderBottomRightRadius: tokens.borderRadius._2xs,
  },
  rounded_b_xs: {
    borderBottomLeftRadius: tokens.borderRadius.xs,
    borderBottomRightRadius: tokens.borderRadius.xs,
  },
  rounded_b_sm: {
    borderBottomLeftRadius: tokens.borderRadius.sm,
    borderBottomRightRadius: tokens.borderRadius.sm,
  },
  rounded_b_md: {
    borderBottomLeftRadius: tokens.borderRadius.md,
    borderBottomRightRadius: tokens.borderRadius.md,
  },
  rounded_b_lg: {
    borderBottomLeftRadius: tokens.borderRadius.lg,
    borderBottomRightRadius: tokens.borderRadius.lg,
  },
  rounded_b_xl: {
    borderBottomLeftRadius: tokens.borderRadius.xl,
    borderBottomRightRadius: tokens.borderRadius.xl,
  },
  rounded_br_xl: {
    borderBottomRightRadius: tokens.borderRadius.xl,
  },
  rounded_b_full: {
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },

  /**
   * Flex
   */
  gap_2xs: {
    gap: tokens.space._2xs,
  },
  gap_xs: {
    gap: tokens.space.xs,
  },
  gap_sm: {
    gap: tokens.space.sm,
  },
  gap_md: {
    gap: tokens.space.md,
  },
  gap_lg: {
    gap: tokens.space.lg,
  },
  gap_xl: {
    gap: tokens.space.xl,
  },
  gap_2xl: {
    gap: tokens.space._2xl,
  },
  gap_3xl: {
    gap: tokens.space._3xl,
  },
  gap_4xl: {
    gap: tokens.space._4xl,
  },
  gap_5xl: {
    gap: tokens.space._5xl,
  },
  display_none: {
    display: 'none',
  },
  flex: {
    display: 'flex',
  },
  flex_col: {
    flexDirection: 'column',
  },
  flex_row: {
    flexDirection: 'row',
  },
  flex_col_reverse: {
    flexDirection: 'column-reverse',
  },
  flex_row_reverse: {
    flexDirection: 'row-reverse',
  },
  flex_wrap: {
    flexWrap: 'wrap',
  },
  flex_1: {
    flex: 1,
  },
  flex_(val: FlexStyle['flex']): StyleProp<ViewStyle> {
    return {
      flex: val,
    };
  },
  shrink_0: {
    flexShrink: 0,
  },
  flex_shrink: {
    flexShrink: 1,
  },
  flex_grow: {
    flexGrow: 1,
  },
  justify_start: {
    justifyContent: 'flex-start',
  },
  justify_center: {
    justifyContent: 'center',
  },
  justify_around: {
    justifyContent: 'space-around',
  },
  justify_between: {
    justifyContent: 'space-between',
  },
  justify_end: {
    justifyContent: 'flex-end',
  },
  items_center: {
    alignItems: 'center',
  },
  items_start: {
    alignItems: 'flex-start',
  },
  items_end: {
    alignItems: 'flex-end',
  },
  items_baseline: {
    alignItems: 'baseline',
  },
  items_stretch: {
    alignItems: 'stretch',
  },

  self_center: {
    alignSelf: 'center',
  },
  self_start: {
    alignSelf: 'flex-start',
  },
  self_end: {
    alignSelf: 'flex-end',
  },

  /**
   * Text
   */
  text_left: {
    textAlign: 'left',
  },
  text_center: {
    textAlign: 'center',
  },
  text_right: {
    textAlign: 'right',
  },
  text_2xs: {
    fontSize: tokens.fontSize._2xs,
    letterSpacing: 0.25,
  },
  text_xs: {
    fontSize: tokens.fontSize.xs,
    letterSpacing: 0.25,
  },
  text_sm: {
    fontSize: tokens.fontSize.sm,
    letterSpacing: 0.25,
  },
  text_md: {
    fontSize: tokens.fontSize.md,
    letterSpacing: 0.25,
  },
  text_lg: {
    fontSize: tokens.fontSize.lg,
    letterSpacing: 0.25,
  },
  text_xl: {
    fontSize: tokens.fontSize.xl,
    letterSpacing: 0.25,
  },
  text_2xl: {
    fontSize: tokens.fontSize._2xl,
    letterSpacing: 0.25,
  },
  text_3xl: {
    fontSize: tokens.fontSize._3xl,
    letterSpacing: 0.25,
  },
  text_4xl: {
    fontSize: tokens.fontSize._4xl,
    letterSpacing: 0.25,
  },
  text_5xl: {
    fontSize: tokens.fontSize._5xl,
    letterSpacing: 0.25,
  },
  leading_tight: {
    lineHeight: 1.15,
  },
  leading_snug: {
    lineHeight: 1.3,
  },
  tracking_normal: {
    letterSpacing: 0,
  },
  tracking_wide: {
    letterSpacing: 0.25,
  },
  font_(val: TextStyle['fontWeight']): StyleProp<TextStyle> {
    return {fontWeight: val};
  },
  font_normal: {
    fontWeight: tokens.fontWeight.normal,
  },
  font_semi_bold: {
    fontWeight: tokens.fontWeight.semibold,
  },
  font_bold: {
    fontWeight: tokens.fontWeight.bold,
  },
  italic: {
    fontStyle: 'italic',
  },

  uppercase: {
    textTransform: 'uppercase',
  },

  lowercase: {
    textTransform: 'lowercase',
  },

  capitalize: {
    textTransform: 'capitalize',
  },

  underline: {
    textDecorationLine: 'underline',
  },
  solid: {
    textDecorationStyle: 'solid',
  },

  decoration_tint_(val: string): StyleProp<TextStyle> {
    return {textDecorationColor: val};
  },

  /**
   * Border
   */
  border_(val: number): StyleProp<ViewStyle> {
    return {borderWidth: val};
  },

  border_b_(val: number): StyleProp<ViewStyle> {
    return {borderBottomWidth: val};
  },

  border_t_(val: number): StyleProp<ViewStyle> {
    return {borderTopWidth: val};
  },

  border_l_(val: number): StyleProp<ViewStyle> {
    return {borderLeftWidth: val};
  },

  border_r_(val: number): StyleProp<ViewStyle> {
    return {borderRightWidth: val};
  },

  border_0: {
    borderWidth: 0,
  },
  border: {
    borderWidth: 1,
  },
  border_t: {
    borderTopWidth: 1,
  },
  border_b: {
    borderBottomWidth: 1,
  },
  border_l: {
    borderLeftWidth: 1,
  },
  border_r: {
    borderRightWidth: 1,
  },

  border_tint(val: string) {
    return {borderColor: val};
  },

  border_b_tint(val: string) {
    return {borderBottomColor: val};
  },

  border_t_tint(val: string) {
    return {borderTopColor: val};
  },

  border_l_tint(val: string) {
    return {borderLeftColor: val};
  },

  border_r_tint(val: string) {
    return {borderRightColor: val};
  },

  /**
   * Shadow
   */
  shadow_sm: {
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  shadow_md: {
    shadowRadius: 16,
    shadowOpacity: 0.1,
    elevation: 16,
  },
  shadow_lg: {
    shadowRadius: 32,
    shadowOpacity: 0.1,
    elevation: 24,
  },

  /**
   * Padding
   */

  p_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      padding: val,
    };
  },
  p_0: {
    padding: 0,
  },
  p_2xs: {
    padding: tokens.space._2xs,
  },
  p_xs: {
    padding: tokens.space.xs,
  },
  p_sm: {
    padding: tokens.space.sm,
  },
  p_md: {
    padding: tokens.space.md,
  },
  p_lg: {
    padding: tokens.space.lg,
  },
  p_xl: {
    padding: tokens.space.xl,
  },
  p_2xl: {
    padding: tokens.space._2xl,
  },
  p_3xl: {
    padding: tokens.space._3xl,
  },
  p_4xl: {
    padding: tokens.space._4xl,
  },
  p_5xl: {
    padding: tokens.space._5xl,
  },

  px_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      paddingHorizontal: val,
    };
  },
  px_0: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  px_2xs: {
    paddingLeft: tokens.space._2xs,
    paddingRight: tokens.space._2xs,
  },
  px_xs: {
    paddingLeft: tokens.space.xs,
    paddingRight: tokens.space.xs,
  },
  px_sm: {
    paddingLeft: tokens.space.sm,
    paddingRight: tokens.space.sm,
  },
  px_md: {
    paddingLeft: tokens.space.md,
    paddingRight: tokens.space.md,
  },
  px_lg: {
    paddingLeft: tokens.space.lg,
    paddingRight: tokens.space.lg,
  },
  px_xl: {
    paddingLeft: tokens.space.xl,
    paddingRight: tokens.space.xl,
  },
  px_2xl: {
    paddingLeft: tokens.space._2xl,
    paddingRight: tokens.space._2xl,
  },
  px_3xl: {
    paddingLeft: tokens.space._3xl,
    paddingRight: tokens.space._3xl,
  },
  px_4xl: {
    paddingLeft: tokens.space._4xl,
    paddingRight: tokens.space._4xl,
  },
  px_5xl: {
    paddingLeft: tokens.space._5xl,
    paddingRight: tokens.space._5xl,
  },

  py_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      paddingVertical: val,
    };
  },
  py_0: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  py_2xs: {
    paddingTop: tokens.space._2xs,
    paddingBottom: tokens.space._2xs,
  },
  py_xs: {
    paddingTop: tokens.space.xs,
    paddingBottom: tokens.space.xs,
  },
  py_sm: {
    paddingTop: tokens.space.sm,
    paddingBottom: tokens.space.sm,
  },
  py_md: {
    paddingTop: tokens.space.md,
    paddingBottom: tokens.space.md,
  },
  py_lg: {
    paddingTop: tokens.space.lg,
    paddingBottom: tokens.space.lg,
  },
  py_xl: {
    paddingTop: tokens.space.xl,
    paddingBottom: tokens.space.xl,
  },
  py_2xl: {
    paddingTop: tokens.space._2xl,
    paddingBottom: tokens.space._2xl,
  },
  py_3xl: {
    paddingTop: tokens.space._3xl,
    paddingBottom: tokens.space._3xl,
  },
  py_4xl: {
    paddingTop: tokens.space._4xl,
    paddingBottom: tokens.space._4xl,
  },
  py_5xl: {
    paddingTop: tokens.space._5xl,
    paddingBottom: tokens.space._5xl,
  },

  pt_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      paddingTop: val,
    };
  },
  pt_0: {
    paddingTop: 0,
  },
  pt_2xs: {
    paddingTop: tokens.space._2xs,
  },
  pt_xs: {
    paddingTop: tokens.space.xs,
  },
  pt_sm: {
    paddingTop: tokens.space.sm,
  },
  pt_md: {
    paddingTop: tokens.space.md,
  },
  pt_lg: {
    paddingTop: tokens.space.lg,
  },
  pt_xl: {
    paddingTop: tokens.space.xl,
  },
  pt_2xl: {
    paddingTop: tokens.space._2xl,
  },
  pt_3xl: {
    paddingTop: tokens.space._3xl,
  },
  pt_4xl: {
    paddingTop: tokens.space._4xl,
  },
  pt_5xl: {
    paddingTop: tokens.space._5xl,
  },

  pb_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      paddingBottom: val,
    };
  },
  pb_0: {
    paddingBottom: 0,
  },
  pb_2xs: {
    paddingBottom: tokens.space._2xs,
  },
  pb_xs: {
    paddingBottom: tokens.space.xs,
  },
  pb_sm: {
    paddingBottom: tokens.space.sm,
  },
  pb_md: {
    paddingBottom: tokens.space.md,
  },
  pb_lg: {
    paddingBottom: tokens.space.lg,
  },
  pb_xl: {
    paddingBottom: tokens.space.xl,
  },
  pb_2xl: {
    paddingBottom: tokens.space._2xl,
  },
  pb_3xl: {
    paddingBottom: tokens.space._3xl,
  },
  pb_4xl: {
    paddingBottom: tokens.space._4xl,
  },
  pb_5xl: {
    paddingBottom: tokens.space._5xl,
  },

  pl_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      paddingLeft: val,
    };
  },
  pl_0: {
    paddingLeft: 0,
  },
  pl_2xs: {
    paddingLeft: tokens.space._2xs,
  },
  pl_xs: {
    paddingLeft: tokens.space.xs,
  },
  pl_sm: {
    paddingLeft: tokens.space.sm,
  },
  pl_md: {
    paddingLeft: tokens.space.md,
  },
  pl_lg: {
    paddingLeft: tokens.space.lg,
  },
  pl_xl: {
    paddingLeft: tokens.space.xl,
  },
  pl_2xl: {
    paddingLeft: tokens.space._2xl,
  },
  pl_3xl: {
    paddingLeft: tokens.space._3xl,
  },
  pl_4xl: {
    paddingLeft: tokens.space._4xl,
  },
  pl_5xl: {
    paddingLeft: tokens.space._5xl,
  },

  pr_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      paddingRight: val,
    };
  },
  pr_0: {
    paddingRight: 0,
  },
  pr_2xs: {
    paddingRight: tokens.space._2xs,
  },
  pr_xs: {
    paddingRight: tokens.space.xs,
  },
  pr_sm: {
    paddingRight: tokens.space.sm,
  },
  pr_md: {
    paddingRight: tokens.space.md,
  },
  pr_lg: {
    paddingRight: tokens.space.lg,
  },
  pr_xl: {
    paddingRight: tokens.space.xl,
  },
  pr_2xl: {
    paddingRight: tokens.space._2xl,
  },
  pr_3xl: {
    paddingRight: tokens.space._3xl,
  },
  pr_4xl: {
    paddingRight: tokens.space._4xl,
  },
  pr_5xl: {
    paddingRight: tokens.space._5xl,
  },
  /**
   * Margin
   */

  m_(val: DimensionValue): StyleProp<ViewStyle | TextStyle> {
    return {
      margin: val,
    };
  },
  m_0: {
    margin: 0,
  },
  m_2xs: {
    margin: tokens.space._2xs,
  },
  m_xs: {
    margin: tokens.space.xs,
  },
  m_sm: {
    margin: tokens.space.sm,
  },
  m_md: {
    margin: tokens.space.md,
  },
  m_lg: {
    margin: tokens.space.lg,
  },
  m_xl: {
    margin: tokens.space.xl,
  },
  m_2xl: {
    margin: tokens.space._2xl,
  },
  m_3xl: {
    margin: tokens.space._3xl,
  },
  m_4xl: {
    margin: tokens.space._4xl,
  },
  m_5xl: {
    margin: tokens.space._5xl,
  },
  m_auto: {
    margin: 'auto',
  },

  mx_(val: DimensionValue): StyleProp<ViewStyle | TextStyle> {
    return {
      marginHorizontal: val,
    };
  },

  mx_0: {
    marginLeft: 0,
    marginRight: 0,
  },
  mx_2xs: {
    marginLeft: tokens.space._2xs,
    marginRight: tokens.space._2xs,
  },
  mx_xs: {
    marginLeft: tokens.space.xs,
    marginRight: tokens.space.xs,
  },
  mx_sm: {
    marginLeft: tokens.space.sm,
    marginRight: tokens.space.sm,
  },
  mx_md: {
    marginLeft: tokens.space.md,
    marginRight: tokens.space.md,
  },
  mx_lg: {
    marginLeft: tokens.space.lg,
    marginRight: tokens.space.lg,
  },
  mx_xl: {
    marginLeft: tokens.space.xl,
    marginRight: tokens.space.xl,
  },
  mx_2xl: {
    marginLeft: tokens.space._2xl,
    marginRight: tokens.space._2xl,
  },
  mx_3xl: {
    marginLeft: tokens.space._3xl,
    marginRight: tokens.space._3xl,
  },
  mx_4xl: {
    marginLeft: tokens.space._4xl,
    marginRight: tokens.space._4xl,
  },
  mx_5xl: {
    marginLeft: tokens.space._5xl,
    marginRight: tokens.space._5xl,
  },
  mx_auto: {
    marginHorizontal: 'auto',
  },

  my_(val: DimensionValue): StyleProp<ViewStyle | TextStyle> {
    return {
      marginVertical: val,
    };
  },

  my_0: {
    marginTop: 0,
    marginBottom: 0,
  },
  my_2xs: {
    marginTop: tokens.space._2xs,
    marginBottom: tokens.space._2xs,
  },
  my_xs: {
    marginTop: tokens.space.xs,
    marginBottom: tokens.space.xs,
  },
  my_sm: {
    marginTop: tokens.space.sm,
    marginBottom: tokens.space.sm,
  },
  my_md: {
    marginTop: tokens.space.md,
    marginBottom: tokens.space.md,
  },
  my_lg: {
    marginTop: tokens.space.lg,
    marginBottom: tokens.space.lg,
  },
  my_xl: {
    marginTop: tokens.space.xl,
    marginBottom: tokens.space.xl,
  },
  my_2xl: {
    marginTop: tokens.space._2xl,
    marginBottom: tokens.space._2xl,
  },
  my_3xl: {
    marginTop: tokens.space._3xl,
    marginBottom: tokens.space._3xl,
  },
  my_4xl: {
    marginTop: tokens.space._4xl,
    marginBottom: tokens.space._4xl,
  },
  my_5xl: {
    marginTop: tokens.space._5xl,
    marginBottom: tokens.space._5xl,
  },
  my_auto: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  mt_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      marginTop: val,
    };
  },
  mt_0: {
    marginTop: 0,
  },
  mt_2xs: {
    marginTop: tokens.space._2xs,
  },
  mt_xs: {
    marginTop: tokens.space.xs,
  },
  mt_sm: {
    marginTop: tokens.space.sm,
  },
  mt_md: {
    marginTop: tokens.space.md,
  },
  mt_lg: {
    marginTop: tokens.space.lg,
  },
  mt_xl: {
    marginTop: tokens.space.xl,
  },
  mt_2xl: {
    marginTop: tokens.space._2xl,
  },
  mt_3xl: {
    marginTop: tokens.space._3xl,
  },
  mt_4xl: {
    marginTop: tokens.space._4xl,
  },
  mt_5xl: {
    marginTop: tokens.space._5xl,
  },
  mt_auto: {
    marginTop: 'auto',
  },

  mb_(val: DimensionValue): StyleProp<ViewStyle> {
    return {
      marginBottom: val,
    };
  },
  mb_0: {
    marginBottom: 0,
  },
  mb_2xs: {
    marginBottom: tokens.space._2xs,
  },
  mb_xs: {
    marginBottom: tokens.space.xs,
  },
  mb_sm: {
    marginBottom: tokens.space.sm,
  },
  mb_md: {
    marginBottom: tokens.space.md,
  },
  mb_lg: {
    marginBottom: tokens.space.lg,
  },
  mb_xl: {
    marginBottom: tokens.space.xl,
  },
  mb_2xl: {
    marginBottom: tokens.space._2xl,
  },
  mb_3xl: {
    marginBottom: tokens.space._3xl,
  },
  mb_4xl: {
    marginBottom: tokens.space._4xl,
  },
  mb_5xl: {
    marginBottom: tokens.space._5xl,
  },
  mb_6xl: {
    marginBottom: tokens.space._6xl,
  },
  mb_auto: {
    marginBottom: 'auto',
  },

  ml_(val: DimensionValue): StyleProp<ViewStyle | TextStyle> {
    return {
      marginLeft: val,
    };
  },
  ml_0: {
    marginLeft: 0,
  },
  ml_2xs: {
    marginLeft: tokens.space._2xs,
  },
  ml_xs: {
    marginLeft: tokens.space.xs,
  },
  ml_sm: {
    marginLeft: tokens.space.sm,
  },
  ml_md: {
    marginLeft: tokens.space.md,
  },
  ml_lg: {
    marginLeft: tokens.space.lg,
  },
  ml_xl: {
    marginLeft: tokens.space.xl,
  },
  ml_2xl: {
    marginLeft: tokens.space._2xl,
  },
  ml_3xl: {
    marginLeft: tokens.space._3xl,
  },
  ml_4xl: {
    marginLeft: tokens.space._4xl,
  },
  ml_5xl: {
    marginLeft: tokens.space._5xl,
  },
  ml_auto: {
    marginLeft: 'auto',
  },

  mr_(val: DimensionValue): StyleProp<ViewStyle | TextStyle> {
    return {
      marginRight: val,
    };
  },
  mr_0: {
    marginRight: 0,
  },
  mr_2xs: {
    marginRight: tokens.space._2xs,
  },
  mr_xs: {
    marginRight: tokens.space.xs,
  },
  mr_sm: {
    marginRight: tokens.space.sm,
  },
  mr_md: {
    marginRight: tokens.space.md,
  },
  mr_lg: {
    marginRight: tokens.space.lg,
  },
  mr_xl: {
    marginRight: tokens.space.xl,
  },
  mr_2xl: {
    marginRight: tokens.space._2xl,
  },
  mr_3xl: {
    marginRight: tokens.space._3xl,
  },
  mr_4xl: {
    marginRight: tokens.space._4xl,
  },
  mr_5xl: {
    marginRight: tokens.space._5xl,
  },
  mr_auto: {
    marginRight: 'auto',
  },

  // Positioning
  right_0: {
    right: 0,
  },
  left_0: {
    left: 0,
  },
  top_0: {
    top: 0,
  },
  bottom_0: {
    bottom: 0,
  },

  input_opacity_sm: {backgroundColor: 'rgba(225,225,225, 0.5)'},
  input_opacity_md: {backgroundColor: 'rgba(225,225,225, 0.08)'},
  input_opacity_lg: {backgroundColor: 'rgba(225,225,225, 0.05)'},
  input_opacity_dark: {backgroundColor: 'rgba(0,0,0, 0.05)'},

  opacity_(val: AnimatableNumericValue): StyleProp<ViewStyle | TextStyle> {
    return {
      opacity: val,
    };
  },

  bg_(val: string) {
    return {
      backgroundColor: val,
    };
  },
  bg_transparent: {
    backgroundColor: 'transparent',
  },

  text_(val: string): TextStyle {
    return {
      color: val,
    };
  },
} as const;
