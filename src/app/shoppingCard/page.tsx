"use client";
import ProductCard from "@/src/components/products/productCard";
import useCartStore from "@/src/store/cartStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ShoppingCard = () => {
  const { cart } = useCartStore();
  const { push  , back } = useRouter();
  useEffect(() => {
    if (cart.length <= 0) {
      push("/");
    }
  }, [cart.length, push]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 m-auto  gap-4 w-11/12 p-6 ">
               <button
            onClick={() => back()}
            className="p-4 w-4 h-4 absolute shadow-lg bg-gray-100 hover:bg-gray-200  top-2 left-2
        transition text-lg rounded-full flex justify-center items-center cursor-pointer"
          >
            &larr;
          </button>
      {cart?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ShoppingCard;
