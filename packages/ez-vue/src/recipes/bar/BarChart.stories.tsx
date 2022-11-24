import { Meta, Story } from '@storybook/vue';
import { ChartWrapper, ResizableChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  setColorArgs,
  flattenColors,
  baseChartArgTypes,
} from 'eazychart-dev/storybook/utils';
import {
  animationOptions,
  colors,
  rawData,
} from 'eazychart-dev/storybook/data';
import ResponsiveChartContainer from '@/components/ResponsiveChartContainer';
import BarChart from './BarChart';

const barChartArgTypes = {
  colors: {
    table: {
      disable: true,
    },
  },
  'xAxis.nice': {
    control: { type: 'number' },
    table: { category: 'Axis Options', defaultValue: { summary: '2' } },
    description: "Rounds the domain to 'nice' values ex: [-0.78,0.9] to [-1,1]",
  },
  yAxis: {
    table: {
      disable: true,
    },
  },
  ...baseChartArgTypes,
  ...setColorArgs(colors),
};

const meta: Meta = {
  title: 'Vue/Bar Chart',
  component: BarChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: barChartArgTypes,
};
export default meta;

type BarChartProps = InstanceType<typeof BarChart>['$props'];

const DefaultTemplate: Story = buildTemplate((args: BarChartProps) => ({
  components: { BarChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <BarChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

const TemplateWithParentDimensions: Story = buildTemplate(
  (args: BarChartProps) => ({
    title: 'Withparent',
    components: { BarChart, ResizableChartWrapper, ResponsiveChartContainer },
    props: {
      allPropsFromArgs: {
        default: () => args,
      },
    },
    template: `
    <ResizableChartWrapper>
      <ResponsiveChartContainer>
        <BarChart v-bind="allPropsFromArgs" />
      </ResponsiveChartContainer>
    </ResizableChartWrapper>
  `,
  }),
);

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});
export const Resizable = TemplateWithParentDimensions.bind({});

const initialArguments = {
  ...flattenArgs({
    grid: { directions: [] },
    xAxis: {
      domainKey: 'value',
      title: 'Count',
      nice: 2,
    },
    yAxis: {
      domainKey: 'name',
      title: 'Letter',
    },
    padding: {
      left: 150,
      bottom: 100,
      right: 150,
      top: 100,
    },
    animationOptions,
    isRTL: false,
    data: rawData,
  }),
  ...flattenColors(colors),
};

Default.args = {
  ...initialArguments,
  ...flattenArgs({ dimensions: { width: 800, height: 600 } }),
};

Resizable.args = initialArguments;
