import { useState, useEffect, useCallback } from "react";
import { onStoreChange } from "@/data/store";

/**
 * Hook that re-reads data from the store whenever admin saves changes.
 */
export function useStoreData<T>(getter: () => T): T {
  const [data, setData] = useState(getter);

  const refresh = useCallback(() => {
    setData(getter());
  }, [getter]);

  useEffect(() => {
    return onStoreChange(refresh);
  }, [refresh]);

  return data;
}
