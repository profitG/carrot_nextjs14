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

// export const dynamic = "force-dynamic";
export const revalidate = 60;

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

/*
product의 cache 방식을 결정해라
1. dynamic
2. revalidate
3. revalidatePath
4. revalidateTag
구현하고 제품 업로드 server action에 연결
업로드 할 때마다? 혹은 뭐 어쨋든 최신 업데이트 된 제품을 보여줄 수 있도록
---------------------------------------------------------------
제품 편집 페이지를 만들어서 편집할 수 있도록 하고
cache도 연결
*/
