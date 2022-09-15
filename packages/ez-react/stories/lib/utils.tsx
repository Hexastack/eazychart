export const baseChartArgTypes = {
  isRTL: {
    control: { type: 'boolean' },
  },
};

export const ChartWrapper = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};
