import { ScaleLinearDefinition } from 'eazychart-core/src/types';

type OptionalLinearDefinitionKey =
  | 'domain'
  | 'maxPadding'
  | 'minPadding'
  | 'max'
  | 'min'
  | 'softMax'
  | 'softMin'
  | 'roundRange'
  | 'clamp';

const optionalLinearDefinitionKeys: OptionalLinearDefinitionKey[] = [
  'domain',
  'maxPadding',
  'minPadding',
  'max',
  'min',
  'softMax',
  'softMin',
  'roundRange',
  'clamp',
];

export const getDefinedLinearScaleOptions = (
  definition: ScaleLinearDefinition,
  excludeKeys: OptionalLinearDefinitionKey[] = []
): Partial<Pick<ScaleLinearDefinition, OptionalLinearDefinitionKey>> => {
  const options: Partial<
    Pick<ScaleLinearDefinition, OptionalLinearDefinitionKey>
  > = {};

  optionalLinearDefinitionKeys.forEach((key) => {
    if (excludeKeys.includes(key)) {
      return;
    }
    const value = definition[key];
    if (value !== undefined) {
      Object.assign(options, { [key]: value });
    }
  });

  return options;
};
