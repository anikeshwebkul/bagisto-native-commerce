"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { isTurboNativeUserAgent } from "@bagisto-native/core";

export default function TopBanner() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [isTurboNativeUserAgentState, setIsTurboNativeUserAgentState] = useState(true);

    useEffect(() => {
        const isBannerClosed = localStorage.getItem("top-banner-closed");
        if (!isBannerClosed) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setIsVisible(true);
        }
    }, []);

    useEffect(() => {
        setIsTurboNativeUserAgentState(isTurboNativeUserAgent());
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem("top-banner-closed", "true");
    };

    if (pathname !== "/") {
        return null;
    }

    if (isTurboNativeUserAgentState) {
        return null;
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-neutral-950 text-white dark:bg-white dark:text-black border-b border-white/10 dark:border-black/5"
                >
                    <div className="relative mx-auto flex max-w-[1920px] items-center justify-center px-4 py-2 text-center text-[13px] font-medium sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-[10px] dark:bg-neutral-200">
                                ✨
                            </span>
                            <span>
                                New Release: Bagisto Headless – APIs first. Frontend freedom →
                                {" "}
                                <a
                                    href="https://headless-doc.bagisto.com/bagisto-headless-ecommerce/getting-started/quick-start-guide"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold cursor-pointer underline underline-offset-4 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors"
                                >
                                    Explore Now
                                </a>
                            </span>
                        </div>
                        <button
                            onClick={handleClose}
                            className="absolute right-4 cursor-pointer rounded-md p-1 hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                            aria-label="Close banner"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
