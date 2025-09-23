import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: number) {
  const [value, setValue] = useState<number>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setStoredValue = (newValue: number) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue] as const;
}
