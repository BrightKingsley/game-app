import {KeyboardAvoidingView, Platform} from 'react-native';

import {ModalContainer} from '$/src/components/global/modals/Modal';
import {ModalProvider} from '$/src/components/global/modals/ModalState';
import {FadeScreenWrapper} from '$/src/components/utils';
import {a} from '$/src/lib/style/atoms';
import {AccountScreen} from '$/src/screens/Account';

export default function Account() {
  return (
    <ModalProvider>
      <KeyboardAvoidingView
        keyboardVerticalOffset={60}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[a.flex_1]}>
        <FadeScreenWrapper>
          <AccountScreen account={'baconbrix'} />
        </FadeScreenWrapper>
        {/* <ModalContainer /> */}
      </KeyboardAvoidingView>
    </ModalProvider>
  );
}
