'use client';
import React from "react";
import dynamic from "next/dynamic";

const HotwireSearch = dynamic(
    () => import('@bagisto-native/react').then(mod => mod.HotwireSearch),
    { ssr: false }
);

{/* Trigger Native Search Component */}
export default function HotwireAppSearchComponent() {
    return (
        <HotwireSearch />
    );
}