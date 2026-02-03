"use client";
import { useEffect } from "react";
import { ActiveTabType } from "@components/layout/navbar/type";
import {
    triggerDynamicButtonModalOpenEvent,
    triggerDynamicButtonModalDismissEvent,
} from "@bagisto-native/core";

interface UseModalDismissProps {
    activeTab: ActiveTabType;
    onClose: () => void;
    setActiveTab: (tab: ActiveTabType) => void;
}

export function useModalDismiss({
    activeTab,
    onClose,
    setActiveTab,
}: UseModalDismissProps) {
    // Trigger native open/dismiss when tab changes
    useEffect(() => {
        if (activeTab && activeTab !== "home") {
            triggerDynamicButtonModalOpenEvent();
        } else {
            triggerDynamicButtonModalDismissEvent();
        }
    }, [activeTab]);

    // Listen for native modal dismiss event
    useEffect(() => {
        const handleTurboModalDismiss = () => {
            onClose();
            setActiveTab(null);
        };

        window.addEventListener(
            "bagisto-native:modal-dismiss",
            handleTurboModalDismiss
        );

        return () => {
            window.removeEventListener(
                "bagisto-native:modal-dismiss",
                handleTurboModalDismiss
            );
        };
    }, []);
}
