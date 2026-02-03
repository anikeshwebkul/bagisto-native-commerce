"use client";
import { useEffect, useRef } from "react";
import { triggerDynamicButtonModalOpenEvent, triggerDynamicButtonModalDismissEvent } from "@bagisto-native/core";

type TurboCartModalBridgeProps = {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function TurboCartModalBridge({ onOpen, isOpen, onClose }: TurboCartModalBridgeProps) {
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const handleTurboCartModalOpen = (e: Event) => {
      if (!isOpenRef.current) {
        triggerDynamicButtonModalOpenEvent();
        onOpen();

      } else {
        triggerDynamicButtonModalDismissEvent();
        onClose();

      }
    };

    window.addEventListener("turbo:next-cart-modal", handleTurboCartModalOpen);

    return () => {
      window.removeEventListener("turbo:next-cart-modal", handleTurboCartModalOpen);
    };
  }, [onOpen, onClose]);

  return null;
}
