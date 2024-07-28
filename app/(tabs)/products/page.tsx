import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from "next/cache";
import Link from "next/link";

const getCachedProducts = nextCache(getInitialProducts, ["products-list"], {
  tags: ["product-tag"],
});

async function getInitialProducts() {
  console.log("Hit");
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    //take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export const metadata = {
  title: "Products",
};

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products() {
  const initialProducts = await getCachedProducts();
  const revalidate = async () => {
    "use server";
    revalidateTag("product-tag");
  };

  return (
    <div>
      <ProductList initialProduct={initialProducts} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
      <Link
        href="/products/add"
        className="transition-colors hover:bg-orange-400 flex flex-col text-white items-center justify-center rounded-full size-16 fixed bottom-24 right-8 bg-orange-500"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
