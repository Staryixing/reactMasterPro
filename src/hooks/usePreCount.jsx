import { useEffect, useRef } from "react";

function usePreState (current) {
  let preNumber = useRef(current);
  useEffect(() => {
    preNumber.current = current;
  }, [current])
  return preNumber.current
}
export default usePreState;
