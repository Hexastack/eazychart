import Vue from 'vue';
import Component from 'vue-class-component';
import { animate } from 'eazychart-core/src';
import { AnimationOptions, Interpolables } from 'eazychart-core/src/types';

type AnimationArguments = {
  from: Interpolables;
  to: Interpolables;
  options: AnimationOptions | undefined;
  // eslint-disable-next-line
  onUpdate: (v: any) => void;
  dependencies: string[];
};

@Component
export default class AnimationMixin extends Vue {
  public cancelAnimation: Function | null = null;

  // @ts-ignore
  private mounted() {
    this.animate();
    this.animationArguments.dependencies.forEach((dep) => {
      this.$watch(dep, this.animate, { deep: true });
    });
  }

  animate() {
    const {
      from,
      to,
      options,
      onUpdate,
    } = this.animationArguments;
    this.cancelAnimation && this.cancelAnimation();
    this.cancelAnimation = animate(from, to, options, onUpdate);
  }

  get animationArguments(): AnimationArguments {
    throw new Error(
      'The component using the mixin should implement the animationArguments() getter',
    );
  }
}
