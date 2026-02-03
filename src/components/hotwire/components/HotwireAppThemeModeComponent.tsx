"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { triggerThemeModeEvent } from "@bagisto-native/core";
import { getLocalStorage } from "@/store/local-storage";

const HotwireThemeMode = dynamic(
  () => import("@bagisto-native/react").then((mod) => mod.HotwireThemeMode),
  { ssr: false }
);

export default function HotwireAppThemeModeComponent() {
  useEffect(() => {
    const syncThemeMode = () => {
      const mode = getLocalStorage("theme");
      triggerThemeModeEvent(mode === "dark" ? "dark" : "light");
    };

    // Listen for Stimulus readiness
    window.addEventListener(
      "bagisto-native:theme-mode-ready",
      syncThemeMode
    );

    return () => {
      window.removeEventListener(
        "bagisto-native:theme-mode-ready",
        syncThemeMode
      );
    };
  }, []);

  return <HotwireThemeMode />;
}
