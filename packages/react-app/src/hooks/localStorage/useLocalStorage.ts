import { useState, useEffect, Dispatch, SetStateAction } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
  // getting stored value
  const saved = localStorage.getItem(key);

  if (saved === "undefined") return undefined;

  return saved ? (JSON.parse(saved) as T) : defaultValue;
}

const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const [value, setValue] = useState<T | undefined>(() =>
    getStorageValue<T>(key, defaultValue)
  );

  useEffect(() => {
    // storing the input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
