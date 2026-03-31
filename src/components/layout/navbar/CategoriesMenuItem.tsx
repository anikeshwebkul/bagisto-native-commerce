"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isTurboNativeUserAgent } from "@bagisto-native/core";

export default function CategoriesMenuItem({ key, name, slug }: { key: string; name: string; slug: string }) {
    const [isTurboNativeUserAgentState, setIsTurboNativeUserAgentState] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setMounted(true);
            setIsTurboNativeUserAgentState(isTurboNativeUserAgent());
        });
    }, []);

    return (
        <li key={key} className={`hidden ${mounted && !isTurboNativeUserAgentState ? "block!" : ""}`}>
            <Link
                className="text-nowrap relative text-neutral-500 before:absolute before:bottom-0 before:left-0 before:h-px before:w-0 before:bg-current before:transition-all before:duration-300 before:content-[''] hover:text-black hover:before:w-full dark:text-neutral-400 dark:hover:text-neutral-300"
                href={slug ? `/search/${slug}` : "/search"}
                prefetch={true}
                aria-label={`Browse ${name} products`}
            >
                {name}
            </Link>
        </li>
    );
}
