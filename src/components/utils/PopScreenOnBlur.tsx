import {useFocusEffect, useRouter, useSegments} from 'expo-router';
import React, {PropsWithChildren} from 'react';

export default function PopScreenOnBlur({children}: PropsWithChildren) {
  const router = useRouter();
  const segments = useSegments();

  useFocusEffect(
    React.useCallback(() => {
      return () => {

        // Screen is unfocused
        // Remove this screen from the stack
        router.dismiss();
      };
    }, [router]),
  );
  return <>{children}</>;
}
