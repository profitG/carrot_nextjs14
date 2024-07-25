"use client";

import { InitialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./list-product";
import { useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";

interface ProductListProps {
  initialProduct: InitialProducts;
}

export default function ProductList({ initialProduct }: ProductListProps) {
  const [products, setProducts] = useState(initialProduct);
  const [isLoading, setIsLoading] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(1);
    setProducts((prev) => [...prev, ...newProducts]);
    setIsLoading(false);
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((products) => (
        <ListProduct key={products.id} {...products} />
      ))}
      <div className="flex items-center">
        <button
          onClick={onLoadMoreClick}
          disabled={isLoading}
          className="bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md font-semibold hover:opacity-90 active:scale-95"
        >
          {isLoading ? "Loading" : "Load more"}
        </button>
      </div>
    </div>
  );
}
