"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { isTurboNativeUserAgent } from "@bagisto-native/core";

export default function OpenAuth({ className }: { className?: string }) {
  const [isTurboNativeUserAgentState, setIsTurboNativeUserAgentState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!isTurboNativeUserAgent()) {
      setIsTurboNativeUserAgentState(false);
    }
  }, []);
  return (
    <>
      <div className={"relative flex items-center justify-center rounded-md border-0 border-solid border-neutral-200 text-black dark:border-neutral-700 dark:text-white" + (mounted && !isTurboNativeUserAgentState ? "lg:border lg:h-11 lg:w-11" : "")}>
        <UserIcon className={clsx("h-5 w-5  ", className)} />
      </div>
    </>

  );
}
