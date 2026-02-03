"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchHandler } from "../fetch-handler";
import { useMemo } from "react";

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export function useNavCategories() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["nav-categories"],
        queryFn: () =>
            fetchHandler({
                url: "categories",
                method: "POST",
                body: { parentId: 1 },
            }),
    });

    const categories: Category[] = useMemo(() => {
        const rawCategories = data?.data?.treeCategories || [];

        return rawCategories
            .filter((cat: any) => cat.id !== "1")
            .map((cat: any) => {
                const translation = cat?.translation;
                return {
                    id: cat?.id,
                    name: translation?.name || "",
                    slug: translation?.slug || "",
                };
            })
            .filter((item: Category) => item?.name && item?.slug);
    }, [data]);

    return {
        categories,
        isLoading,
        error,
    };
}
