import { useEffect, useState } from "react";

function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);

    return localValue !== null ? JSON.parse(localValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function clearJWT() {
  localStorage.removeItem("jwt");
}

export { useLocalState, clearJWT };
