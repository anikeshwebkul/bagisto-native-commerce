"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 

export default function TurboSearchRouterBridge() {
  const router = useRouter();

  useEffect(() => {
    // Listen for a custom event from Turbo.
    const handleTurboSearch = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string; code?: string }>;
      const query = customEvent.detail.query || customEvent.detail.code;
      if (!query) return;
      router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    window.addEventListener("turbo:next-search", handleTurboSearch);

    return () => {
      window.removeEventListener("turbo:next-search", handleTurboSearch);
    };
  }, [router]);

  return null; 
}
