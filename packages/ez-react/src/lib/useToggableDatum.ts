import { useCallback, useMemo, useState } from 'react';
import { RawData } from 'eazychart-core/src/types';

export const useToggableDatum = (
  data: RawData,
  domainKey: string,
  colors: string[]
) => {
  const [excludedKeys, setExcludedKeys] = useState<{ [key: string]: string }>(
    {}
  );
  const activeData = useMemo(
    () =>
      data.filter((datum) => {
        return !((datum[domainKey] as string) in excludedKeys);
      }),
    [excludedKeys, data, domainKey]
  );
  const activeColors = useMemo(
    () =>
      colors.filter((color) => {
        return !Object.values(excludedKeys).includes(color);
      }),
    [colors, excludedKeys]
  );

  const toggleDatum = useCallback(
    (key: string, isActive: boolean, color: string) => {
      if (isActive) {
        const { [key]: _removed, ...newExcludedKeys } = excludedKeys;
        setExcludedKeys(newExcludedKeys);
      } else {
        setExcludedKeys({ ...excludedKeys, [key]: color });
      }
    },
    [excludedKeys, setExcludedKeys]
  );
  return { activeData, activeColors, toggleDatum };
};
