import {
  line,
  area,
  curveLinear,
  curveBasis,
  curveBumpX,
  curveBumpY,
  curveBundle,
  curveCardinal,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
} from 'd3-shape';
import { AreaCurve, AreaData, LineData, LineCurve } from './types';

const d3Curves = {
  curveLinear,
  curveBasis,
  curveBumpX,
  curveBumpY,
  curveBundle,
  curveCardinal,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
};

/**
 * Constructs a new line generator with the provided settings and generates the path.
 * @param shapeData line data
 * @param curve Sets the curve factory and returns this line generator.
 * @param beta A constant value in the [0, 1] interval.
 * @returns The line path
 */
export const generateLinePath = (
  shapeData: LineData,
  curve: LineCurve,
  beta?: number
): string => {
  const lineGenerator = line();
  if (curve) {
    const curves = {
      ...d3Curves,
      curveBundle: curveBundle.beta(beta || 0.85),
      curveCardinal: curveCardinal.tension(beta || 0),
    };
    lineGenerator.curve(curves[curve]);
  }
  const data = shapeData.map((d) => [d.x, d.y]);
  // @ts-ignore <-- remove this when TS version is fix
  return lineGenerator(data) || '';
};

/**
 * Constructs a new area generator with the provided settings and generates the path.
 * @param shapeData line data
 * @param dimensions The chart dimensions
 * @param curve Sets the curve factory.
 * @param beta A constant value in the [0, 1] interval.
 * @returns The area path
 */
export const generateAreaPath = (
  shapeData: AreaData,
  curve: AreaCurve,
  beta?: number
) => {
  const areaGenerator = area<[number, number, number]>();
  if (curve) {
    const curves = {
      ...d3Curves,
      curveCardinal: curveCardinal.tension(beta || 0),
    };
    areaGenerator.curve(curves[curve]);
  }
  areaGenerator.x((d) => d[0]);
  areaGenerator.y0((d) => d[1]);
  areaGenerator.y1((d) => d[2]);
  const data = shapeData.map((d) => [d.x, d.y0, d.y1]);
  // @ts-ignore - remove this when TS version is fixed
  return areaGenerator(data);
};

/**
 * Finds the upper and lower bounds for a given set of data with a confidence or error magins
 * @param dataValues array of values
 * @param negativeMargins array of percentage values [0..1]
 * @param positiveMargins array of percentage values [0..1]
 * @returns lowest & highest margin values
 */
 export const getDataMarginBounds = (
  dataValues: number[],
  negativeMargins: number[],
  positiveMargins: number[]
) => {
  const negativeMarginValues = dataValues.map(
    (d, idx) => d * negativeMargins[idx]
  );
  const positiveMarginValues = dataValues.map(
    (d, idx) => d * positiveMargins[idx]
  );
  const lowsestMarginValue = Math.min(...negativeMarginValues);
  const highestMarginValue = Math.max(...positiveMarginValues);
  return [lowsestMarginValue, highestMarginValue];
};
