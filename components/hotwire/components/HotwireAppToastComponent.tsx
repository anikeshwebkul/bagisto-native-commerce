'use client';
import React from "react";
import dynamic from "next/dynamic";

const HotwireToast = dynamic(
    () => import('@bagisto-native/react').then(mod => mod.HotwireToast),
    { ssr: false }
);

{/* Trigger Native Toast Component */}
export default function HotwireAppToastComponent() {
    return (
        <HotwireToast />
    );
}