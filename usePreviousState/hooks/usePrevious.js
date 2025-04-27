// hooks/usePrevious.js
import { useRef, useEffect } from "react";

/**
 * Custom hook to store the previous value of a state or prop.
 * @param {*} value The current value you want to track.
 * @returns {*} The previous value.
 */
export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
