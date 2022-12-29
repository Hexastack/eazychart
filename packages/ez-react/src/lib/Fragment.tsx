import React, { FC } from 'react';

export interface FragmentProps {
  type: string;
  name: string;
  children: React.ReactNode;
}

export const Fragment: FC<FragmentProps> = ({ type, name, children }) => {
  return React.createElement(
    type,
    {
      className: `ez-fragment-${name}`,
    },
    children
  );
};
