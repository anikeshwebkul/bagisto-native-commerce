"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { isTurboNativeUserAgent } from "@bagisto-native/core";

export default function OpenAuth({ className }: { className?: string }) {
  const [isTurboNativeUserAgentState, setIsTurboNativeUserAgentState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
      setIsTurboNativeUserAgentState(isTurboNativeUserAgent());
    });
  }, []);
  return (
    <>
      <div className={"relative flex items-center justify-center rounded-md border-0" + (mounted && !isTurboNativeUserAgentState ? " lg:border border-solid border-neutral-200 dark:border-neutral-700 lg:h-11 lg:w-11" : "")}>
        <UserIcon className={clsx("h-5 w-5  ", className)} />
      </div>
    </>

  );
}

