import * as EditImports from '../../../screens/Account/Edit';
import * as ChatImports from '../../feature/Chat/Chat';
import * as AwaitingResponseImports from '../../feature/Order/CreateOrderModal/AwaitingResponse';
import * as ConfirmOrderImports from '../../feature/Order/CreateOrderModal/ConfirmOrder';
import * as OrderDetailsImports from '../../feature/Order/CreateOrderModal/OrderDetails';
import * as EnrouteImports from '../../feature/Order/EnRoute';
import * as RideInfoImports from '../../feature/Order/RideInfo';
import * as RiderDetailsImports from '../../feature/Order/RiderDetails';
import * as TopUpImports from '../../feature/Wallet/TopUp';
import * as WalletImports from '../../feature/Wallet/Wallet';
import {FadeScreenWrapper} from '../../utils';

const {default: RideInfoComponent, ...rideInfoOptions} = RideInfoImports;
const {default: OrderDetailsComponent, ...orderDetailsOptions} =
  OrderDetailsImports;
const {default: ConfirmOrderComponent, ...confirmOrderOptions} =
  ConfirmOrderImports;
const {default: AwaitingResponseComponent, ...awaitingResponseOptions} =
  AwaitingResponseImports;
const {default: ChatComponent, ...chatOptions} = ChatImports;
const {default: EditComponent, ...editOptions} = EditImports;
const {default: EnrouteComponent, ...enrouteOptions} = EnrouteImports;
const {default: RiderDetailsComponent, ...riderDetailsOptions} =
  RiderDetailsImports;
const {default: TopUpComponent, ...topUpOptions} = TopUpImports;
const {default: WalletComponent, ...walletOptions} = WalletImports;

// Define the modalContent object with proper typing for each bottom sheet
const modalContent = {
  // 'create-order': {
  //   children: <CreateOrderComponent />,
  //   ...createOrderOptions,
  // },
  'ride-info': {
    children: <RideInfoComponent />,
    ...rideInfoOptions,
  },
  'order-details': {
    children: <OrderDetailsComponent />,
    ...orderDetailsOptions,
  },
  'confirm-order': {
    children: <ConfirmOrderComponent />,
    ...confirmOrderOptions,
  },
  'awaiting-response': {
    children: <AwaitingResponseComponent />,
    ...awaitingResponseOptions,
  },
  enroute: {
    children: <EnrouteComponent />,
    ...enrouteOptions,
  },
  'rider-details': {
    children: <RiderDetailsComponent />,
    ...riderDetailsOptions,
  },
  chat: {
    children: <ChatComponent />,
    ...chatOptions,
  },
  edit: {
    children: <EditComponent />,
    ...editOptions,
  },
  'top-up': {
    children: (
      <FadeScreenWrapper>
        <TopUpComponent />
      </FadeScreenWrapper>
    ),
    ...topUpOptions,
  },
  wallet: {
    children: <WalletComponent />,
    ...walletOptions,
  },
};
export default modalContent;
