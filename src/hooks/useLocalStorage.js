import { useEffect, useState } from "react";

function resolveInitialValue(initValue) {
  return initValue instanceof Function ? initValue() : initValue;
}

function getSavedValue(key, initValue) {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }

    return resolveInitialValue(initValue);
  } catch (error) {
    return resolveInitialValue(initValue);
  }
}

export default function useLocalStorage(key, initValue) {
  const [value, setValue] = useState(() => getSavedValue(key, initValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }, [key, value]);

  return [value, setValue];
}
