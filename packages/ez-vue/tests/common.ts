import { RenderResult } from '@testing-library/vue';

const svgWrapper = async (
  chartTestId: string,
  wrapper: RenderResult,
) => {
  const elementFindedByTestId = await wrapper.findByTestId(chartTestId);
  const svgWrapper = document.createElement('svg');
  svgWrapper.appendChild(elementFindedByTestId);
  return svgWrapper;
};

export default svgWrapper;
