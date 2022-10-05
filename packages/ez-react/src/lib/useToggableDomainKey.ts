import { useCallback, useMemo, useState } from 'react';
import { RawData } from 'eazychart-core/src/types';
import { getDomainByKeys } from 'eazychart-core/src';

export const useToggableDomainKey = (data: RawData, domainKeys: string[]) => {
  // Setup a state for the domain keys to make them toggable
  const [activeDomainKeys, setYDomainKeys] = useState<string[]>(domainKeys);
  // Toggle Y axis domain keys whenever a legend key is clicked
  const toggleDomainKey = useCallback(
    (key: string, isActive: boolean, _color: string) => {
      if (isActive) {
        setYDomainKeys([...activeDomainKeys, key]);
      } else {
        setYDomainKeys(
          activeDomainKeys.filter((domainKey) => domainKey !== key)
        );
      }
    },
    [activeDomainKeys, setYDomainKeys]
  );
  // Re-scale the Y axis
  const activeDomain = useMemo(
    () => getDomainByKeys(activeDomainKeys, data),
    [activeDomainKeys, data]
  );

  return { activeDomainKeys, activeDomain, toggleDomainKey };
};
