"use client";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { isTurboNativeUserAgent, triggerCartCountValue } from "@bagisto-native/core";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number | string;
}) {
  const [isTurboNativeUserAgentState, setIsTurboNativeUserAgentState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
      setIsTurboNativeUserAgentState(isTurboNativeUserAgent());
      triggerCartCountValue(Number(quantity));
    });
  }, [quantity]);
  return (
    <div className={"relative flex  items-center justify-center rounded-md border-0" + (mounted && !isTurboNativeUserAgentState ? " lg:border border-solid border-neutral-200 dark:border-neutral-700 lg:h-11 lg:w-11" : "")}>
      <ShoppingCartIcon className={clsx("h-5 w-5", className)} />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 margin-t lg:-mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}

