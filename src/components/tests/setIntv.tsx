import React, { useState, useEffect, useRef } from "react";

function useInterval(callback: any, delay: any) {
  const savedCallback: any = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        console.log("st unmouted");
        clearInterval(id);
      };
    }
  }, [delay]);
}

export default useInterval;
