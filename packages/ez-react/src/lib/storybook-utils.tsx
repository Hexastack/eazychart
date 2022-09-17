import React, { FC } from 'react';

export const baseChartArgTypes = {
  isRTL: {
    control: { type: 'boolean' },
  },
};

export const ChartWrapper: FC<{ style?: any }> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};
