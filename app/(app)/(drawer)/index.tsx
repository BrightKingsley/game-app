import {ModalContainer} from '$/src/components/global/modals/Modal';
import {ModalProvider} from '$/src/components/global/modals/ModalState';
import {FadeScreenWrapper} from '$/src/components/utils';
import Home from '$/src/screens/Home';

export default function HomeScreen() {
  return (
    <ModalProvider>
      <FadeScreenWrapper>
        <Home />
      </FadeScreenWrapper>
      {/* <ModalContainer /> */}
    </ModalProvider>
  );
}
