import ListProduct from "@/components/list-product";
import db from "@/lib/db";

async function getProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
  });
  return products;
}

export default async function Chat() {
  const products = await getProducts();
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((products) => (
        <ListProduct key={products.id} {...products} />
      ))}
    </div>
  );
}
