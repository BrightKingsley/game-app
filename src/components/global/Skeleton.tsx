import {MotiSkeletonProps} from 'moti/build/skeleton/types';
import {Skeleton as DefaultSkeleton} from 'moti/skeleton';
import React, {PropsWithChildren} from 'react';

export default function Skeleton({
  children,
  ...props
}: PropsWithChildren<Partial<MotiSkeletonProps>>) {
  return (
    <DefaultSkeleton colorMode="light" radius={'round'} {...props}>
      {children}
    </DefaultSkeleton>
  );
}
