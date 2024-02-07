"use client"

import { useCallback, useEffect, useState } from "react";

export function useImanok(callback: () => void) {
  const expected = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  const [keys, setKeys] = useState<number[]>([])

  const onKeyDown = useCallback((event: { keyCode: number; }) => {
    const newKeys = [...keys];
    newKeys.push(event.keyCode);
    setKeys(newKeys);
  }, [keys]);

  const onKeyUp = useCallback((event: {keyCode: number}) => {
    const index = keys.lastIndexOf(event.keyCode);

    if (keys[index] !== expected[index]) {
      setKeys([]);
    }

    if (keys.length === expected.length) {
      if (keys.every((value,  idx) => value === expected[idx])) {
        setKeys([]);
        console.log("bami")
        callback();
      }
    }

  }, [keys]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
      document.removeEventListener('keyup', onKeyUp, false);
    }
  })

}