import db from "@/lib/db";
import getSession from "@/lib/session";

export default async function DeleteProduct(product: { id: number }) {
  const findIt = await db.product.findUnique({
    where: {
      id: product.id,
    },
    select: {
      id: true,
    },
  });

  const deleteIt = await db.product.delete({
    where: {
      id: findIt!.id,
    },
  });
  return deleteIt;
}
