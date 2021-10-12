import { useState, useEffect, Dispatch, SetStateAction } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
  // getting stored value
  const saved = localStorage.getItem(key);

  return saved ? (JSON.parse(saved) as T) : defaultValue;
}

const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() =>
    getStorageValue<T>(key, defaultValue)
  );

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
