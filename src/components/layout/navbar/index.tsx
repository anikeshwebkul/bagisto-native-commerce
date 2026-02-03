"use client";
import Link from "next/link";
import { Suspense, useMemo, useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import Search from "./Search";
import Cart from "@/components/cart";
import { SearchSkeleton } from "@/components/common/skeleton/SearchSkeleton";
import { IconSkeleton } from "@/components/common/skeleton/IconSkeleton";
import ThemeSwitcherWrapper from "@components/theme/theme-switch";
import LogoIcon from "@components/common/icons/LogoIcon";
import UserAccount from "@components/customer/credentials";
import TopBanner from "@/components/home/TopBanner";
import { useNavCategories } from "@/utils/hooks/useNavCategories";
import { isTurboNativeUserAgent } from "@bagisto-native/core";
import { isArray } from "@utils/type-guards";

export default function Navbar() {
  const { categories } = useNavCategories();

  const menuData = useMemo(() => [
    { id: "all", name: "All", slug: "" },
    ...categories?.slice(0, 3),
  ], [categories]);

  const [isTurboNativeUserAgentState, setIsTurboNativeUserAgentState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setIsTurboNativeUserAgentState(isTurboNativeUserAgent(navigator.userAgent));
    }
  }, []);

  return (
    <>
      <TopBanner />
      <header className="sticky top-0 z-10">
        <nav className={`relative flex flex-col items-center justify-between gap-4 bg-neutral-50 dark:bg-neutral-900 md:flex-row ${isTurboNativeUserAgentState ? 'p-0' : 'p-4 lg:px-6'}`}>
          <div className={"flex w-full items-center justify-between gap-0 sm:gap-4" + (isTurboNativeUserAgentState ? 'hidden' : '')}>
            <div className="flex max-w-fit gap-2 xl:gap-6">
              <Suspense fallback={null}>
                <MobileMenu menu={menuData} />
              </Suspense>
              <Link
                className={`flex h-9 w-full scale-95 items-center md:h-9 md:w-auto lg:h-10 ${isTurboNativeUserAgentState ? 'hidden' : ''}`}
                href="/"
                aria-label="Go to homepage"
              >
                <LogoIcon />
              </Link>
              <ul className={`hidden gap-4 text-sm md:items-center xl:gap-6 ${mounted && !isTurboNativeUserAgentState ? 'lg:flex' : ''}`}>
                {isArray(menuData) && menuData.map(
                  (item: { id: string; name: string; slug: string }) => (
                    <li key={item?.id + item?.name}>
                      <Link
                        className="text-nowrap relative text-neutral-500 before:absolute before:bottom-0 before:left-0 before:h-px before:w-0 before:bg-current before:transition-all before:duration-300 before:content-[''] hover:text-black hover:before:w-full dark:text-neutral-400 dark:hover:text-neutral-300"
                        href={item?.slug ? `/search/${item?.slug}` : "/search"}
                        prefetch={true}
                        aria-label={`Browse ${item?.name} products`}
                      >
                        {item?.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className={`hidden flex-1 justify-center md:flex ${isTurboNativeUserAgentState ? 'md:hidden' : ''}`}>
              <Suspense fallback={<SearchSkeleton />}>
                <Search search={false} />
              </Suspense>
            </div>
            <div className="flex max-w-fit gap-2 md:gap-4">
              <div className={`flex ${isTurboNativeUserAgentState ? 'hidden' : ''}`}>
                <ThemeSwitcherWrapper />
              </div>
              <div className={"hidden " + (mounted && !isTurboNativeUserAgentState ? 'lg:block' : '')}>
                <Cart />
              </div>
              <Suspense fallback={<IconSkeleton />}>
                <div className={"hidden " + (mounted && !isTurboNativeUserAgentState ? 'lg:block' : '')}>
                  <UserAccount />
                </div>
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
