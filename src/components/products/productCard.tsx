import { type Product } from "@/src/types";
import ImageWithFallback from "./ImageWithFallback";
import Link from "next/link";
import AddToCard from "./addToCard";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-auto hover:shadow-xl transition-all">
      <ImageWithFallback
        key={product.id}
        src={product.image_url + "?w=400&h=300"}
        fallbackSrc="/Image.svg"
      />
      <div className="px-6 py-4">
        <Link href={`/${product.id}`}>
          <div className="font-bold text-sm sm:text-lg md:text-xl mb-2">
            {product.title}
          </div>
        </Link>
        <div className="font-bold text-sm sm:text-lg md:text-xl mb-2">
          {product.price}$
        </div>
        <p className="text-gray-700 text-base">
          {product.description?.slice(0, 80) + "..."}
        </p>
        <AddToCard product={product} />
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{product.category}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
