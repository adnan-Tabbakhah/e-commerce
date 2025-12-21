"use client";
import ImageWithFallback from "@/src/components/products/ImageWithFallback";
import { type Product } from "@/src/types";
import { getProductById } from "@/src/utils";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const { back } = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const { data, errorMessage } = await getProductById(Number(productId));
        setProduct(data?.product);
        if (errorMessage) {
          toast.error(errorMessage);
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
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;
  return (
    <div className=" ">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <button
            onClick={() => back()}
            className="p-4 w-4 h-4 absolute shadow-lg bg-gray-100 hover:bg-gray-200  top-2 left-2
        transition text-lg rounded-full flex justify-center items-center cursor-pointer"
          >
            &larr;
          </button>
          <ImageWithFallback
            className=" h-auto w-[300px] sm:w-[300px]  m-auto object-cover md:object-cover rounded-2xl shadow-lg"
            key={product.id}
            src={product.image_url + "?w=400&h=300"}
            fallbackSrc="/Image.svg"
          />

          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
            <div className="mb-4">
              price:
              <span className="text-2xl font-bold mr-2"> {product.price}$</span>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
