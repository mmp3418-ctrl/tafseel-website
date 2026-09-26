"use client";

import { useEffect, useState } from "react";

/** True only after client mount — avoids SSR/hydration mismatches. */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
