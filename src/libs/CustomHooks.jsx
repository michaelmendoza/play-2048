
import { useCallback, useEffect } from 'react';

/** Custom hook for adding a keydown listener */
export const useKeyDown = (handleDownKey, state) => {

    const checkKeyPress = useCallback((event) => {
        handleDownKey(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    useEffect(() => {
        window.addEventListener("keydown", checkKeyPress);
        return () => {
          window.removeEventListener("keydown", checkKeyPress);
        };
      }, [checkKeyPress]);
}
