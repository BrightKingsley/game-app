// import {useModalControls} from '#/state/modals';
// import {NigeriaIcon, UnitedKingdomIcon} from '#/lib/icons';
import {useUser} from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Image, ImageStyle, View} from 'react-native';

import {a} from '#/lib/style/atoms';

import {CarAwaiting} from '$/src/assets/images';
import {useAppSelector} from '$/src/hooks/store';

import {Row, Separator} from '../../global';
import {useModalControls} from '../../global/modals/ModalState';
import {Text} from '../../global/Themed';
import ViewHeader from '../../global/ViewHeader';
import {Container} from '../../utils';

export const snapPoints = ['70%'];

export const enablePanDownToClose = true;

export default function RideInfo() {
  const {closeModal} = useModalControls();
  const {riderInfo} = useAppSelector(state => state.order);

  return (
    <Container style={[a.flex_1]}>
      <ViewHeader
        title="Rider Details"
        canGoBack
        backPressHandler={closeModal}
      />
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[a.py_3xl]}
        style={[a.flex_1]}>
        <View style={[a.bg_(colors.light_2), a.relative, a.items_center]}>
          <Image
            style={
              [a.w_('100%'), a.h_(200), a.mx_auto] as React.ComponentProps<
                typeof Image
              >['style']
            }
            source={CarAwaiting}
          />
          <View
            style={[
              a.absolute,
              a.bottom_(-90),
              a.z_50,
              a.items_center,
              a.justify_center,
            ]}>
            <Image
              style={[a.w_(80), a.h_(80), a.rounded_full] as ImageStyle}
              source={{uri: riderInfo?.photo}}
            />
            <Text style={[a.font_bold, a.text_md, a.text_center, a.mt_md]}>
              {riderInfo?.firstName} {riderInfo?.lastName}
            </Text>
            <Text style={[a.font_bold, a.text_md, a.text_center, a.mt_xs]}>
              {'08021248576'}
            </Text>
          </View>
        </View>

        <View style={[a.mt_(110)]}>
          <Text style={[a.text_(colors.dark_3), a.text_center]}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel,
            provident quo impedit possimus accusantium id. Sequi quisquam
            tempore atque tempora?
          </Text>
        </View>

        {/* <Column style={[{gap: 10}, a.mt_2xl]}>
          <InfoRow label="Fare" value="$1300" />
          <InfoRow label="Wait Time" value="$10/Min" />
          <InfoRow label="Booking Fee" value="2%" />
          <InfoRow label="Discount" value="15%" />
          <InfoRow label="Seats" value="4" />
        </Column> */}
      </BottomSheetScrollView>
    </Container>
  );
}

function InfoRow({
  label = 'Fare',
  value = '$1300',
}: {
  label: string;
  value: string;
}) {
  return (
    <Row>
      <Text style={[a.font_semi_bold, a.text_md]}>{label}</Text>
      <Separator
        style={[
          a.flex_1,
          a.mx_(5),
          a.border_b,
          a.border_b_tint(colors.light_2),
          a.h_85,
        ]}
      />
      <Text style={[a.font_semi_bold, a.text_md]}>{value}</Text>
    </Row>
  );
}
