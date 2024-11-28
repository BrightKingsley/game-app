// import {useModalControls} from '#/state/modals';
// import {NigeriaIcon, UnitedKingdomIcon} from '#/lib/icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Alert, Image, ScrollView, View} from 'react-native';

import {useAppSelector} from '#/hooks/store';
import {a} from '#/lib/style/atoms';

import {CarAwaiting} from '$/src/assets/images';
import useApi from '$/src/hooks/api/useApi';

import {Button, Column, Row, Separator} from '../../global';
import {ButtonText} from '../../global/Button';
import {useModalControls} from '../../global/modals/ModalState';
import {Text} from '../../global/Themed';
import ViewHeader from '../../global/ViewHeader';

// NOTE: snapPoints holds the default height point for modal
export const snapPoints = ['70%'];

export const enablePanDownToClose = true;

export default function RideInfo() {
  const {closeModal} = useModalControls();
  const {orderRequest} = useAppSelector(state => state.order);

  return (
    <View style={[a.px_md]}>
      <ViewHeader canGoBack backPressHandler={closeModal} />
      <ScrollView showsVerticalScrollIndicator={false} style={[]}>
        <View style={[]}>
          <Image
            style={
              [a.w_(150), a.h_(80), a.mx_auto] as React.ComponentProps<
                typeof Image
              >['style']
            }
            source={CarAwaiting}
          />
          <Text style={[a.font_bold, a.text_md, a.text_center, a.mt_2xl]}>
            Transit
          </Text>
        </View>
        <Column style={[{gap: 10}]}>
          <InfoRow label="Fare" value={`$${orderRequest?.fare}`} />
          <InfoRow label="Wait Time" value="$10/Min" />
          <InfoRow label="Booking Fee" value="2%" />
          <InfoRow label="Discount" value="15%" />
          <InfoRow label="Seats" value="4" />
        </Column>
        <View style={[a.mt_2xl]}>
          <Text style={[a.text_(colors.yellow_1)]}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel,
            provident quo impedit possimus accusantium id. Sequi quisquam
            tempore atque tempora?
          </Text>
        </View>
      </ScrollView>
    </View>
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
