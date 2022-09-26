import { useEffect, useRef, useCallback } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();
  const intervalRef = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  useEffect(() => {
    // clear interval on when component gets removed to avoid memory leaks
    return () => clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(savedCallback.current, delay);
    }
  });

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
  });

  return {
    reset,
    stop,
  };
}

export default useInterval;
