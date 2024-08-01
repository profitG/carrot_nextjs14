import ProductList from "@/components/product-list";
import db from "@/lib/db";
import getSession from "@/lib/session";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const userWithProduct = await db.user.findUnique({
      where: {
        id: session.id,
      },
      include: {
        Product: true,
      },
    });
    return userWithProduct;
  }
  notFound();
};

export default async function userProfile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex gap-4">
        <Image
          src={user?.avatar!}
          alt={user?.username!}
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="flex items-center text-2xl">{user?.username}</h1>
      </div>
      <h2 className="text-xl font-semibold pt-5">내 제품 목록</h2>
      <ProductList initialProduct={user?.Product!} />
      <form action={logOut} className="btn p-2">
        <button>Log out</button>
      </form>
    </div>
  );
}
