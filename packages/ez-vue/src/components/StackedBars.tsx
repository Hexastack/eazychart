import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  ChartContext,
  Direction,
  RectangleDatum,
  ScaleLinearOrBand,
} from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { ScaleOrdinal, scaleRectangleData } from 'eazychart-core/src';
import Bar from '@/components/shapes/Bar';

@Component({ components: { Bar } })
export default class StackedBars extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @InjectReactive('cartesianScale')
  private cartesianScale!: {
    xScale: ScaleLinearOrBand;
    yScale: ScaleLinearOrBand;
  };

  @Prop({
    type: String,
    required: true,
  })
  private readonly singleDomainKey!: string;

  @Prop({
    type: Array,
    required: true,
  })
  private readonly stackDomainKeys!: string[];

  @Prop({
    type: String as PropType<Direction>,
    required: true,
  })
  private readonly direction: Direction = Direction.VERTICAL;

  get colorScale() {
    return this.chart.getScale('colorScale') as ScaleOrdinal;
  }

  get scaledDataDict() {
    return this.stackDomainKeys.reduce(
      (acc: { [key: string]: RectangleDatum[] }, yDomainKey) => {
        acc[yDomainKey] = scaleRectangleData(
          this.chart.data,
          this.singleDomainKey,
          yDomainKey,
          this.cartesianScale.xScale,
          this.cartesianScale.yScale,
          this.colorScale,
          this.chart.dimensions,
          this.chart.isRTL,
        );
        return acc;
      },
      {},
    );
  }

  render() {
    const {
      scaledDataDict, chart, stackDomainKeys, colorScale, direction,
    } = this;

    return (
      <g class="ez-stacked-bars">
        {chart.data.map((_datum, idx) => (
          // The Domain keys still needs to be sorted.
          // We create a bar for every data row
          // Each bar is a stack bar where every element is a domain key.
          <g class="ez-stacked-bar">
            {stackDomainKeys.map((yDomainKey, domainIdx) => {
              const color = colorScale.scale(yDomainKey);
              const scaledData = scaledDataDict[yDomainKey][idx];
              // The first domain key will not be affected.
              const previousRectWidth = domainIdx !== 0
                ? scaledDataDict[stackDomainKeys[domainIdx - 1]][idx].width
                : 0;
              const previousRectHeight = domainIdx !== 0
                ? scaledDataDict[stackDomainKeys[domainIdx - 1]][idx].height
                : 0;
              // The height or the width of the current bar will be computed depending
              // to the orientaion
              // the height will be currentDKHeight - previousDKHeight (same for the width)
              const shapeDatum = {
                ...scaledData,
                width:
                  direction === Direction.HORIZONTAL
                    ? scaledData.width - previousRectWidth
                    : scaledData.width,
                height:
                  direction === Direction.VERTICAL
                    ? scaledData.height - previousRectHeight
                    : scaledData.height,
              };

              return (
                <Bar
                  key={`${yDomainKey}${idx}`}
                  shapeDatum={{ ...shapeDatum, color }}
                />
              );
            })}
          </g>
        ))}
      </g>
    );
  }
}
