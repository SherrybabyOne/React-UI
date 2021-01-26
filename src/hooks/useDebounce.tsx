import { useState, useEffect } from 'react';

function useDebounce(value: any, deley = 300) {
  const [deboundeValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebounceValue(value);
    }, deley);

    return () => {
      clearTimeout(handler);
    }
  }, [value, deley]);

  return deboundeValue;
}

export default useDebounce;
