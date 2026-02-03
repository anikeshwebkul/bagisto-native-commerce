'use client';
import React from "react";
import dynamic from "next/dynamic";

const HotwireHistorySync = dynamic(
    () => import('@bagisto-native/react').then(mod => mod.HotwireHistorySync),
    { ssr: false }
);

{/* Trigger Native Toast Component */}
export default function HotwireAppHistorySyncComponent() {
    return (
        <HotwireHistorySync />
    );
}