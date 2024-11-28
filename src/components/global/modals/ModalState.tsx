import {BottomSheetProps} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {useCallback, useEffect} from 'react';

import {useNonReactiveCallback} from '$/src/hooks/useNonReactiveCallbacks';
import {moveStringToEnd} from '$/src/lib/utils/helpers/arrays';

import modalContent from './ModalContent';

export type Modal = keyof typeof modalContent;

const ModalContext = React.createContext<{
  isModalActive: boolean;
  activeModals: Modal[];
  modalRef: React.RefObject<BottomSheetMethods> | null;
}>({
  isModalActive: false,
  activeModals: [],
  modalRef: null,
});

const ModalControlContext = React.createContext<{
  openModal: (modal: Modal, props?: Partial<BottomSheetProps>) => void;
  closeModal: () => boolean;
  closeAllModals: () => void;
  setupModal: (modalRef: React.RefObject<BottomSheetMethods>) => void;
  modalProps: Partial<BottomSheetProps>;
}>({
  openModal: () => {},
  closeModal: () => false,
  closeAllModals: () => {},
  setupModal: () => {},
  modalProps: {children: <></>},
});
/**
 * @deprecated DO NOT USE THIS unless you have no other choice.
 */
export let unstable_openModal: (
  modal: Modal,
  props: BottomSheetProps,
) => void = () => {
  throw new Error('ModalContext is not initialized');
};
/**
 * @deprecated DO NOT USE THIS unless you have no other choice.
 */
export let unstable_closeModal: () => boolean = () => {
  throw new Error('ModalContext is not initialized');
};

export function ModalProvider({children}: React.PropsWithChildren<{}>) {
  const [activeModals, setActiveModals] = React.useState<Modal[]>([]);
  const [modalProps, setModalProps] = React.useState<Partial<BottomSheetProps>>(
    {
      children: <></>,
    },
  );
  const [modalRef, setModalRef] =
    React.useState<React.RefObject<BottomSheetMethods> | null>(null);

  const setupModal = useNonReactiveCallback((ref: typeof modalRef) => {
    console.log('SETUP_MODAL', ref);
    setModalRef(ref);
  });

  const openModal = useCallback(
    (modal: Modal, props?: Partial<BottomSheetProps>) => {
      setActiveModals(modals => {
        const sortedModals = moveStringToEnd<Modal>(modals, modal);
        return sortedModals;
      });

      setModalProps(props || {});
    },
    [],
  );

  useEffect(() => {
    console.log('EFFECT: ', modalRef);
  }, [modalRef]);
  // const closeModal = useNonReactiveCallback(() => {
  //   let wasActive = activeModals.length > 0;
  //   setActiveModals(modals => {
  //     return modals.slice(0, -1);
  //   });
  //   return wasActive;
  // });
  const closeModal = useCallback(() => {
    console.debug({modalRef});
    modalRef?.current?.close();
    let wasActive = true;
    setTimeout(() => {
      let active = activeModals.length > 0;
      setActiveModals(modals => {
        return modals.slice(0, -1);
      });
      wasActive = active;
    }, 100);

    return wasActive;
  }, [modalRef]);

  const closeAllModals = useNonReactiveCallback(() => {
    setActiveModals([]);
  });

  unstable_openModal = openModal;
  unstable_closeModal = closeModal;

  // const state = React.useMemo(
  //   () => ({
  //     isModalActive: activeModals.length > 0,
  //     activeModals,
  //   }),
  //   [activeModals.length],
  // );

  const state = {
    activeModals,
    isModalActive: activeModals.length > 0,
    modalRef,
  };

  const methods = React.useMemo(
    () => ({
      openModal,
      closeModal,
      closeAllModals,
      setupModal,
    }),
    [openModal, closeModal, closeAllModals, setupModal],
  );

  useEffect(() => {}, [activeModals, activeModals.length]);

  return (
    <ModalContext.Provider value={state}>
      <ModalControlContext.Provider value={{...methods, modalProps}}>
        {children}
      </ModalControlContext.Provider>
    </ModalContext.Provider>
  );
}

export function useModals() {
  return React.useContext(ModalContext);
}
export function useModalControls() {
  return React.useContext(ModalControlContext);
}
