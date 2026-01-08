'use client';
import React, {useEffect} from "react";
import dynamic from "next/dynamic";
import {triggerThemeModeEvent} from "@bagisto-native/core";
import {getLocalStorage} from "@/store/local-storage";

const HotwireThemeMode = dynamic(
    () => import('@bagisto-native/react').then(mod => mod.HotwireThemeMode),
    { ssr: false }
);

export default function HotwireAppThemeModeComponent() {
    useEffect(()=>{
        const mode = getLocalStorage('theme');
        if(mode === 'light' || mode === 'dark'){
           setTimeout(()=>{
                triggerThemeModeEvent(mode);
            }, 1000);
        } else {
            setTimeout(()=>{
                triggerThemeModeEvent("light");
            }, 1000);
        }
    },[])
    return (
        <HotwireThemeMode />
    );
}