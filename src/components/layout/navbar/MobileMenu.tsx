"use client";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/react";
import Link from "next/link";
import BottomNavbar from "./BottomNavbar";
import { MobileSearchBar } from "./MobileSearch";
import { useState, useEffect } from "react";
import { isTurboNativeUserAgent } from "@bagisto-native/core";
import ThemeSwitcherWrapper from "@components/theme/theme-switch";
import { ActiveTabType } from "./type";
import { useModalDismiss } from "@components/hotwire/hooks/useModalDismiss";

export default function MobileMenu({ menu }: { menu: any }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState<
    ActiveTabType
  >(null);

  const [isTurboNativeUserAgentState, setIsTurboNativeUserAgentState] = useState(false);

  useEffect(() => {
    setIsTurboNativeUserAgentState(isTurboNativeUserAgent());
  }, []);

  // Handle modal dismiss for Turbo Native
  useModalDismiss({
    activeTab,
    onClose,
    setActiveTab,
  });

  return (
    <>
      <BottomNavbar
        onMenuOpen={onOpen}
        setActiveTab={setActiveTab}
        activeTab={activeTab} />

      <Drawer
        backdrop="transparent"
        hideCloseButton
        isOpen={isOpen}
        radius="none"
        placement="left"
        onOpenChange={(open) => {
          onOpenChange();
          if (!open) {
            setActiveTab(null);
          }
        }}
        classNames={{
          base: "z-50",
          backdrop: "z-40",
          wrapper: `${isTurboNativeUserAgentState ? 'top-0 bottom-[64px]' : 'top-[68px] bottom-[64px]'}`,
        }}
      >
        <DrawerContent
          className={`
                z-50
                ${isTurboNativeUserAgentState
              ? "h-[calc(var(--visual-viewport-height)-64px)] max-h-[calc(var(--visual-viewport-height)-64px)]"
              : "h-[calc(var(--visual-viewport-height)-132px)] max-h-[calc(var(--visual-viewport-height)-132px)]"}
              `}
        >
          {(onClose) => (
            <>
              <DrawerBody className="px-4 py-4 overflow-y-auto">
                {!isTurboNativeUserAgentState && <MobileSearchBar onClose={onClose} />}
                {
                  isTurboNativeUserAgentState ? (
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl text-black dark:text-white px-2 font-semibold"> Category </h1>
                      <div className="flex">
                        <ThemeSwitcherWrapper />
                      </div>
                    </div>
                  ) : (
                    <h1 className="text-2xl text-black dark:text-white px-2 font-semibold"> Category </h1>
                  )
                }
                <ul className="flex w-full flex-col">
                  {menu.map((item: any) => (
                    <li
                      key={item.id + item.name}
                      className="p-2 text-xl text-black dark:text-white"
                    >
                      <Link
                        href={item.slug ? `/search/${item.slug}` : "/search"}
                        aria-label={`${item?.name}`}
                        onClick={onClose}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
