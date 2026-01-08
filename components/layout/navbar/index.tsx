import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
const ThemeSwitch = dynamic(() => import("./theme-switch"), {
  ssr: true,
});
import { CACHE_KEY } from "@/lib/constants";
import Cart from "@/components/cart";
import OpenCart from "@/components/cart/open-cart";
import UserAccount from "@/components/customer";
import LogoIcon from "@/components/icons/logo";
import { getMenu } from "@/lib/bagisto";
import MobileSearch from "./mobile-search";
import dynamic from "next/dynamic";
import IsTurboNativeUserAgentFromServerComponent from "@/components/hotwire/IsTurboNativeUserAgentFromServerComponent";
import { HomeIcon } from "@heroicons/react/24/outline";

export default async function Navbar() {
  const menu = await getMenu(CACHE_KEY.headerMenus);
  const menuData = [{ id: "", path: "/search", title: "All" }, ...menu];

  const isTurboNativeUserAgentDetected = await IsTurboNativeUserAgentFromServerComponent();

  return (
    <header className={`z-10 ${ isTurboNativeUserAgentDetected ? 'fixed bottom-0 w-full' : 'sticky top-0' }`}>
      <nav className={`relative flex flex-col items-center justify-between gap-4 bg-neutral-50 p-4 dark:bg-neutral-900 md:flex-row lg:px-6 ${ isTurboNativeUserAgentDetected ? 'border-t-1 border-solid border-black/10 pt-2.5 pb-6' : '' }`}>
        <div className={`flex w-full items-center sm:gap-4 ${ isTurboNativeUserAgentDetected ? 'justify-evenly gap-4' : 'justify-between gap-0' }`}>
          {
            isTurboNativeUserAgentDetected ? (
              LeftIcons()
            ) : (
               <div className="flex max-w-fit gap-2 xl:gap-6">
                { LeftIcons() }
               </div>
            )
          }
          <div className={`hidden justify-center md:flex ${ isTurboNativeUserAgentDetected ? 'hidden' : '' }`}>
            <Suspense fallback={<SearchSkeleton />}>
              <Search search={false} />
            </Suspense>
          </div>
          {
            isTurboNativeUserAgentDetected ? (
              RightIcons()
            ) : (
               <div className="flex max-w-fit gap-2 md:gap-4">
                { RightIcons() }
               </div>
            )
          }
        </div>
      </nav>
    </header>
  );

  // Helper Components
  function LeftIcons() {
    return (
      <>
      {
        isTurboNativeUserAgentDetected ? (
          <>
          <Link
            className="flex h-9 scale-95 items-center md:h-9 md:w-auto lg:h-10"
            href="/"
          >
            <div className="flex flex-col gap-1 items-center justify-between text-black dark:text-white">
              <HomeIcon className="h-6 w-6" />
              <span className="text-base leading-4 font-medium text-black dark:text-neutral-300">
                Home
              </span>
            </div>
          </Link>
          <Suspense fallback={null}>
            <MobileMenu menu={menuData} />
          </Suspense>
          </>
        ) : (
          <>
          <Suspense fallback={null}>
            <MobileMenu menu={menuData} />
          </Suspense>
          <Link
            className="flex h-9 w-full scale-95 items-center md:h-9 md:w-auto lg:h-10"
            href="/"
          >
            <LogoIcon />
          </Link>
          </>
        )
      }
      {menu.length ? (
        <ul className="hidden gap-4 text-sm md:items-center lg:flex xl:gap-6">
          {menuData.slice(0, 3).map((item) => (
            <li key={item?.id + item.title}>
              <Link
                className="text-nowrap relative text-neutral-500 before:absolute before:bottom-0 before:left-0 before:h-px before:w-0 before:bg-current before:transition-all before:duration-300 before:content-[''] hover:text-black hover:before:w-full dark:text-neutral-400 dark:hover:text-neutral-300"
                href={`${item.path}`}
                prefetch={true}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      </>
    );
  }

  // Helper Components
  function RightIcons() {
    return (
      <>
        { ! isTurboNativeUserAgentDetected && <MobileSearch /> }
        <Suspense fallback={<OpenCart />}>
          <div className="hidden lg:block">
            <ThemeSwitch />
          </div>
        </Suspense>
        <Suspense fallback={<OpenCart />}>
          <Cart />
        </Suspense>
        <Suspense fallback={<OpenCart />}>
          <UserAccount />
        </Suspense>
      </>
    );
  }
}