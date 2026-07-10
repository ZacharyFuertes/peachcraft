import { useMemo, useState } from "react";

export type ProductAvailabilityFilter = "all" | "in-stock" | "out-of-stock";
export type ProductSortOption = "name-asc" | "name-desc" | "newest-first" | "price-asc" | "price-desc" | "date-old-to-new";

export type ProductInventoryLike = {
  id: string;
  name: string;
  price?: number | null;
  quantity_in_stock?: number | null;
  stock_qty?: number | null;
  created_at?: string | null;
};

export type UseProductFiltersResult<TProduct extends ProductInventoryLike> = {
  availabilityFilter: ProductAvailabilityFilter;
  sortOption: ProductSortOption;
  setAvailabilityFilter: (filter: ProductAvailabilityFilter) => void;
  setSortOption: (option: ProductSortOption) => void;
  filteredProducts: TProduct[];
  productCount: number;
};

function getStockQuantity(product: ProductInventoryLike) {
  const value = Number(product.quantity_in_stock ?? product.stock_qty ?? 0);
  return Number.isFinite(value) ? value : 0;
}

export function useProductFilters<TProduct extends ProductInventoryLike>(
  products: TProduct[],
  initialAvailabilityFilter: ProductAvailabilityFilter = "all",
  initialSortOption: ProductSortOption = "newest-first",
): UseProductFiltersResult<TProduct> {
  const [availabilityFilter, setAvailabilityFilter] = useState<ProductAvailabilityFilter>(initialAvailabilityFilter);
  const [sortOption, setSortOption] = useState<ProductSortOption>(initialSortOption);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const stockQuantity = getStockQuantity(product);

      if (availabilityFilter === "in-stock") {
        return stockQuantity > 0;
      }

      if (availabilityFilter === "out-of-stock") {
        return stockQuantity <= 0;
      }

      return true;
    });

    return [...filtered].sort((left, right) => {
      if (sortOption === "name-asc") {
        return left.name.localeCompare(right.name, undefined, { sensitivity: "base" });
      }

      if (sortOption === "name-desc") {
        return right.name.localeCompare(left.name, undefined, { sensitivity: "base" });
      }

      if (sortOption === "price-asc") {
        const lp = left.price ?? 0;
        const rp = right.price ?? 0;
        return lp - rp;
      }

      if (sortOption === "price-desc") {
        const lp = left.price ?? 0;
        const rp = right.price ?? 0;
        return rp - lp;
      }

      const leftTimestamp = left.created_at ? new Date(left.created_at).getTime() : 0;
      const rightTimestamp = right.created_at ? new Date(right.created_at).getTime() : 0;

      if (sortOption === "date-old-to-new") {
        return leftTimestamp - rightTimestamp;
      }

      return rightTimestamp - leftTimestamp;
    });
  }, [availabilityFilter, products, sortOption]);

  return {
    availabilityFilter,
    sortOption,
    setAvailabilityFilter,
    setSortOption,
    filteredProducts,
    productCount: filteredProducts.length,
  };
}
