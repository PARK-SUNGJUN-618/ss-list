import { useState, useEffect } from "react";

/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} el
 * @param {boolean} initialState
 */
export const useDetectOutsideClick = (el, initialState) => {
  const [isState, setIsState] = useState(initialState);

  useEffect(() => {
    // setIsState(!isState);

    const onClick = e => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        console.log("qqqqqqqqqqqqqqq:",isState)
        setIsState(!isState);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isState) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isState, el]);

  return [isState, setIsState];
};
