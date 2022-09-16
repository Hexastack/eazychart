import { AnimationOptions, Interpolables } from 'eazychart-core/src/types';
import { useState, useEffect, useCallback } from 'react';
import { defaultChartAnimationOptions, animate } from 'eazychart-core/src';

export const useAnimation = <T extends Interpolables>(
  targetData: T,
  initialData: T,
  options: AnimationOptions = defaultChartAnimationOptions,
  deps: any[] = []
) => {
  const [currentData, setCurrentData] = useState<T>(initialData);
  const updateOnAnimate = useCallback(
    (v) => {
      if (v) {
        setCurrentData(
          typeof v === 'object'
            ? {
                ...v,
              }
            : v
        );
      }
    },
    [setCurrentData]
  );

  useEffect(() => {
    const cancel = animate<T>(
      initialData,
      targetData,
      options,
      updateOnAnimate
    );
    return () => {
      cancel(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)]);

  useEffect(() => {
    const cancel = animate<T>(
      currentData,
      targetData,
      options,
      updateOnAnimate
    );
    return () => {
      cancel(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(targetData), ...deps]);

  return currentData;
};
