"use client";

import { InitialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./list-product";
import { useEffect, useRef, useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";

interface ProductListProps {
  initialProduct: InitialProducts;
}

export default function ProductList({ initialProduct }: ProductListProps) {
  const [products, setProducts] = useState(initialProduct);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);
          if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
            setIsLoading(false);
          } else {
            setIsLastPage(true);
          }
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((products) => (
        <ListProduct key={products.id} {...products} />
      ))}
      {!isLastPage ? (
        <div className="flex items-center">
          <span
            ref={trigger}
            className="bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md font-semibold hover:opacity-90 active:scale-95"
          >
            {isLoading ? "Loading" : "Load more"}
          </span>
        </div>
      ) : null}
    </div>
  );
}
