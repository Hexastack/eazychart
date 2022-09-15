import { Fragment } from '@/lib/Fragment';
import React, { FC } from 'react';

export interface LegendProviderProps {
  Legend?: JSX.Element;
  isWrapped?: boolean;
}

export const LegendProvider: FC<LegendProviderProps> = ({
  Legend,
  children,
  isWrapped = true,
}) => {
  return isWrapped ? (
    <Fragment type="div" name="filter">
      {children}
      {Legend}
    </Fragment>
  ) : (
    <>
      {children}
      {Legend}
    </>
  );
};
