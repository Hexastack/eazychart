import React, { FC } from 'react';

export interface FragmentProps {
  type: string;
  name: string;
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
