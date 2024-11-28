import Wallet from '$/src/components/feature/Wallet/Wallet';
import Island from '$/src/components/global/Island';
import {ModalContainer} from '$/src/components/global/modals/Modal';
import {ModalProvider} from '$/src/components/global/modals/ModalState';

export default function WalletScreen() {
  return (
    <>
      <Island />
      <ModalProvider>
        <Wallet />
        <ModalContainer />
      </ModalProvider>
    </>
  );
}
