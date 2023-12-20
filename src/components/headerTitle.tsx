"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/mdx/link";

export default function HeaderTitle() {
  const currentPath = usePathname();

  if (currentPath === "/") {
    return (
      <Link
        href={"/"}
        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        aria-label="Back to the home"
      >
        Marcel Blijleven
      </Link>
    );
  }

  return (
    <Link
      href={"/"}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      aria-label="Back to the home"
    >
      &larr; Back to home
    </Link>
  );
}
