import db from "@/lib/db";
import { notFound } from "next/navigation";

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });
  return product;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  return <span>Product Detail of the product {id}</span>;
}
