"use client";

import { useEffect } from "react";
import { triggerCartCountValue } from "@bagisto-native/core";
import { isObject } from "@utils/type-guards";
import { useAppSelector } from "@/store/hooks";

export function useSyncCartCount(cartData: any) {
    const cartDetail = useAppSelector((state) => state.cartDetail);
    useEffect(() => {
        if (!isObject(cartData)) return;

        const cartCount = Number(cartData.itemsQty) || 0;
        const cartCountValue = Number(cartDetail?.cart?.itemsQty);

        const syncCartCount = () => {
            triggerCartCountValue(cartCountValue);
        };

        // Hotwire Native case.
        window.addEventListener("bagisto-native:dynamic-button-ready", syncCartCount);

        return () => {
            window.removeEventListener("bagisto-native:dynamic-button-ready", syncCartCount);
        };
    }, [cartData, cartDetail]);
}
