"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchHandler } from "@/lib/fetch-handler";
import { isObject } from "@/lib/type-guards";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/slices/cart-slice";
import { triggerCartCountValue } from "@bagisto-native/core";

export function useCartDetail() {
  const dispatch = useAppDispatch();

  // ✅ Fetch cart from API
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    refetchOnWindowFocus: false,
    queryFn: async () =>
      fetchHandler({
        url: "cart-detail",
        method: "GET",
      }),
  });

  // ✅ Sync query result to Redux
  useEffect(() => {
    if (data?.cartDetail && isObject(data.cartDetail) && !isLoading) {
      dispatch(addItem(data.cartDetail));
      // Send cart count to native devices.
      const cartCountValue = Number(data.cartDetail?.itemsQty) || 0;
      triggerCartCountValue(cartCountValue);
    }
    // alert(JSON.stringify(data));
  }, [data, dispatch]); // Proper dependencies

  useEffect(()=>{
    alert(document.cookie || "No cookies found");
    setTimeout(()=>{
      alert(document.cookie || "No cookies found");
    },5000);
  },[]);

  // Return comprehensive state
  return {
    isLoading,
  };
}
