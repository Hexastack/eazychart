import Vue from 'vue';
import Component from 'vue-class-component';
import { InjectReactive, Provide, Watch } from 'vue-property-decorator';
import {
  TooltipContext,
  ChartContext,
  Point,
  ShapeDatum,
  NormalizedDatum,
} from '@ez/core/src/types';
import { debounce } from '@ez/core/src';
import Fragment from '@/lib/Fragment';
import Tooltip from './Tooltip';

@Component
export default class TooltipProvider extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @Provide('tooltip')
  // @ts-ignore
  private tooltip: TooltipContext = {
    showTooltip: this.showTooltip,
    moveTooltip: debounce(this.moveTooltip, 50).bind(this),
    hideTooltip: this.hideTooltip,
  };

  private datum: NormalizedDatum | null = null;

  private shapeDatum: ShapeDatum | null = null;

  private isVisible = false;

  private mousePosition: Point = { x: 0, y: 0 };

  @Watch('chart.dimensions')
  onDimensionsChange() {
    this.mousePosition = {
      x: this.chart.dimensions.width / 2,
      y: this.chart.dimensions.height / 2,
    };
  }

  get domains() {
    return this.chart.scales
      .filter(({ definition }) => typeof definition.domainKey === 'string')
      .map(({ definition }) => definition.domainKey);
  }

  showTooltip(shapeDatum: ShapeDatum) {
    const d = shapeDatum.id in this.chart.dataDict
      ? this.chart.dataDict[shapeDatum.id]
      : null;
    this.datum = d;
    this.shapeDatum = shapeDatum;
    this.isVisible = true;
  }

  moveTooltip(_shapeDatum: ShapeDatum, event: MouseEvent) {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

  hideTooltip(_shapeDatum: ShapeDatum, _event: MouseEvent) {
    this.isVisible = false;
  }

  render() {
    const tooltipProps = {
      datum: this.datum,
      shapeDatum: this.shapeDatum,
      isVisible: this.isVisible,
      mousePosition: this.mousePosition,
      domains: this.domains,
    };
    const DefaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;
    const TooltipOverride = this.$scopedSlots.Tooltip
      ? this.$scopedSlots.Tooltip(tooltipProps)
      : null;
    return (
      <Fragment type="div" name="tooltip">
        {DefaultSlot}
        {TooltipOverride || <Tooltip props={tooltipProps} />}
      </Fragment>
    );
  }
}
