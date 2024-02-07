"use client"

import { useEffect } from "react";
import { SimpleDeque } from "@/lib/utils";

export function useImanok(callback: () => void) {
  const expected = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  const deque = new SimpleDeque<number>()

  const onKeyDown = (event: { keyCode: number; }) => {
    deque.push(event.keyCode);
  }

  const onKeyUp = () => {
    if (deque.includesSequence(expected)) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
      document.removeEventListener('keyup', onKeyUp, false);
    }
  })

}