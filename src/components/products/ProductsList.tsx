"use client";
import { type Product } from "@/src/types";
import { getProducts } from "@/src/utils";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductCard from "./productCard";
import FilterProducts from "./filterProducts";
import { useDebounce } from "@/src/helpers";
import useCartStore from "@/src/store/cartStore";
import ShoppingCardSvg from "@/public/shoppingCard";
import Link from "next/link";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterProducts, setFilterProduct] = useState("");
  const [rangePrice, setRangePrice] = useState(0);
  const debouncedSearch = useDebounce(search, 500);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      debouncedSearch === "" ||
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      product.description
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase()) ||
      product.price.toString().includes(debouncedSearch.toLowerCase());

    const matchesCategory =
      filterProducts === "" ||
      product.category.toLowerCase() === filterProducts.toLowerCase();

    const matchPrice = rangePrice === 0 || product.price === rangePrice;
    return matchesSearch && matchesCategory && matchPrice;
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, errorMessage } = await getProducts();
        setProducts(data.products);
        if (errorMessage) {
          console.log(errorMessage);
        }
      } catch (error: any) {
        const errorMessages = error?.message;

        const formattedError = Array.isArray(errorMessages)
          ? errorMessages.join("\n")
          : errorMessages || "Something went wrong";
        toast.error(formattedError);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const { cart } = useCartStore();

  return loading ? (
    <div>loading </div>
  ) : (
    <div className="w-11/12 m-auto  p-6 flex flex-col gap-4">
      {cart.length > 0 && (
        <Link href={"/shoppingCard"} className="flex relative">
          <ShoppingCardSvg />
          <span className="w-5 h-5 p-1 text-center text-[10px] left-3 top-3 font-bold rounded-full bg-red-600 text-white shadow absolute">
            {cart.length}
          </span>
        </Link>
      )}
      <FilterProducts
        setFilterProduct={setFilterProduct}
        search={search}
        setSearch={setSearch}
        filterProducts={filterProducts}
        categories={products}
        setRangePrice={setRangePrice}
        rangePrice={rangePrice}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 m-auto  gap-4">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
