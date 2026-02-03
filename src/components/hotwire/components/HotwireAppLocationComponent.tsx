'use client';
import React from "react";
import dynamic from "next/dynamic";

const HotwireLocation = dynamic(
    () => import('@bagisto-native/react').then(mod => mod.HotwireLocation),
    { ssr: false }
);

type FieldNames = {
    address: string[];
    city: string[];
    postCode: string[];
}

{/* Detect Current Location */}
export default function HotwireAppLocationComponent(props:{fieldNames: FieldNames}) {
    return (
        <HotwireLocation fieldNames={props.fieldNames} style={{ display: 'none' }} >
            Hotwire Location
        </HotwireLocation>
    );
}