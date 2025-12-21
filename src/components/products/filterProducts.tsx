import { type Product } from "@/src/types";

const FilterProducts = ({
  search,
  setSearch,
  categories,
  setFilterProduct,
  filterProducts,
  rangePrice,
  setRangePrice,
}: {
  setSearch: (value: string) => void;
  search: string;
  categories: Product[];
  setFilterProduct: (value: string) => void;
  filterProducts: string;
  rangePrice: number;
  setRangePrice: (value: number) => void;
}) => {
  const uniqueCategories = categories.filter(
    (item, index, self) =>
      index === self.findIndex((p) => p.category === item.category)
  );

  return (
    <div className="flex gap-2 md:justify-between flex-col md:flex-row justify-center items-center">
      <div className="flex gap-2 flex-col md:flex-row justify-center items-center">
        <input
          className="w-[200px] p-2 rounded-md border border-gray-300"
          placeholder="search on a product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="range" className="text-sm font-bold">
          range Price: {rangePrice}
        </label>
        {/* range price */}

        <input
          id="range"
          type="range"
          min={0}
          max={150}
          step={1}
          onChange={(e) => setRangePrice(Number(e.target.value))}
          value={rangePrice}
        />
      </div>
      {/* filter by category */}
      <select
        value={filterProducts}
        onChange={(e) => setFilterProduct(e.target.value)}
        className="w-[200px] p-2 rounded-md border border-gray-300"
      >
        <option value="">All</option>
        {uniqueCategories?.map((category) => (
          <option key={category.id} value={category.category}>
            {category.category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterProducts;
