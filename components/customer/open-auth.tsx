import { UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { isTurboNativeUserAgent } from "@bagisto-native/core";

export default function OpenAuth({ className }: { className?: string }) {
  return (
    <div className={`${ isTurboNativeUserAgent() ? 'flex flex-col gap-1 items-center justify-between text-black dark:text-white' : 'relative flex h-9 w-9 items-center justify-center rounded-md border border-solid border-neutral-200 text-black dark:border-neutral-700 dark:text-white md:h-9 md:w-9 lg:h-11 lg:w-11'}`}>
     {
          isTurboNativeUserAgent() ? ( 
          <>
            <UserIcon className="h-6 w-6" /> 
            <span className="text-base leading-4 font-medium text-black dark:text-neutral-300">
              Account
            </span>
          </>
        ) : (  <UserIcon className={clsx("h-5 w-20  ", className)} /> )
        }
    </div>
  );
}
