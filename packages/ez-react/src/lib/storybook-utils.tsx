import React, { FC } from 'react';
import { Story } from '@storybook/react/dist/ts3.9/client/index';
import { unFlattenArgs, ArgsType } from 'eazychart-dev/storybook/utils';

export const ChartWrapper: FC<{ style?: any }> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

// Wraps the stories and passes the unflattened args to them
export const buildTemplate = <T extends any>(
  storyFn: Story<T>
): ((args: T, context: any) => React.ReactElement<unknown>) => {
  return (args: T, context: any) => {
    const compactedArgs: T = unFlattenArgs(args as ArgsType);
    return storyFn(compactedArgs, context);
  };
};
