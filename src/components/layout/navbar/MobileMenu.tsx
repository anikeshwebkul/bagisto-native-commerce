"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import BottomNavbar from "./BottomNavbar";
import { MobileSearchBar } from "./MobileSearch";
import { useBodyScrollLock } from "@utils/hooks/useBodyScrollLock";
import { useState, useEffect } from "react";
import { isTurboNativeUserAgent } from "@bagisto-native/core";
import ThemeSwitcherWrapper from "@components/theme/theme-switch";
import { ActiveTabType } from "./type";
import { useModalDismiss } from "@components/hotwire/hooks/useModalDismiss";

export default function MobileMenu({ menu }: { menu: any }) {
  const [activeTab, setActiveTab] = useState<
    ActiveTabType
  >(null);

  const [isTurboNativeUserAgentState, setIsTurboNativeUserAgentState] = useState(false);

  const isOpen = activeTab === "category";

  useBodyScrollLock(isOpen);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsTurboNativeUserAgentState(isTurboNativeUserAgent());
    });
  }, []);

  const handleClose = () => {
    setActiveTab(null);
  };

  // Handle modal dismiss for Turbo Native
  useModalDismiss({
    activeTab,
    onClose: handleClose,
    setActiveTab,
  });

  return (
    <>
      <BottomNavbar
        onMenuOpen={() => setActiveTab("category")}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className={`fixed inset-0 z-40 bg-transparent ${!isTurboNativeUserAgentState ? " lg:hidden" : ""}`}
              style={{ top: isTurboNativeUserAgentState ? "0" : "68px", bottom: "64px" }}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed left-0 z-50 w-full max-w-[448px] border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black drawer-scrollbar-hidden ${!isTurboNativeUserAgentState ? " lg:hidden" : ""}`}
              style={{
                top: isTurboNativeUserAgentState ? "0" : "68px",
                bottom: "64px",
                width: "100%",
                maxWidth: "448px",
                height: "calc(var(--visual-viewport-height) - 132px)",
              }}
            >
              <div className="h-full overflow-y-auto px-4 py-4 drawer-scrollbar-hidden">
                {!isTurboNativeUserAgentState && <MobileSearchBar onClose={handleClose} />}

                {
                  isTurboNativeUserAgentState ? (
                    <div className="flex items-center justify-between">
                      <h1 className="mt-4 px-2 text-2xl font-semibold text-black dark:text-white">
                        Category
                      </h1>
                      <div className="flex">
                        <ThemeSwitcherWrapper />
                      </div>
                    </div>
                  ) : (
                    <h1 className="mt-4 px-2 text-2xl font-semibold text-black dark:text-white">
                      Category
                    </h1>
                  )
                }

                <ul className="mt-2 flex w-full flex-col drawer-scrollbar-hidden">
                  {menu.map((item: any) => (
                    <li
                      key={item.id + item.name}
                      className="p-2 text-xl text-black dark:text-white"
                    >
                      <Link
                        href={item.slug ? `/search/${item.slug}` : "/search"}
                        aria-label={`${item?.name}`}
                        onClick={handleClose}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
