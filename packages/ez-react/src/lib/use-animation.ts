import { AnimationOptions, Interpolables } from 'eazychart-core/src/types';
import { useState, useEffect, useCallback, useRef } from 'react';
import { defaultChartAnimationOptions, animate } from 'eazychart-core/src';

export const useAnimation = <T extends Interpolables>(
  targetData: T,
  initialData: T,
  options: AnimationOptions = defaultChartAnimationOptions,
  deps: any[] = []
) => {
  const shouldAnimation = !options.delay && options.duration;
  const [currentData, setCurrentData] = useState<T>(
    shouldAnimation ? initialData : targetData
  );
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
  const cancelRef = useRef<Function | null>(null);
  const cancelAnimation = (forceUpdate = false) => {
    if (cancelRef.current) {
      cancelRef.current(forceUpdate);
    }
  };

  useEffect(() => {
    cancelAnimation();
    cancelRef.current = animate<T>(
      initialData,
      targetData,
      options,
      updateOnAnimate
    );
    return () => {
      cancelAnimation(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)]);

  useEffect(() => {
    cancelAnimation();
    cancelRef.current = animate<T>(
      currentData,
      targetData,
      options,
      updateOnAnimate
    );
    return () => {
      cancelAnimation(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(targetData), ...deps]);

  return currentData;
};
