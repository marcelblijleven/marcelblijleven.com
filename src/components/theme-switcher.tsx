"use client"

import { useTheme } from "next-themes";
import { useImanok } from "@/lib/hooks";
import { useCallback, useEffect, useState } from "react";

function oppositeTheme(theme: string | undefined): string {
  if (theme === "light") return "dark";

  return "light";
}

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState<boolean>(false)
  const {theme, setTheme} = useTheme();

  const switchTheme = useCallback(() => {
    setTheme(oppositeTheme(theme));
  }, [theme]);

  useImanok(() => switchTheme());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }


  return (
    <div
      className={"text-sm text-center select-none"}
      onDoubleClick={() => switchTheme()}
    >
      Enter Konami code to switch to {oppositeTheme(theme)} mode, or double tap here.
    </div>
  )
}