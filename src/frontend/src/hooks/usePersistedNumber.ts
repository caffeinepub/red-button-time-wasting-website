import { useEffect, useState } from "react";

export function usePersistedNumber(
  key: string,
  initialValue = 0,
): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [value, setValue] = useState<number>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        const parsed = Number.parseFloat(storedValue);
        if (!Number.isNaN(parsed) && Number.isFinite(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn(`Failed to read ${key} from localStorage:`, error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, value.toString());
    } catch (error) {
      console.warn(`Failed to write ${key} to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
