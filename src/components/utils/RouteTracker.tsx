import {Href} from 'expo-router';
import {useRootNavigationState, useRouter, useSegments} from 'expo-router';
import {useEffect, useState} from 'react';

let prevRouteSegments: string[] = [];
export default function RouteTracker() {
  //   const [prevRouteSegments, setPrevRouteSegments] = useState<
  //     Href<string | object>[]
  //   >([]);
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const router = useRouter();

  useEffect(() => {
    // if (navigationState?.key) {
    //   // Navigation state has changed
    //   console.log('Current route segments:', segments, {prevRouteSegments});
    //   //   setPrevRouteSegments(segments as any);
    //   console.log(
    //     prevRouteSegments[prevRouteSegments.indexOf('(drawer)') + 1],
    //     segments[segments.indexOf('(drawer)' as never) + 1],
    //     prevRouteSegments[prevRouteSegments.indexOf('(drawer)') + 1] ===
    //       segments[segments.indexOf('(drawer)' as never) + 1],
    //     prevRouteSegments[prevRouteSegments.indexOf('(drawer)') + 2],
    //   );
    //   if (
    //     prevRouteSegments[prevRouteSegments.indexOf('(drawer)') + 1] !==
    //       segments[segments.indexOf('(drawer)' as never) + 1] &&
    //     prevRouteSegments[prevRouteSegments.indexOf('(drawer)') + 2] !== undefined
    //   ) {
    //     router.dismiss();
    //   }
    //   prevRouteSegments = segments as any;
    // }
  }, [navigationState, segments]);

  return null; // This component doesn't render anything
}
