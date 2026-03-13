import { useState, useEffect } from 'react';

/**
 * Custom hook that persists a numeric value to localStorage
 * @param key - The localStorage key to use
 * @param initialValue - The default value if no stored value exists
 * @returns [value, setValue] tuple similar to useState
 */
export function usePersistedNumber(
  key: string,
  initialValue: number = 0
): [number, React.Dispatch<React.SetStateAction<number>>] {
  // Initialize state with value from localStorage or fallback to initialValue
  const [value, setValue] = useState<number>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        const parsed = parseFloat(storedValue);
        // Validate that it's a valid number
        if (!isNaN(parsed) && isFinite(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn(`Failed to read ${key} from localStorage:`, error);
    }
    return initialValue;
  });

  // Persist to localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, value.toString());
    } catch (error) {
      console.warn(`Failed to write ${key} to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
