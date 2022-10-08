import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export type LegendToggleHandler = (key: string, isActive: boolean, color: string) => void;

@Component
export default class LegendItem extends Vue {
  @Prop({
    type: String,
    required: true,
  })
  private readonly label!: string;

  @Prop({
    type: String,
    required: true,
  })
  private readonly color!: string;

  private isActive = true;

  handleClick() {
    this.isActive = !this.isActive;
    this.$emit('toggle', this.label, this.isActive, this.color);
  }

  render() {
    const {
      label, color, isActive, handleClick,
    } = this;
    return (
      <div
        class={{ 'ez-legend-key': true, 'ez-legend-disable': !isActive }}
        onClick={handleClick}
        role="button"
      >
        <div
          class="ez-legend-box"
          style={{
            backgroundColor: isActive ? color : 'rgba(255, 255, 255, 0)',
            border: `${color} 2px solid`,
          }}
        ></div>
        <span class="ez-legend-text">{label}</span>
      </div>
    );
  }
}
