"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { triggerHistorySyncEvent } from "@bagisto-native/core";

export default function HistorySync() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = new URL(`${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
    
    triggerHistorySyncEvent(url);
  }, [pathname, searchParams]);

  return null;
}
