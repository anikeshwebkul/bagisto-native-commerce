"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import Search from "./Search";
import { SearchSkeleton } from "@/components/common/skeleton/SearchSkeleton";
import LogoIcon from "@components/common/icons/LogoIcon";
import { CartAndUserActions } from "./CartAndUserActions";
import { NavigationSkeleton } from "./NavigationSkeleton";
import { ActionsSkeleton } from "./ActionsSkeleton";
import { NavbarErrorBoundary } from "@/components/error/ErrorBoundary";
import { isTurboNativeUserAgent } from "@bagisto-native/core";
import { ReactNode } from "react";

export default function Navbar({ categories }: { categories?: ReactNode }) {
  const [isTurboNativeUserAgentState, setIsTurboNativeUserAgentState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
      setIsTurboNativeUserAgentState(isTurboNativeUserAgent());
    });
  }, []);

  return (
    <NavbarErrorBoundary>
      <header className="sticky top-0 z-10">
        <nav className={`relative flex flex-col items-center justify-between gap-4 bg-neutral-50 dark:bg-neutral-900 md:flex-row ${mounted && !isTurboNativeUserAgentState ? 'p-4 lg:px-6 lg:py-4' : ''}`}>
          <div className="flex w-full items-center justify-between gap-0 sm:gap-4">
            {/* 1. THE STATIC SHELL (Visible Instantly) */}
            <div className="flex max-w-fit gap-2 xl:gap-6">
              <Link
                suppressHydrationWarning={true}
                className={`h-9 w-full scale-95 items-center md:h-9 md:w-auto lg:h-10 ${mounted && !isTurboNativeUserAgentState ? 'flex' : 'hidden'}`}
                href="/"
                aria-label="Go to homepage"
              >
                <LogoIcon />
              </Link>

              {/* 2. STATIC HOLE: Categories (Suspended) */}
              <Suspense fallback={<NavigationSkeleton />}>
                {categories}
              </Suspense>
            </div>

            <div className={`flex-1 justify-center ${mounted && !isTurboNativeUserAgentState ? 'md:flex' : 'hidden'}`}>
              <Suspense fallback={<SearchSkeleton />}>
                <Search search={false} />
              </Suspense>
            </div>

            {/* 3. DYNAMIC HOLE: Auth & Cart (Blocked by Session/Cookies) */}
            <div className={`${mounted && !isTurboNativeUserAgentState ? 'block' : 'hidden'}`}>
              <Suspense fallback={<ActionsSkeleton />}>
                <CartAndUserActions />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </NavbarErrorBoundary>
  );
}
