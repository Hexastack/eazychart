import { useCallback, useEffect, useMemo, useState } from 'react';
import { RawData } from 'eazychart-core/src/types';
import { getDomainByKeys } from 'eazychart-core';

export const useToggableDomainKey = (data: RawData, domainKeys: string[]) => {
  // Setup a state for the domain keys to make them toggable
  const [activeDomainKeys, setActiveDomainKeys] =
    useState<string[]>(domainKeys);

  const sortDomainKeys = useCallback(
    (domainkeys: string[]) => {
      const maxValues = domainkeys.reduce((acc, curr: string, index) => {
        const values = data.map((datum) => datum[curr] as number);
        acc.push([Math.max(...values), index] as never);
        return acc;
      }, []);
      const sortedMaxValues = maxValues.sort((a, b) => {
        return a[0] > b[0] ? -1 : 1;
      });
      const sortedDomains = sortedMaxValues.reduce((acc, curr) => {
        acc.push(domainkeys[curr[1]] as never);
        return acc;
      }, []);
      // console.log('sortedDomains', sortedDomains);
      setActiveDomainKeys(sortedDomains);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [data, setActiveDomainKeys]
  );

  // Toggle Y axis domain keys whenever a legend key is clicked
  const toggleDomainKey = useCallback(
    (key: string, isActive: boolean, _color: string) => {
      if (isActive) {
        setActiveDomainKeys([...activeDomainKeys, key]);
        sortDomainKeys(activeDomainKeys);
      } else {
        setActiveDomainKeys(
          activeDomainKeys.filter((domainKey) => domainKey !== key)
        );
      }
    },
    [activeDomainKeys, setActiveDomainKeys, sortDomainKeys]
  );
  useEffect(() => {
    sortDomainKeys(activeDomainKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortDomainKeys]);

  // Re-scale the Y axis
  const activeDomain = useMemo(
    () => getDomainByKeys(activeDomainKeys, data),
    [activeDomainKeys, data]
  );

  return { activeDomainKeys, activeDomain, toggleDomainKey };
};
