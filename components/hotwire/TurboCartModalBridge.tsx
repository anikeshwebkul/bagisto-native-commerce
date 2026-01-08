"use client";
import { useEffect } from "react";

type TurboCartModalBridgeProps = {
  onOpen: () => void;
};

export default function TurboCartModalBridge({ onOpen }: TurboCartModalBridgeProps) {
  useEffect(() => {
    const handleTurboCartModalOpen = (e: Event) => {
      onOpen();
    };

    window.addEventListener("turbo:next-cart-modal", handleTurboCartModalOpen);

    return () => {
      window.removeEventListener("turbo:next-cart-modal", handleTurboCartModalOpen);
    };
  }, [onOpen]);

  return null; 
}
